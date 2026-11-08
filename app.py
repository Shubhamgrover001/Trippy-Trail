"""Trippy Trail backend: server-side pricing, bookings, Razorpay payments, admin API.

Run:  python app.py            (dev)   |   gunicorn 'app:create_app()'   (prod)
Env:  see README.md. With no RAZORPAY_* keys the app runs in MOCK mode (no real money).
"""
import base64, csv, hashlib, hmac, io, json, os, re, secrets, sqlite3, time, urllib.error, urllib.request
from datetime import datetime, timedelta, timezone

from flask import Flask, Response, abort, g, jsonify, request, send_from_directory

BASE = os.path.dirname(os.path.abspath(__file__))
IST = timezone(timedelta(hours=5, minutes=30))
CATALOG = json.load(open(os.path.join(BASE, "catalog.json"), encoding="utf-8"))
POLICY = CATALOG["policy"]

SCHEMA = """
CREATE TABLE IF NOT EXISTS bookings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  reference TEXT NOT NULL UNIQUE,
  trip_id TEXT NOT NULL, package_key TEXT NOT NULL, people INTEGER NOT NULL,
  arrival_date TEXT NOT NULL,
  name TEXT NOT NULL, phone TEXT NOT NULL, email TEXT NOT NULL,
  unit_paise INTEGER NOT NULL, subtotal_paise INTEGER NOT NULL,
  discount_paise INTEGER NOT NULL, total_paise INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','paid','failed','cancelled')),
  mode TEXT NOT NULL CHECK (mode IN ('mock','live')),
  gateway_order_id TEXT, gateway_payment_id TEXT,
  idempotency_key TEXT UNIQUE,
  created_at TEXT NOT NULL, paid_at TEXT
);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_order ON bookings(gateway_order_id);
"""

EMAIL_RE = re.compile(r"^[^@\s]{1,64}@[^@\s]{1,255}\.[^@\s]{2,}$")
PHONE_RE = re.compile(r"^\+?[0-9]{10,15}$")
REF_RE = re.compile(r"^TT-[0-9]{8}-[A-Z0-9]{6}$")


# ---------- pricing (the ONLY place prices are computed) ----------
def quote(trip_id, package_key, people):
    trip = CATALOG["trips"].get(trip_id) if isinstance(trip_id, str) else None
    if not trip or not isinstance(package_key, str) or package_key not in trip["packages"]:
        return None
    if type(people) is not int or not 1 <= people <= POLICY["maximumPeople"]:
        return None
    unit = trip["packages"][package_key]["pricePaise"]
    subtotal = unit * people
    pct = POLICY["discountPercent"] if people >= POLICY["minimumPeople"] else 0
    discount = (subtotal * pct + 50) // 100  # integer round-half-up, no floats
    total = subtotal - discount
    return {"tripId": trip_id, "packageKey": package_key, "people": people, "unitPaise": unit,
            "subtotalPaise": subtotal, "discountPercent": pct, "discountPaise": discount,
            "totalPaise": total, "perPersonPaise": (total + people // 2) // people, "currency": "INR"}


# ---------- validation ----------
def clean_text(v, lo, hi):
    if not isinstance(v, str):
        return None
    v = re.sub(r"\s+", " ", v).strip()
    return v if lo <= len(v) <= hi and not re.search(r"[<>\x00-\x1f]", v) else None


def validate_booking(d):
    """Return (clean_dict, errors{field: msg})."""
    errors = {}
    if not isinstance(d, dict):
        return None, {"_": "JSON object required"}
    name = clean_text(d.get("name"), 2, 80)
    if not name: errors["name"] = "Enter your full name (2-80 characters, no < or >)."
    phone = re.sub(r"[\s\-()]", "", d.get("phone") or "") if isinstance(d.get("phone"), str) else ""
    if not PHONE_RE.match(phone): errors["phone"] = "Enter a valid phone number (10-15 digits)."
    email = (d.get("email") or "").strip().lower() if isinstance(d.get("email"), str) else ""
    if not EMAIL_RE.match(email) or len(email) > 254: errors["email"] = "Enter a valid email address."
    try:
        arrival = datetime.strptime(d.get("date") or "", "%Y-%m-%d").date()
        today = datetime.now(IST).date()
        if arrival <= today: errors["date"] = "Choose an arrival date from tomorrow onwards."
        elif arrival > today + timedelta(days=730): errors["date"] = "Choose a date within the next 2 years."
    except (ValueError, TypeError):
        errors["date"] = "Enter a valid date (YYYY-MM-DD)."
    q = quote(d.get("tripId"), d.get("packageKey"), d.get("people"))
    if not q: errors["trip"] = "Invalid trip, package or traveller count (1-%d)." % POLICY["maximumPeople"]
    if errors: return None, errors
    return {"name": name, "phone": phone, "email": email, "date": arrival.isoformat(), "quote": q}, {}


# ---------- razorpay ----------
def rzp_sign(order_id, payment_id, secret):
    return hmac.new(secret.encode(), f"{order_id}|{payment_id}".encode(), hashlib.sha256).hexdigest()


def rzp_create_order(cfg, amount_paise, receipt):
    body = json.dumps({"amount": amount_paise, "currency": "INR", "receipt": receipt}).encode()
    auth = base64.b64encode(f"{cfg['RAZORPAY_KEY_ID']}:{cfg['RAZORPAY_KEY_SECRET']}".encode()).decode()
    req = urllib.request.Request("https://api.razorpay.com/v1/orders", data=body, method="POST",
                                 headers={"Content-Type": "application/json", "Authorization": "Basic " + auth})
    with urllib.request.urlopen(req, timeout=15) as r:
        return json.load(r)


# ---------- app ----------
def create_app(config=None):
    app = Flask(__name__, static_folder=None)
    cfg = {"DATABASE": os.environ.get("DATABASE", os.path.join(BASE, "trippy.db")),
           "RAZORPAY_KEY_ID": os.environ.get("RAZORPAY_KEY_ID", ""),
           "RAZORPAY_KEY_SECRET": os.environ.get("RAZORPAY_KEY_SECRET", ""),
           "RAZORPAY_WEBHOOK_SECRET": os.environ.get("RAZORPAY_WEBHOOK_SECRET", ""),
           "ADMIN_TOKEN": os.environ.get("ADMIN_TOKEN", ""),
           "RATE_LIMIT": int(os.environ.get("RATE_LIMIT", "20")),  # bookings per IP per hour
           "RZP_CREATE_ORDER": rzp_create_order}
    cfg.update(config or {})
    app.config.update(cfg)
    app.config["MAX_CONTENT_LENGTH"] = 16 * 1024
    hits = {}

    live = bool(cfg["RAZORPAY_KEY_ID"] and cfg["RAZORPAY_KEY_SECRET"])
    mode = "live" if live else "mock"

    def db():
        if "db" not in g:
            g.db = sqlite3.connect(app.config["DATABASE"])
            g.db.row_factory = sqlite3.Row
            g.db.execute("PRAGMA foreign_keys=ON")
        return g.db

    @app.teardown_appcontext
    def close_db(_):
        c = g.pop("db", None)
        if c: c.close()

    with app.app_context():
        c = sqlite3.connect(app.config["DATABASE"]); c.executescript(SCHEMA); c.execute("PRAGMA journal_mode=WAL"); c.commit(); c.close()

    @app.after_request
    def headers(r):
        r.headers["X-Content-Type-Options"] = "nosniff"
        r.headers["Referrer-Policy"] = "same-origin"
        r.headers["X-Frame-Options"] = "DENY"
        if request.path.startswith("/api/"): r.headers["Cache-Control"] = "no-store"
        return r

    def err(status, msg, **extra):
        return jsonify(error=msg, **extra), status

    @app.errorhandler(413)
    def too_big(_): return err(413, "Request too large")

    @app.errorhandler(404)
    def nf(_): return err(404, "Not found") if request.path.startswith("/api/") else (Response("Not found", 404))

    def rate_limited():
        ip, now = request.headers.get("X-Forwarded-For", request.remote_addr or "?").split(",")[0].strip(), time.time()
        q = [t for t in hits.get(ip, []) if now - t < 3600]
        if len(q) >= app.config["RATE_LIMIT"]: hits[ip] = q; return True
        q.append(now); hits[ip] = q; return False

    # ----- public -----
    @app.get("/")
    def index(): return send_from_directory(os.path.join(BASE, "static"), "index.html")

    @app.get("/api/config")
    def api_config():
        return jsonify(mode=mode, razorpayKeyId=app.config["RAZORPAY_KEY_ID"] if live else None, policy=POLICY)

    @app.get("/api/catalog")
    def api_catalog(): return jsonify(CATALOG)

    @app.post("/api/quote")
    def api_quote():
        d = request.get_json(silent=True) or {}
        q = quote(d.get("tripId"), d.get("packageKey"), d.get("people"))
        return (jsonify(q) if q else err(400, "Invalid trip, package or traveller count"))

    @app.post("/api/bookings")
    def api_create_booking():
        if rate_limited(): return err(429, "Too many booking attempts. Try again later.")
        data, errors = validate_booking(request.get_json(silent=True))
        if errors: return err(400, "Validation failed", fields=errors)
        idem = request.headers.get("Idempotency-Key")
        if idem is not None and not re.fullmatch(r"[A-Za-z0-9_-]{8,64}", idem): return err(400, "Bad Idempotency-Key")
        d = db()
        if idem:  # same key => return the same booking instead of creating a duplicate
            row = d.execute("SELECT * FROM bookings WHERE idempotency_key=?", (idem,)).fetchone()
            if row: return jsonify(booking_payload(row)), 200
        q = data["quote"]
        ref = f"TT-{datetime.now(IST):%Y%m%d}-{secrets.token_hex(3).upper()}"
        order_id = None
        if live:
            try:
                order_id = app.config["RZP_CREATE_ORDER"](app.config, q["totalPaise"], ref)["id"]
            except (urllib.error.URLError, KeyError, ValueError, TimeoutError):
                return err(502, "Payment gateway unavailable. Please try again.")
        try:
            d.execute("""INSERT INTO bookings(reference,trip_id,package_key,people,arrival_date,name,phone,email,
                unit_paise,subtotal_paise,discount_paise,total_paise,mode,gateway_order_id,idempotency_key,created_at)
                VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)""",
                (ref, q["tripId"], q["packageKey"], q["people"], data["date"], data["name"], data["phone"], data["email"],
                 q["unitPaise"], q["subtotalPaise"], q["discountPaise"], q["totalPaise"], mode, order_id, idem,
                 datetime.now(timezone.utc).isoformat()))
            d.commit()
        except sqlite3.IntegrityError:
            return err(409, "Duplicate request")
        row = d.execute("SELECT * FROM bookings WHERE reference=?", (ref,)).fetchone()
        return jsonify(booking_payload(row)), 201

    def booking_payload(row):
        q = quote(row["trip_id"], row["package_key"], row["people"])
        return {"reference": row["reference"], "status": row["status"], "mode": row["mode"], "quote": q,
                "amountPaise": row["total_paise"], "orderId": row["gateway_order_id"],
                "razorpayKeyId": app.config["RAZORPAY_KEY_ID"] if row["mode"] == "live" else None}

    def mark_paid(row_id, payment_id):
        """Idempotent: only a pending/failed booking becomes paid; repeats are no-ops."""
        d = db()
        d.execute("""UPDATE bookings SET status='paid', gateway_payment_id=?, paid_at=?
                     WHERE id=? AND status IN ('pending','failed')""",
                  (payment_id, datetime.now(timezone.utc).isoformat(), row_id))
        d.commit()

    @app.post("/api/payments/mock-confirm")
    def mock_confirm():
        if mode != "mock": abort(404)
        ref = (request.get_json(silent=True) or {}).get("reference", "")
        row = REF_RE.match(ref or "") and db().execute("SELECT * FROM bookings WHERE reference=?", (ref,)).fetchone()
        if not row or row["mode"] != "mock": return err(404, "Booking not found")
        if row["status"] == "cancelled": return err(409, "Booking was cancelled")
        mark_paid(row["id"], "mock_" + secrets.token_hex(4))
        return jsonify(booking_payload(db().execute("SELECT * FROM bookings WHERE id=?", (row["id"],)).fetchone()))

    @app.post("/api/payments/verify")
    def verify():
        if mode != "live": abort(404)
        d = request.get_json(silent=True) or {}
        oid, pid, sig = (d.get(k) for k in ("razorpay_order_id", "razorpay_payment_id", "razorpay_signature"))
        if not all(isinstance(x, str) and x for x in (oid, pid, sig)): return err(400, "Missing payment fields")
        row = db().execute("SELECT * FROM bookings WHERE gateway_order_id=?", (oid,)).fetchone()
        if not row: return err(404, "Booking not found")
        if not hmac.compare_digest(rzp_sign(oid, pid, app.config["RAZORPAY_KEY_SECRET"]), sig):
            return err(400, "Invalid payment signature")
        if row["status"] == "cancelled": return err(409, "Booking was cancelled; contact support for a refund")
        mark_paid(row["id"], pid)
        return jsonify(booking_payload(db().execute("SELECT * FROM bookings WHERE id=?", (row["id"],)).fetchone()))

    @app.post("/api/payments/webhook")
    def webhook():
        secret = app.config["RAZORPAY_WEBHOOK_SECRET"]
        if not secret: abort(404)
        raw = request.get_data()
        got = request.headers.get("X-Razorpay-Signature", "")
        if not hmac.compare_digest(hmac.new(secret.encode(), raw, hashlib.sha256).hexdigest(), got):
            return err(400, "Bad signature")
        ev = json.loads(raw or b"{}")
        if ev.get("event") in ("payment.captured", "order.paid"):
            pay = ev.get("payload", {}).get("payment", {}).get("entity", {})
            row = db().execute("SELECT * FROM bookings WHERE gateway_order_id=?", (pay.get("order_id"),)).fetchone()
            # amount in the webhook must equal what WE priced; otherwise do not mark paid
            if row and pay.get("amount") == row["total_paise"] and pay.get("currency") == "INR":
                mark_paid(row["id"], pay.get("id"))
        return jsonify(ok=True)

    # ----- admin -----
    def admin_only():
        tok = app.config["ADMIN_TOKEN"]
        if not tok: abort(404)  # admin disabled unless a token is configured
        sent = request.headers.get("Authorization", "")
        if not (sent.startswith("Bearer ") and hmac.compare_digest(sent[7:].encode(), tok.encode())): abort(401)

    @app.errorhandler(401)
    def unauth(_): return err(401, "Unauthorized")

    def row_dict(r): return {k: r[k] for k in r.keys() if k != "idempotency_key"}

    @app.get("/api/admin/bookings")
    def admin_list():
        admin_only()
        st = request.args.get("status")
        sql, args = "SELECT * FROM bookings", ()
        if st in ("pending", "paid", "failed", "cancelled"): sql, args = sql + " WHERE status=?", (st,)
        rows = db().execute(sql + " ORDER BY id DESC LIMIT 500", args).fetchall()
        return jsonify([row_dict(r) for r in rows])

    @app.patch("/api/admin/bookings/<ref>")
    def admin_update(ref):
        admin_only()
        st = (request.get_json(silent=True) or {}).get("status")
        if st not in ("cancelled", "failed") or not REF_RE.match(ref): return err(400, "status must be 'cancelled' or 'failed'")
        cur = db().execute("UPDATE bookings SET status=? WHERE reference=?", (st, ref)); db().commit()
        return jsonify(ok=True) if cur.rowcount else err(404, "Booking not found")

    @app.get("/api/admin/export.csv")
    def admin_csv():
        admin_only()
        def safe(v):  # neutralise spreadsheet formula injection
            s = "" if v is None else str(v)
            return "'" + s if s and s[0] in "=+-@\t\r" else s
        rows = db().execute("SELECT * FROM bookings ORDER BY id").fetchall()
        buf = io.StringIO(); w = csv.writer(buf)
        cols = ["reference", "status", "mode", "trip_id", "package_key", "people", "arrival_date", "name", "phone", "email",
                "total_paise", "gateway_order_id", "gateway_payment_id", "created_at", "paid_at"]
        w.writerow(cols)
        for r in rows: w.writerow([r[c] if c == "phone" else safe(r[c]) for c in cols])  # phone is validated digits (+ allowed)
        return Response(buf.getvalue(), mimetype="text/csv", headers={"Content-Disposition": "attachment; filename=bookings.csv"})

    return app


if __name__ == "__main__":
    create_app().run(host="127.0.0.1", port=int(os.environ.get("PORT", "5000")), debug=False)
