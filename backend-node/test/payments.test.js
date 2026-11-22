'use strict';
const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { openDatabase } = require('../src/db');
const { createApp } = require('../src/app');
const { seed } = require('../src/seed');
const { hmacHex } = require('../src/razorpay');

const SECRET = 'y'.repeat(48);
const KEY_ID = 'rzp_test_unit';
const KEY_SECRET = 'test_key_secret';
const HOOK_SECRET = 'test_hook_secret';

let dbOn, appOn, srvOn, baseOn, dbOff, appOff, srvOff, baseOff, orderCalls;

const listen = (app) => new Promise((resolve) => { const s = app.listen(0, () => resolve(s)); });
async function call(base, p, { method = 'GET', body, headers = {}, raw } = {}) {
  const h = { ...headers };
  if (body !== undefined || raw !== undefined) h['content-type'] = 'application/json';
  const res = await fetch(base + p, { method, headers: h, body: raw ?? (body === undefined ? undefined : JSON.stringify(body)) });
  let json = null;
  try { json = await res.json(); } catch { /* none */ }
  return { status: res.status, json, headers: res.headers };
}

before(async () => {
  orderCalls = [];
  const limits = { login: { max: 50, windowMs: 1000 }, write: { max: 1000, windowMs: 1000 }, pay: { max: 1000, windowMs: 1000 } };
  dbOn = openDatabase(':memory:'); seed(dbOn);
  appOn = createApp(dbOn, {
    sessionSecret: SECRET, production: false, limits,
    razorpay: {
      keyId: KEY_ID, keySecret: KEY_SECRET, webhookSecret: HOOK_SECRET,
      client: { async createOrder(args) { orderCalls.push(args); return { id: 'order_' + String(orderCalls.length).padStart(4, '0'), amount: args.amountPaise }; } },
    },
  });
  dbOff = openDatabase(':memory:'); seed(dbOff);
  appOff = createApp(dbOff, { sessionSecret: SECRET, production: false, limits });
  srvOn = await listen(appOn); baseOn = `http://127.0.0.1:${srvOn.address().port}`;
  srvOff = await listen(appOff); baseOff = `http://127.0.0.1:${srvOff.address().port}`;
});
after(() => { srvOn.close(); srvOff.close(); });

const dep = (db, i = 0) => db.prepare('SELECT * FROM departures ORDER BY id LIMIT 1 OFFSET ?').get(i);
async function book(base, db, extra = {}, i = 0) {
  const d = dep(db, i);
  const r = await call(base, '/api/bookings', { method: 'POST', body: { departureId: d.id, package: 'standard', travellers: 2, name: 'Pay Tester', phone: '+91 98765 43210', ...extra } });
  assert.equal(r.status, 201, JSON.stringify(r.json));
  return { ref: r.json.reference, d };
}
const row = (db, ref) => db.prepare('SELECT * FROM bookings WHERE reference = ?').get(ref);
const checkoutSig = (orderId, paymentId, secret = KEY_SECRET) => hmacHex(secret, `${orderId}|${paymentId}`);

test('payments are off without keys, and say so plainly', async () => {
  const cfg = await call(baseOff, '/api/payments/config');
  assert.deepEqual(cfg.json, { enabled: false, mode: 'off', keyId: null });
  const { ref } = await book(baseOff, dbOff);
  const r = await call(baseOff, `/api/bookings/${ref}/pay`, { method: 'POST' });
  assert.equal(r.status, 503);
  assert.match(r.json.error, /not switched on/i);
});

test('config shows test mode and the public key id only', async () => {
  const cfg = await call(baseOn, '/api/payments/config');
  assert.deepEqual(cfg.json, { enabled: true, mode: 'test', keyId: KEY_ID });
  assert.ok(!JSON.stringify(cfg.json).includes(KEY_SECRET));
});

test('pay creates one order for the server-side total and reuses it on repeat', async () => {
  const { ref } = await book(baseOn, dbOn);
  const before = orderCalls.length;
  const a = await call(baseOn, `/api/bookings/${ref}/pay`, { method: 'POST' });
  assert.equal(a.status, 201);
  assert.equal(a.json.amountPaise, row(dbOn, ref).total_paise);
  assert.equal(a.json.currency, 'INR');
  assert.equal(a.json.keyId, KEY_ID);
  assert.equal(orderCalls[before].receipt, ref);
  const b = await call(baseOn, `/api/bookings/${ref}/pay`, { method: 'POST' });
  assert.equal(b.status, 200);
  assert.equal(b.json.orderId, a.json.orderId);
  assert.equal(orderCalls.length, before + 1, 'no second order created');
  assert.equal((await call(baseOn, '/api/bookings/TT-NOPE1234/pay', { method: 'POST' })).status, 404);
});

test('verify: wrong signature is refused, right one confirms, repeat is harmless', async () => {
  const { ref, d } = await book(baseOn, dbOn);
  const { json: o } = await call(baseOn, `/api/bookings/${ref}/pay`, { method: 'POST' });
  const body = (sig) => ({ razorpay_order_id: o.orderId, razorpay_payment_id: 'pay_AAA111', razorpay_signature: sig });
  const bad = await call(baseOn, '/api/payments/verify', { method: 'POST', body: body(checkoutSig(o.orderId, 'pay_AAA111', 'wrong')) });
  assert.equal(bad.status, 400);
  assert.equal(row(dbOn, ref).status, 'pending');
  const booked = dbOn.prepare('SELECT booked FROM departures WHERE id = ?').get(d.id).booked;
  const good = await call(baseOn, '/api/payments/verify', { method: 'POST', body: body(checkoutSig(o.orderId, 'pay_AAA111')) });
  assert.equal(good.status, 200);
  assert.equal(good.json.status, 'confirmed');
  assert.equal(row(dbOn, ref).status, 'confirmed');
  assert.equal(row(dbOn, ref).razorpay_payment_id, 'pay_AAA111');
  assert.equal(row(dbOn, ref).hold_expires_at, null);
  const again = await call(baseOn, '/api/payments/verify', { method: 'POST', body: body(checkoutSig(o.orderId, 'pay_AAA111')) });
  assert.equal(again.status, 200);
  assert.equal(dbOn.prepare('SELECT booked FROM departures WHERE id = ?').get(d.id).booked, booked, 'seats not double counted');
  const missing = await call(baseOn, '/api/payments/verify', { method: 'POST', body: { razorpay_order_id: o.orderId } });
  assert.equal(missing.status, 400);
});

test('a signature for another order cannot confirm this booking', async () => {
  const a = await book(baseOn, dbOn); const b = await book(baseOn, dbOn);
  const oa = (await call(baseOn, `/api/bookings/${a.ref}/pay`, { method: 'POST' })).json;
  const ob = (await call(baseOn, `/api/bookings/${b.ref}/pay`, { method: 'POST' })).json;
  const r = await call(baseOn, '/api/payments/verify', { method: 'POST', body: { razorpay_order_id: ob.orderId, razorpay_payment_id: 'pay_X', razorpay_signature: checkoutSig(oa.orderId, 'pay_X') } });
  assert.equal(r.status, 400);
  assert.equal(row(dbOn, b.ref).status, 'pending');
});

test('webhook: signed event confirms, bad signature is refused, duplicates are ignored', async () => {
  const { ref } = await book(baseOn, dbOn);
  const o = (await call(baseOn, `/api/bookings/${ref}/pay`, { method: 'POST' })).json;
  const raw = JSON.stringify({ event: 'payment.captured', payload: { payment: { entity: { id: 'pay_HOOK01', order_id: o.orderId } } } });
  const bad = await call(baseOn, '/api/webhooks/razorpay', { method: 'POST', raw, headers: { 'x-razorpay-signature': hmacHex('nope', raw) } });
  assert.equal(bad.status, 400);
  assert.equal(row(dbOn, ref).status, 'pending');
  const sig = { 'x-razorpay-signature': hmacHex(HOOK_SECRET, raw) };
  assert.equal((await call(baseOn, '/api/webhooks/razorpay', { method: 'POST', raw, headers: sig })).status, 200);
  assert.equal(row(dbOn, ref).status, 'confirmed');
  assert.equal((await call(baseOn, '/api/webhooks/razorpay', { method: 'POST', raw, headers: sig })).status, 200);
  const unknown = JSON.stringify({ event: 'payment.captured', payload: { payment: { entity: { id: 'pay_Z', order_id: 'order_unknown' } } } });
  assert.equal((await call(baseOn, '/api/webhooks/razorpay', { method: 'POST', raw: unknown, headers: { 'x-razorpay-signature': hmacHex(HOOK_SECRET, unknown) } })).status, 200);
});

test('paying after the hold ended: seats re-taken if free, otherwise flagged for the team', async () => {
  // expired but seats free -> confirmed again
  const one = await book(baseOn, dbOn, {}, 1);
  const o1 = (await call(baseOn, `/api/bookings/${one.ref}/pay`, { method: 'POST' })).json;
  dbOn.prepare("UPDATE bookings SET hold_expires_at = '2000-01-01T00:00:00.000Z' WHERE reference = ?").run(one.ref);
  appOn.releaseExpired();
  assert.equal(row(dbOn, one.ref).status, 'expired');
  assert.equal((await call(baseOn, `/api/bookings/${one.ref}/pay`, { method: 'POST' })).status, 409);
  const ok = await call(baseOn, '/api/payments/verify', { method: 'POST', body: { razorpay_order_id: o1.orderId, razorpay_payment_id: 'pay_LATE1', razorpay_signature: checkoutSig(o1.orderId, 'pay_LATE1') } });
  assert.equal(ok.json.status, 'confirmed');
  // expired and departure now full -> payment stored, booking not confirmed, team told
  const two = await book(baseOn, dbOn, {}, 2);
  const o2 = (await call(baseOn, `/api/bookings/${two.ref}/pay`, { method: 'POST' })).json;
  dbOn.prepare("UPDATE bookings SET hold_expires_at = '2000-01-01T00:00:00.000Z' WHERE reference = ?").run(two.ref);
  appOn.releaseExpired();
  dbOn.prepare('UPDATE departures SET booked = capacity WHERE id = ?').run(two.d.id);
  const late = await call(baseOn, '/api/payments/verify', { method: 'POST', body: { razorpay_order_id: o2.orderId, razorpay_payment_id: 'pay_LATE2', razorpay_signature: checkoutSig(o2.orderId, 'pay_LATE2') } });
  assert.equal(late.status, 200);
  assert.equal(late.json.needsReview, true);
  assert.equal(row(dbOn, two.ref).status, 'expired');
  assert.equal(row(dbOn, two.ref).razorpay_payment_id, 'pay_LATE2');
});

test('provider failure gives a clear error and leaves the booking payable', async () => {
  const { ref } = await book(baseOn, dbOn);
  const orig = orderCalls.push.bind(orderCalls);
  const failing = createApp(dbOn, { sessionSecret: SECRET, production: false, limits: { write: { max: 1000, windowMs: 1000 }, pay: { max: 1000, windowMs: 1000 } },
    razorpay: { keyId: KEY_ID, keySecret: KEY_SECRET, client: { async createOrder() { throw Object.assign(new Error('Payment provider refused the order.'), { status: 502 }); } } } });
  const s = await listen(failing);
  try {
    const r = await call(`http://127.0.0.1:${s.address().port}`, `/api/bookings/${ref}/pay`, { method: 'POST' });
    assert.equal(r.status, 502);
    assert.match(r.json.error, /refused/i);
    assert.equal(row(dbOn, ref).razorpay_order_id, null);
  } finally { s.close(); orderCalls.push = orig; }
});

test('admin page is served with a strict CSP and no inline script', async () => {
  const res = await fetch(baseOn + '/admin/');
  assert.equal(res.status, 200);
  assert.match(res.headers.get('content-security-policy'), /script-src 'self'/);
  const html = await res.text();
  assert.ok(!/<script(?![^>]*\bsrc=)[^>]*>/i.test(html), 'no inline <script>');
  assert.ok(!/\sstyle=|\son[a-z]+=/i.test(html), 'no inline style or handlers');
  for (const f of ['admin.js', 'admin.css']) assert.equal((await fetch(`${baseOn}/admin/${f}`)).status, 200);
  const js = fs.readFileSync(path.join(__dirname, '..', 'admin', 'admin.js'), 'utf8');
  assert.ok(!/innerHTML|outerHTML|insertAdjacentHTML|document\.write/.test(js), 'admin.js never writes HTML strings');
});
