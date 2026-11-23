'use strict';
const express = require('express');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const { transaction } = require('./db');
const { quote, MAX_TRAVELLERS } = require('./pricing');
const auth = require('./auth');
const v = require('./validate');
const { createRazorpay } = require('./razorpay');

const COOKIE = 'tt_admin';
const SESSION_MS = 8 * 60 * 60 * 1000;
const HOLD_MS = 30 * 60 * 1000;
const todayISO = () => new Date().toISOString().slice(0, 10);
const httpError = (status, message) => Object.assign(new Error(message), { status });

const REF_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
function makeReference() {
  const bytes = crypto.randomBytes(8);
  let out = 'TT-';
  for (const b of bytes) out += REF_ALPHABET[b % REF_ALPHABET.length];
  return out;
}

function createApp(db, cfg) {
  if (!cfg.sessionSecret || cfg.sessionSecret.length < 32) throw new Error('SESSION_SECRET must be at least 32 characters.');
  const secret = cfg.sessionSecret;
  const app = express();
  app.disable('x-powered-by');
  if (cfg.trustProxy) app.set('trust proxy', 1);

  const limits = {
    login: { max: 5, windowMs: 15 * 60 * 1000 },
    write: { max: 20, windowMs: 60 * 60 * 1000 },
    read: { max: 600, windowMs: 60 * 1000 },
    ...(cfg.limits || {}),
  };
  const loginLimit = auth.rateLimiter({ name: 'login', ...limits.login });
  const writeLimit = auth.rateLimiter({ name: 'write', ...limits.write });
  const readLimit = auth.rateLimiter({ name: 'read', ...limits.read });
  const payLimit = auth.rateLimiter({ name: 'pay', ...(limits.pay || { max: 30, windowMs: 60 * 60 * 1000 }) });
  const rzp = createRazorpay(cfg.razorpay || {});

  // ---- shared helpers -------------------------------------------------
  const nowISO = () => new Date().toISOString();

  /** Release seats held by unpaid bookings whose 30-minute hold has run out. */
  function releaseExpired() {
    return transaction(db, () => {
      const rows = db.prepare("SELECT id, departure_id, travellers FROM bookings WHERE status = 'pending' AND hold_expires_at IS NOT NULL AND hold_expires_at <= ?").all(nowISO());
      for (const r of rows) {
        db.prepare("UPDATE bookings SET status = 'expired', updated_at = ? WHERE id = ?").run(nowISO(), r.id);
        db.prepare('UPDATE departures SET booked = booked - ? WHERE id = ?').run(r.travellers, r.departure_id);
      }
      return rows.length;
    });
  }
  const tripExists = (id) => !!db.prepare('SELECT 1 FROM trips WHERE id = ? AND active = 1').get(id);

  // ---- security headers + body parsing ---------------------------------
  app.use('/api', (req, res, next) => {
    res.set({
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'Referrer-Policy': 'no-referrer',
    });
    next();
  });
  // rawBody is kept so webhook signatures can be checked against the exact bytes Razorpay sent.
  app.use('/api', express.json({ limit: '20kb', verify: (req, res, buf) => { req.rawBody = buf; } }));

  // ---- public API ------------------------------------------------------
  app.get('/api/health', (req, res) => res.json({ ok: true }));

  app.get('/api/trips', readLimit, (req, res) => {
    releaseExpired();
    const trips = db.prepare('SELECT id, title, duration, standard_paise, comfort_paise FROM trips WHERE active = 1 ORDER BY rowid').all();
    const departures = db.prepare("SELECT id, trip_id, start_date, capacity, booked FROM departures WHERE status = 'open' AND start_date > ? ORDER BY start_date").all(todayISO());
    res.json({
      trips: trips.map((t) => ({
        id: t.id, title: t.title, duration: t.duration,
        standardPaise: t.standard_paise, comfortPaise: t.comfort_paise,
        departures: departures.filter((d) => d.trip_id === t.id).map((d) => ({
          id: d.id, startDate: d.start_date, seatsLeft: d.capacity - d.booked,
        })),
      })),
    });
  });

  app.post('/api/bookings', writeLimit, (req, res) => {
    const b = req.body ?? {};
    const input = {
      departureId: v.integer(b.departureId, 'Departure', { min: 1, max: 2147483647 }),
      pkg: v.oneOf(b.package, 'Package', ['standard', 'comfort']),
      travellers: v.integer(b.travellers, 'Travellers', { min: 1, max: MAX_TRAVELLERS }),
      name: v.text(b.name, 'Name', { min: 2, max: 80 }),
      phone: v.phone(b.phone),
      email: v.email(b.email),
    };
    releaseExpired();
    const result = transaction(db, () => {
      const dep = db.prepare(`SELECT d.id, d.start_date, d.capacity, d.booked, d.status, t.standard_paise, t.comfort_paise, t.active
        FROM departures d JOIN trips t ON t.id = d.trip_id WHERE d.id = ?`).get(input.departureId);
      if (!dep || !dep.active || dep.status !== 'open' || dep.start_date <= todayISO()) throw httpError(409, 'This departure is not available.');
      const left = dep.capacity - dep.booked;
      if (input.travellers > left) throw httpError(409, left > 0 ? `Only ${left} seat${left === 1 ? '' : 's'} left on this departure.` : 'This departure is full.');
      const q = quote({ unitPaise: input.pkg === 'standard' ? dep.standard_paise : dep.comfort_paise, travellers: input.travellers });
      const reference = makeReference();
      const holdExpiresAt = new Date(Date.now() + HOLD_MS).toISOString();
      db.prepare('UPDATE departures SET booked = booked + ? WHERE id = ?').run(input.travellers, dep.id);
      db.prepare(`INSERT INTO bookings (reference, departure_id, package, travellers, name, phone, email, offer_code,
        subtotal_paise, group_discount_paise, offer_discount_paise, total_paise, status, hold_expires_at)
        VALUES (?,?,?,?,?,?,?,?,?,?,?,?, 'pending', ?)`).run(
        reference, dep.id, input.pkg, input.travellers, input.name, input.phone, input.email || null, null,
        q.subtotalPaise, q.groupDiscountPaise, 0, q.totalPaise, holdExpiresAt);
      return { reference, holdExpiresAt, departure: { id: dep.id, startDate: dep.start_date }, quote: q };
    });
    res.status(201).json({ ...result, status: 'pending', note: 'Seats are held for 30 minutes. The team confirms the booking after payment.' });
  });

  // ---- payments (Razorpay; test mode until live keys are added) ----------
  const refParam = (req) => v.text(req.params.reference, 'Reference', { min: 5, max: 20 });

  /**
   * Mark a booking paid. Safe to call twice (checkout callback + webhook): the second call changes nothing.
   * If the hold already expired, the payment id is still stored and seats are re-taken only if they are free.
   */
  function markPaid(orderId, paymentId) {
    return transaction(db, () => {
      const b = db.prepare('SELECT id, status, departure_id, travellers, razorpay_payment_id FROM bookings WHERE razorpay_order_id = ?').get(orderId);
      if (!b) throw httpError(404, 'Booking not found for this payment.');
      if (b.status === 'confirmed') return { status: 'confirmed', already: true };
      if (b.status === 'cancelled') {
        db.prepare('UPDATE bookings SET razorpay_payment_id = ?, updated_at = ? WHERE id = ?').run(paymentId, nowISO(), b.id);
        return { status: 'cancelled', needsReview: true };
      }
      if (b.status === 'expired') {
        const dep = db.prepare('SELECT capacity, booked, status FROM departures WHERE id = ?').get(b.departure_id);
        if (dep.status !== 'open' || dep.capacity - dep.booked < b.travellers) {
          db.prepare('UPDATE bookings SET razorpay_payment_id = ?, updated_at = ? WHERE id = ?').run(paymentId, nowISO(), b.id);
          return { status: 'expired', needsReview: true };
        }
        db.prepare('UPDATE departures SET booked = booked + ? WHERE id = ?').run(b.travellers, b.departure_id);
      }
      db.prepare("UPDATE bookings SET status = 'confirmed', hold_expires_at = NULL, razorpay_payment_id = ?, updated_at = ? WHERE id = ?").run(paymentId, nowISO(), b.id);
      return { status: 'confirmed' };
    });
  }

  app.get('/api/payments/config', readLimit, (req, res) => {
    res.json({ enabled: rzp.enabled, mode: rzp.mode, keyId: rzp.keyId });
  });

  app.post('/api/bookings/:reference/pay', payLimit, async (req, res) => {
    if (!rzp.enabled) throw httpError(503, 'Online payment is not switched on yet. The team will confirm your booking.');
    const reference = refParam(req);
    releaseExpired();
    const b = db.prepare('SELECT id, reference, status, total_paise, razorpay_order_id, hold_expires_at FROM bookings WHERE reference = ?').get(reference);
    if (!b) throw httpError(404, 'Booking not found.');
    if (b.status !== 'pending') throw httpError(409, b.status === 'expired' ? 'This seat hold has expired. Please book again.' : `This booking is already ${b.status}.`);
    if (b.razorpay_order_id) return res.json({ orderId: b.razorpay_order_id, amountPaise: b.total_paise, currency: 'INR', keyId: rzp.keyId, mode: rzp.mode, reference: b.reference });
    const order = await rzp.createOrder({ amountPaise: b.total_paise, receipt: b.reference, notes: { reference: b.reference } });
    const saved = db.prepare("UPDATE bookings SET razorpay_order_id = ?, updated_at = ? WHERE id = ? AND razorpay_order_id IS NULL AND status = 'pending'").run(order.id, nowISO(), b.id);
    if (!saved.changes) { // another request created an order first (or the hold just ended): use whatever is stored
      const again = db.prepare('SELECT razorpay_order_id AS orderId, status FROM bookings WHERE id = ?').get(b.id);
      if (again.status !== 'pending' || !again.orderId) throw httpError(409, 'This booking can no longer be paid. Please book again.');
      return res.json({ orderId: again.orderId, amountPaise: b.total_paise, currency: 'INR', keyId: rzp.keyId, mode: rzp.mode, reference: b.reference });
    }
    res.status(201).json({ orderId: order.id, amountPaise: b.total_paise, currency: 'INR', keyId: rzp.keyId, mode: rzp.mode, reference: b.reference });
  });

  app.post('/api/payments/verify', payLimit, (req, res) => {
    if (!rzp.enabled) throw httpError(503, 'Online payment is not switched on yet.');
    const b = req.body ?? {};
    const orderId = v.text(b.razorpay_order_id, 'Order', { max: 60 });
    const paymentId = v.text(b.razorpay_payment_id, 'Payment', { max: 60 });
    const signature = v.text(b.razorpay_signature, 'Signature', { max: 200 });
    if (!rzp.verifyCheckout({ orderId, paymentId, signature })) throw httpError(400, 'Payment could not be verified.');
    const r = markPaid(orderId, paymentId);
    const note = r.needsReview
      ? 'Payment received, but the seats could not be held. The team will contact you shortly.'
      : 'Payment received. Your booking is confirmed.';
    res.json({ ...r, note });
  });

  app.post('/api/webhooks/razorpay', (req, res) => {
    if (!rzp.hasWebhook) throw httpError(503, 'Webhook is not configured.');
    if (!rzp.verifyWebhook(req.rawBody, req.get('x-razorpay-signature'))) throw httpError(400, 'Bad signature.');
    const ev = req.body ?? {};
    const pay = ev.payload?.payment?.entity;
    if ((ev.event === 'payment.captured' || ev.event === 'order.paid') && pay?.order_id && pay?.id) {
      try { markPaid(String(pay.order_id), String(pay.id)); } catch (e) { if (e.status !== 404) throw e; }
    }
    res.json({ received: true });
  });

  app.get('/api/reviews', readLimit, (req, res) => {
    const trip = typeof req.query.trip === 'string' ? req.query.trip : '';
    const rows = trip
      ? db.prepare("SELECT id, trip_id, name, rating, title, body, created_at FROM reviews WHERE status = 'approved' AND trip_id = ? ORDER BY id DESC LIMIT 100").all(trip)
      : db.prepare("SELECT id, trip_id, name, rating, title, body, created_at FROM reviews WHERE status = 'approved' ORDER BY id DESC LIMIT 100").all();
    res.json({ reviews: rows.map((r) => ({ id: r.id, tripId: r.trip_id, name: r.name, rating: r.rating, title: r.title, body: r.body, createdAt: r.created_at })) });
  });

  app.post('/api/reviews', writeLimit, (req, res) => {
    const b = req.body ?? {};
    const tripId = v.text(b.tripId, 'Trip', { max: 40 });
    if (!tripExists(tripId)) throw new v.ValidationError('Trip is not valid.');
    const review = {
      name: v.text(b.name, 'Name', { min: 2, max: 60 }),
      rating: v.integer(b.rating, 'Rating', { min: 1, max: 5 }),
      title: v.text(b.title, 'Title', { min: 3, max: 80 }),
      body: v.text(b.body, 'Review', { min: 10, max: 600, multiline: true }),
    };
    db.prepare("INSERT INTO reviews (trip_id, name, rating, title, body, status) VALUES (?,?,?,?,?, 'pending')").run(tripId, review.name, review.rating, review.title, review.body);
    res.status(201).json({ status: 'pending', note: 'Thanks. Your review appears after the team approves it.' });
  });

  app.post('/api/enquiries', writeLimit, (req, res) => {
    const b = req.body ?? {};
    const tripId = v.text(b.tripId, 'Trip', { optional: true, max: 40 });
    if (tripId && !tripExists(tripId)) throw new v.ValidationError('Trip is not valid.');
    const e = {
      name: v.text(b.name, 'Name', { min: 2, max: 80 }),
      contact: v.text(b.contact, 'Phone or email', { min: 5, max: 120 }),
      message: v.text(b.message, 'Message', { min: 5, max: 1200, multiline: true }),
    };
    db.prepare("INSERT INTO enquiries (trip_id, name, contact, message) VALUES (?,?,?,?)").run(tripId || null, e.name, e.contact, e.message);
    res.status(201).json({ status: 'received' });
  });

  // ---- admin auth ------------------------------------------------------
  const cookieFlags = `Path=/; HttpOnly; SameSite=Strict${cfg.production ? '; Secure' : ''}`;

  app.post('/api/admin/login', loginLimit, (req, res) => {
    const b = req.body ?? {};
    const email = typeof b.email === 'string' ? b.email.trim().toLowerCase().slice(0, 120) : '';
    const password = typeof b.password === 'string' ? b.password.slice(0, 200) : '';
    const row = email ? db.prepare('SELECT id, email, password_hash FROM admins WHERE email = ?').get(email) : null;
    const ok = auth.verifyPassword(password, row?.password_hash); // always runs scrypt, so timing does not reveal valid emails
    if (!row || !ok) return res.status(401).json({ error: 'Email or password is not correct.' });
    const token = auth.signToken({ aid: row.id, email: row.email, exp: Date.now() + SESSION_MS }, secret);
    res.set('Set-Cookie', `${COOKIE}=${encodeURIComponent(token)}; Max-Age=${SESSION_MS / 1000}; ${cookieFlags}`);
    res.json({ email: row.email, csrfToken: auth.csrfFor(token, secret) });
  });

  // Logout must really end the session: signed tokens are remembered as revoked until they would have expired anyway.
  db.exec('CREATE TABLE IF NOT EXISTS revoked_sessions (sig TEXT PRIMARY KEY, exp INTEGER NOT NULL)');
  const sigOf = (token) => crypto.createHash('sha256').update(String(token)).digest('hex');

  function requireAdmin(req, res, next) {
    const token = auth.parseCookies(req.headers.cookie)[COOKIE];
    const p = auth.verifyToken(token, secret);
    const revoked = p && db.prepare('SELECT 1 FROM revoked_sessions WHERE sig = ?').get(sigOf(token));
    const admin = p && !revoked && db.prepare('SELECT id, email FROM admins WHERE id = ?').get(p.aid);
    if (!admin) return res.status(401).json({ error: 'Please sign in.' });
    req.admin = admin;
    req.csrf = auth.csrfFor(token, secret);
    if (!['GET', 'HEAD'].includes(req.method)) {
      const sent = String(req.get('x-csrf-token') || '');
      const a = Buffer.from(sent), b = Buffer.from(req.csrf);
      if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return res.status(403).json({ error: 'Security check failed. Reload the page and try again.' });
    }
    next();
  }

  app.get('/api/admin/me', requireAdmin, (req, res) => res.json({ email: req.admin.email, csrfToken: req.csrf }));
  app.post('/api/admin/logout', requireAdmin, (req, res) => {
    const token = auth.parseCookies(req.headers.cookie)[COOKIE];
    const p = auth.verifyToken(token, secret);
    db.prepare('DELETE FROM revoked_sessions WHERE exp < ?').run(Date.now());
    db.prepare('INSERT OR IGNORE INTO revoked_sessions (sig, exp) VALUES (?, ?)').run(sigOf(token), p.exp);
    res.set('Set-Cookie', `${COOKIE}=; Max-Age=0; ${cookieFlags}`);
    res.json({ ok: true });
  });

  // ---- admin data ------------------------------------------------------
  const admin = express.Router();
  admin.use(requireAdmin);
  const idParam = (req) => v.integer(req.params.id, 'Id', { min: 1, max: 2147483647 });

  admin.get('/summary', (req, res) => {
    releaseExpired();
    const one = (sql, ...a) => db.prepare(sql).get(...a).n;
    res.json({
      openDepartures: one("SELECT COUNT(*) n FROM departures WHERE status='open' AND start_date > ?", todayISO()),
      pendingBookings: one("SELECT COUNT(*) n FROM bookings WHERE status='pending'"),
      confirmedBookings: one("SELECT COUNT(*) n FROM bookings WHERE status='confirmed'"),
      pendingReviews: one("SELECT COUNT(*) n FROM reviews WHERE status='pending'"),
      newEnquiries: one("SELECT COUNT(*) n FROM enquiries WHERE status='new'"),
    });
  });

  admin.get('/trips', (req, res) => {
    res.json({ trips: db.prepare('SELECT id, title, duration, standard_paise AS standardPaise, comfort_paise AS comfortPaise, active FROM trips ORDER BY rowid').all() });
  });
  admin.patch('/trips/:id', (req, res) => {
    const b = req.body ?? {};
    const t = db.prepare('SELECT id FROM trips WHERE id = ?').get(String(req.params.id));
    if (!t) throw httpError(404, 'Trip not found.');
    if (b.standardPaise !== undefined) db.prepare('UPDATE trips SET standard_paise = ? WHERE id = ?').run(v.integer(b.standardPaise, 'Standard price', { min: 100, max: 100000000 }), t.id);
    if (b.comfortPaise !== undefined) db.prepare('UPDATE trips SET comfort_paise = ? WHERE id = ?').run(v.integer(b.comfortPaise, 'Comfort price', { min: 100, max: 100000000 }), t.id);
    if (b.active !== undefined) db.prepare('UPDATE trips SET active = ? WHERE id = ?').run(v.oneOf(b.active, 'Active', [0, 1, true, false]) ? 1 : 0, t.id);
    res.json({ ok: true });
  });

  admin.get('/departures', (req, res) => {
    releaseExpired();
    res.json({ departures: db.prepare(`SELECT d.id, d.trip_id AS tripId, t.title AS tripTitle, d.start_date AS startDate, d.capacity, d.booked, d.status
      FROM departures d JOIN trips t ON t.id = d.trip_id ORDER BY d.start_date DESC, d.id DESC LIMIT 300`).all() });
  });
  admin.post('/departures', (req, res) => {
    const b = req.body ?? {};
    const tripId = v.text(b.tripId, 'Trip', { max: 40 });
    if (!db.prepare('SELECT 1 FROM trips WHERE id = ?').get(tripId)) throw new v.ValidationError('Trip is not valid.');
    const startDate = v.isoDate(b.startDate, 'Start date');
    const capacity = v.integer(b.capacity, 'Capacity', { min: 1, max: 500 });
    if (startDate <= todayISO()) throw new v.ValidationError('Start date must be in the future.');
    const r = db.prepare('INSERT INTO departures (trip_id, start_date, capacity) VALUES (?,?,?)').run(tripId, startDate, capacity);
    res.status(201).json({ id: Number(r.lastInsertRowid) });
  });
  admin.patch('/departures/:id', (req, res) => {
    const id = idParam(req), b = req.body ?? {};
    transaction(db, () => {
      const d = db.prepare('SELECT id, booked FROM departures WHERE id = ?').get(id);
      if (!d) throw httpError(404, 'Departure not found.');
      if (b.capacity !== undefined) {
        const capacity = v.integer(b.capacity, 'Capacity', { min: 1, max: 500 });
        if (capacity < d.booked) throw httpError(409, `${d.booked} seats are already booked or held, so capacity cannot go below that.`);
        db.prepare('UPDATE departures SET capacity = ? WHERE id = ?').run(capacity, id);
      }
      if (b.status !== undefined) db.prepare('UPDATE departures SET status = ? WHERE id = ?').run(v.oneOf(b.status, 'Status', ['open', 'closed', 'cancelled']), id);
    });
    res.json({ ok: true });
  });

  admin.get('/bookings', (req, res) => {
    releaseExpired();
    const status = typeof req.query.status === 'string' && ['pending', 'confirmed', 'cancelled', 'expired'].includes(req.query.status) ? req.query.status : null;
    const sql = `SELECT b.id, b.reference, b.package, b.travellers, b.name, b.phone, b.email, b.offer_code AS offerCode,
      b.subtotal_paise AS subtotalPaise, b.group_discount_paise AS groupDiscountPaise, b.offer_discount_paise AS offerDiscountPaise,
      b.total_paise AS totalPaise, b.status, b.hold_expires_at AS holdExpiresAt, b.created_at AS createdAt,
      b.razorpay_payment_id AS paymentId,
      d.start_date AS startDate, t.title AS tripTitle
      FROM bookings b JOIN departures d ON d.id = b.departure_id JOIN trips t ON t.id = d.trip_id
      ${status ? 'WHERE b.status = ?' : ''} ORDER BY b.id DESC LIMIT 300`;
    res.json({ bookings: status ? db.prepare(sql).all(status) : db.prepare(sql).all() });
  });
  admin.patch('/bookings/:id', (req, res) => {
    const id = idParam(req);
    const next = v.oneOf((req.body ?? {}).status, 'Status', ['confirmed', 'cancelled']);
    transaction(db, () => {
      const b = db.prepare('SELECT id, status, departure_id, travellers FROM bookings WHERE id = ?').get(id);
      if (!b) throw httpError(404, 'Booking not found.');
      if (b.status === next) return;
      const allowed = (b.status === 'pending') || (b.status === 'confirmed' && next === 'cancelled');
      if (!allowed) throw httpError(409, `A ${b.status} booking cannot be changed to ${next}.`);
      if (next === 'cancelled') db.prepare('UPDATE departures SET booked = booked - ? WHERE id = ?').run(b.travellers, b.departure_id);
      db.prepare('UPDATE bookings SET status = ?, hold_expires_at = NULL, updated_at = ? WHERE id = ?').run(next, nowISO(), id);
    });
    res.json({ ok: true });
  });

  admin.get('/reviews', (req, res) => {
    const status = ['pending', 'approved', 'rejected'].includes(req.query.status) ? req.query.status : 'pending';
    res.json({ reviews: db.prepare(`SELECT r.id, r.trip_id AS tripId, t.title AS tripTitle, r.name, r.rating, r.title, r.body, r.status, r.created_at AS createdAt
      FROM reviews r JOIN trips t ON t.id = r.trip_id WHERE r.status = ? ORDER BY r.id DESC LIMIT 300`).all(status) });
  });
  admin.patch('/reviews/:id', (req, res) => {
    const id = idParam(req);
    const status = v.oneOf((req.body ?? {}).status, 'Status', ['pending', 'approved', 'rejected']);
    const r = db.prepare('UPDATE reviews SET status = ? WHERE id = ?').run(status, id);
    if (!r.changes) throw httpError(404, 'Review not found.');
    res.json({ ok: true });
  });

  admin.get('/enquiries', (req, res) => {
    const status = ['new', 'handled'].includes(req.query.status) ? req.query.status : null;
    const sql = `SELECT id, trip_id AS tripId, name, contact, message, status, created_at AS createdAt FROM enquiries ${status ? 'WHERE status = ?' : ''} ORDER BY id DESC LIMIT 300`;
    res.json({ enquiries: status ? db.prepare(sql).all(status) : db.prepare(sql).all() });
  });
  admin.patch('/enquiries/:id', (req, res) => {
    const id = idParam(req);
    const status = v.oneOf((req.body ?? {}).status, 'Status', ['new', 'handled']);
    const r = db.prepare('UPDATE enquiries SET status = ? WHERE id = ?').run(status, id);
    if (!r.changes) throw httpError(404, 'Enquiry not found.');
    res.json({ ok: true });
  });
  app.use('/api/admin', admin);

  // ---- admin UI + website ------------------------------------------------
  const adminDir = path.join(__dirname, '..', 'admin');
  if (fs.existsSync(adminDir)) {
    app.use('/admin', (req, res, next) => {
      res.set({
        'Content-Security-Policy': "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'self'; frame-ancestors 'none'; base-uri 'none'; form-action 'self'",
        'X-Frame-Options': 'DENY', 'X-Content-Type-Options': 'nosniff', 'Referrer-Policy': 'no-referrer', 'Cache-Control': 'no-store',
      });
      next();
    }, express.static(adminDir));
  }
  if (cfg.siteDir && fs.existsSync(cfg.siteDir)) {
    app.use(express.static(cfg.siteDir, { extensions: ['html'], setHeaders: (res, file) => {
      if (/sw\.js$|index\.html$/.test(file)) res.set('Cache-Control', 'no-cache');
    } }));
  }

  app.use('/api', (req, res) => res.status(404).json({ error: 'Not found.' }));

  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    const sqlite = String(err?.code || '') === 'ERR_SQLITE_ERROR' ? String(err.message || '') : '';
    if (sqlite.includes('UNIQUE') && sqlite.includes('departures')) return res.status(409).json({ error: 'A departure on that date already exists for this trip.' });
    if (err.type === 'entity.parse.failed') return res.status(400).json({ error: 'Request body is not valid JSON.' });
    if (err.type === 'entity.too.large') return res.status(413).json({ error: 'Request is too large.' });
    const status = Number.isInteger(err.status) && err.status >= 400 && err.status < 600 ? err.status : 500;
    if (status === 500) console.error('[error]', err);
    res.status(status).json({ error: status === 500 ? 'Something went wrong. Please try again.' : err.message });
  });

  return Object.assign(app, { releaseExpired });
}

module.exports = { createApp, HOLD_MS };
