import hashlib, hmac, json, os, sys
from datetime import datetime, timedelta
import pytest
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
import app as A

TOMORROW = (datetime.now(A.IST) + timedelta(days=1)).strftime("%Y-%m-%d")
GOOD = dict(tripId="jibhi", packageKey="standard", people=2, date="", name="Shubham", phone="+91 98765 43210", email="s@example.com")
GOOD["date"] = TOMORROW

def make(tmp_path, **cfg):
    base = dict(DATABASE=str(tmp_path / "t.db"), ADMIN_TOKEN="adm-secret", RATE_LIMIT=1000)
    base.update(cfg)
    return A.create_app(base).test_client()

@pytest.fixture
def c(tmp_path): return make(tmp_path)

def book(c, **over):
    return c.post("/api/bookings", json={**GOOD, **over})

# ---- pricing ----
@pytest.mark.parametrize("trip,pkg,n,total", [("shangarh","standard",1,599900),("shangarh","standard",8,4319280),
    ("kashmir","comfort",30,72897300),("jibhi","standard",9,5669190)])
def test_quote_values(trip,pkg,n,total): assert A.quote(trip,pkg,n)["totalPaise"] == total

@pytest.mark.parametrize("a", [("jibhi","standard",0),("jibhi","standard",31),("jibhi","standard",2.5),("jibhi","standard",True),
    ("jibhi","standard","3"),("x","standard",2),("jibhi","gold",2),(None,None,None),("__proto__","standard",2)])
def test_quote_rejects(a): assert A.quote(*a) is None

def test_quote_sums():
    for n in range(1,31):
        q = A.quote("kashmir","standard",n); assert q["subtotalPaise"]-q["discountPaise"]==q["totalPaise"]

# ---- booking creation ----
def test_price_comes_from_server_not_client(c):
    r = book(c, totalPaise=1, unitPaise=1, quote={"totalPaise": 1})  # tampering attempts are ignored
    assert r.status_code == 201 and r.json["amountPaise"] == 2*699900 and r.json["status"] == "pending"

@pytest.mark.parametrize("over,field", [({"name":"A"},"name"),({"name":"<script>"},"name"),({"phone":"123"},"phone"),
    ({"email":"nope"},"email"),({"date":"2020-01-01"},"date"),({"date":"2099-01-01"},"date"),({"date":"x"},"date"),
    ({"people":99},"trip"),({"tripId":"mars"},"trip")])
def test_validation(c, over, field):
    r = book(c, **over); assert r.status_code == 400 and field in r.json["fields"]

def test_non_json_and_big_body(c):
    assert c.post("/api/bookings", data="x").status_code == 400
    assert c.post("/api/bookings", data="x"*20000, content_type="application/json").status_code == 413

def test_idempotency_key(c):
    h = {"Idempotency-Key": "abcdefgh12345678"}
    a = c.post("/api/bookings", json=GOOD, headers=h); b = c.post("/api/bookings", json=GOOD, headers=h)
    assert a.status_code == 201 and b.status_code == 200 and a.json["reference"] == b.json["reference"]
    assert c.post("/api/bookings", json=GOOD, headers={"Idempotency-Key": "bad key!"}).status_code == 400

def test_rate_limit(tmp_path):
    cl = make(tmp_path, RATE_LIMIT=2)
    assert [book(cl).status_code for _ in range(3)] == [201, 201, 429]

# ---- mock payments ----
def test_mock_flow_and_replay(c):
    ref = book(c).json["reference"]
    assert c.get("/api/config").json["mode"] == "mock"
    for _ in range(2):  # replay-safe
        r = c.post("/api/payments/mock-confirm", json={"reference": ref}); assert r.json["status"] == "paid"
    assert c.post("/api/payments/mock-confirm", json={"reference": "TT-00000000-AAAAAA"}).status_code == 404
    assert c.post("/api/payments/mock-confirm", json={"reference": "' OR 1=1"}).status_code == 404
    assert c.post("/api/payments/verify", json={}).status_code == 404  # live endpoint off in mock mode

# ---- live payments (gateway stubbed) ----
SECRET, WH = "rzp_secret", "wh_secret"
@pytest.fixture
def live(tmp_path):
    n = {"i": 0}
    def fake(cfg, amount, receipt):
        n["i"] += 1; return {"id": f"order_{n['i']}", "amount": amount}
    return make(tmp_path, RAZORPAY_KEY_ID="rzp_test_x", RAZORPAY_KEY_SECRET=SECRET, RAZORPAY_WEBHOOK_SECRET=WH, RZP_CREATE_ORDER=fake)

def sign(o, p, s=SECRET): return hmac.new(s.encode(), f"{o}|{p}".encode(), hashlib.sha256).hexdigest()

def test_live_verify_signature(live):
    b = book(live).json; assert b["orderId"] == "order_1" and b["razorpayKeyId"] == "rzp_test_x" and b["mode"] == "live"
    assert live.post("/api/payments/mock-confirm", json={"reference": b["reference"]}).status_code == 404  # no mock bypass
    bad = live.post("/api/payments/verify", json={"razorpay_order_id": "order_1", "razorpay_payment_id": "pay_1", "razorpay_signature": "0"*64})
    assert bad.status_code == 400
    wrong = live.post("/api/payments/verify", json={"razorpay_order_id": "order_1", "razorpay_payment_id": "pay_1", "razorpay_signature": sign("order_1","pay_1","other")})
    assert wrong.status_code == 400
    ok = live.post("/api/payments/verify", json={"razorpay_order_id": "order_1", "razorpay_payment_id": "pay_1", "razorpay_signature": sign("order_1","pay_1")})
    assert ok.status_code == 200 and ok.json["status"] == "paid"

def hook(c, order, amount, secret=WH, event="payment.captured"):
    body = json.dumps({"event": event, "payload": {"payment": {"entity": {"id": "pay_9", "order_id": order, "amount": amount, "currency": "INR"}}}}).encode()
    return c.post("/api/payments/webhook", data=body, headers={"X-Razorpay-Signature": hmac.new(secret.encode(), body, hashlib.sha256).hexdigest(), "Content-Type": "application/json"})

def test_webhook(live):
    b = book(live).json
    assert hook(live, "order_1", b["amountPaise"], secret="evil").status_code == 400
    hook(live, "order_1", 100)  # wrong amount must NOT mark paid
    assert live.get("/api/admin/bookings?status=paid", headers={"Authorization": "Bearer adm-secret"}).json == []
    assert hook(live, "order_1", b["amountPaise"]).status_code == 200
    assert hook(live, "order_1", b["amountPaise"]).status_code == 200  # idempotent
    rows = live.get("/api/admin/bookings?status=paid", headers={"Authorization": "Bearer adm-secret"}).json
    assert len(rows) == 1 and rows[0]["gateway_payment_id"] == "pay_9"

def test_gateway_down(tmp_path):
    def boom(*a): raise A.urllib.error.URLError("down")
    cl = make(tmp_path, RAZORPAY_KEY_ID="k", RAZORPAY_KEY_SECRET="s", RZP_CREATE_ORDER=boom)
    assert book(cl).status_code == 502
    assert cl.get("/api/admin/bookings", headers={"Authorization": "Bearer adm-secret"}).json == []  # nothing orphaned

# ---- admin ----
def test_admin_auth(c, tmp_path):
    assert c.get("/api/admin/bookings").status_code == 401
    assert c.get("/api/admin/bookings", headers={"Authorization": "Bearer nope"}).status_code == 401
    assert make(tmp_path / ".." / "x" if False else tmp_path, ADMIN_TOKEN="").get("/api/admin/bookings").status_code == 404

def test_admin_list_cancel(c):
    h = {"Authorization": "Bearer adm-secret"}; ref = book(c).json["reference"]
    rows = c.get("/api/admin/bookings", headers=h).json; assert rows[0]["reference"] == ref and "idempotency_key" not in rows[0]
    assert c.patch(f"/api/admin/bookings/{ref}", json={"status": "paid"}, headers=h).status_code == 400
    assert c.patch(f"/api/admin/bookings/{ref}", json={"status": "cancelled"}, headers=h).status_code == 200
    assert c.post("/api/payments/mock-confirm", json={"reference": ref}).status_code == 409  # cancelled can't be paid

def test_csv_formula_injection(c):
    book(c, name="=HYPERLINK(1)")  # '=' start passes validation; export must neutralise it
    t = c.get("/api/admin/export.csv", headers={"Authorization": "Bearer adm-secret"}).data.decode()
    assert "'=HYPERLINK(1)" in t and ",=HYPERLINK" not in t

def test_static_and_headers(c):
    r = c.get("/"); assert r.status_code == 200 and b"booking-phone" in r.data and r.headers["X-Content-Type-Options"] == "nosniff"
    assert c.get("/api/nothing").status_code == 404

def test_csv_empty_cells_stay_empty(c):
    book(c)
    row = c.get("/api/admin/export.csv", headers={"Authorization": "Bearer adm-secret"}).data.decode().splitlines()[1]
    assert "'" not in row
