'use strict';
const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const { openDatabase } = require('../src/db');
const { createApp } = require('../src/app');
const { seed } = require('../src/seed');
const { hashPassword } = require('../src/auth');
const { quote } = require('../src/pricing');

let server, base, db, app;
const SECRET = 'x'.repeat(48);

async function call(path, { method = 'GET', body, cookie, csrf, raw } = {}) {
  const headers = {};
  if (body !== undefined) headers['content-type'] = 'application/json';
  if (cookie) headers.cookie = cookie;
  if (csrf) headers['x-csrf-token'] = csrf;
  const res = await fetch(base + path, { method, headers, body: raw ?? (body === undefined ? undefined : JSON.stringify(body)) });
  let json = null;
  try { json = await res.json(); } catch { /* none */ }
  return { status: res.status, json, headers: res.headers };
}

async function login() {
  const r = await call('/api/admin/login', { method: 'POST', body: { email: 'owner@example.com', password: 'correct horse battery' } });
  assert.equal(r.status, 200);
  const cookie = r.headers.get('set-cookie').split(';')[0];
  return { cookie, csrf: r.json.csrfToken };
}

before(async () => {
  db = openDatabase(':memory:');
  seed(db);
  db.prepare('INSERT INTO admins (email, password_hash) VALUES (?, ?)').run('owner@example.com', hashPassword('correct horse battery'));
  app = createApp(db, { sessionSecret: SECRET, production: false, limits: { login: { max: 50, windowMs: 1000 }, write: { max: 1000, windowMs: 1000 } } });
  await new Promise((resolve) => { server = app.listen(0, resolve); });
  base = `http://127.0.0.1:${server.address().port}`;
});
after(() => { server.close(); });

const firstDeparture = (tripId) => db.prepare("SELECT * FROM departures WHERE trip_id = ? ORDER BY start_date LIMIT 1").get(tripId);
const goodBooking = (dep, extra = {}) => ({ departureId: dep.id, package: 'standard', travellers: 2, name: 'Test Traveller', phone: '+91 98765 43210', ...extra });

test('pricing: group discount applies from 8 travellers, in paise', () => {
  assert.equal(quote({ unitPaise: 599900, travellers: 8 }).totalPaise, 4559240);
  assert.equal(quote({ unitPaise: 599900, travellers: 7 }).groupDiscountPaise, 0);
  assert.throws(() => quote({ unitPaise: 599900, travellers: 31 }));
});

test('health and trips list with seats left', async () => {
  assert.equal((await call('/api/health')).json.ok, true);
  const r = await call('/api/trips');
  assert.equal(r.status, 200);
  assert.equal(r.json.trips.length, 3);
  assert.ok(r.json.trips[0].departures.length >= 1);
  assert.ok(r.json.trips[0].departures[0].seatsLeft > 0);
  assert.match(r.headers.get('cache-control'), /no-store/);
});

test('booking holds seats and prices on the server', async () => {
  const dep = firstDeparture('shangarh');
  const r = await call('/api/bookings', { method: 'POST', body: goodBooking(dep, { travellers: 8 }) });
  assert.equal(r.status, 201);
  assert.match(r.json.reference, /^TT-[A-Z2-9]{8}$/);
  assert.equal(r.json.quote.totalPaise, 4559240);
  assert.equal(db.prepare('SELECT booked FROM departures WHERE id = ?').get(dep.id).booked, 8);
});

test('client-supplied price is ignored', async () => {
  const dep = firstDeparture('jibhi');
  const r = await call('/api/bookings', { method: 'POST', body: goodBooking(dep, { totalPaise: 1, unitPaise: 1 }) });
  assert.equal(r.status, 201);
  assert.equal(r.json.quote.totalPaise, 699900 * 2);
});

test('overbooking is refused and never oversells, even under parallel requests', async () => {
  const dep = firstDeparture('kashmir'); // capacity 16
  const results = await Promise.all(Array.from({ length: 12 }, (_, i) => call('/api/bookings', { method: 'POST', body: goodBooking(dep, { travellers: 3, name: `Guest ${i}` }) })));
  const ok = results.filter((r) => r.status === 201).length;
  assert.equal(ok, 5); // 5 x 3 = 15 seats; the 6th needs 3 but only 1 is left
  assert.ok(results.filter((r) => r.status !== 201).every((r) => r.status === 409));
  const row = db.prepare('SELECT booked, capacity FROM departures WHERE id = ?').get(dep.id);
  assert.equal(row.booked, 15);
  assert.ok(row.booked <= row.capacity);
  const one = await call('/api/bookings', { method: 'POST', body: goodBooking(dep, { travellers: 1 }) });
  assert.equal(one.status, 201);
  const full = await call('/api/bookings', { method: 'POST', body: goodBooking(dep, { travellers: 1 }) });
  assert.equal(full.status, 409);
  assert.match(full.json.error, /full/);
});

test('booking validation', async () => {
  const dep = firstDeparture('shangarh');
  for (const bad of [
    { travellers: 0 }, { travellers: 31 }, { travellers: 'two' }, { package: 'gold' }, { name: '' }, { phone: 'abc' },
    { email: 'nope' }, { departureId: 999999 }, { departureId: 'x' },
  ]) {
    const r = await call('/api/bookings', { method: 'POST', body: goodBooking(dep, bad) });
    assert.ok([400, 409].includes(r.status), JSON.stringify(bad));
  }
  assert.equal((await call('/api/bookings', { method: 'POST', raw: '{bad json', body: {} })).status, 400);
});

test('expired holds release their seats', async () => {
  const dep = firstDeparture('shangarh');
  const before = db.prepare('SELECT booked FROM departures WHERE id = ?').get(dep.id).booked;
  const r = await call('/api/bookings', { method: 'POST', body: goodBooking(dep, { travellers: 2 }) });
  assert.equal(r.status, 201);
  db.prepare("UPDATE bookings SET hold_expires_at = '2000-01-01T00:00:00.000Z' WHERE reference = ?").run(r.json.reference);
  assert.equal(app.releaseExpired(), 1);
  assert.equal(db.prepare('SELECT booked FROM departures WHERE id = ?').get(dep.id).booked, before);
  assert.equal(db.prepare('SELECT status FROM bookings WHERE reference = ?').get(r.json.reference).status, 'expired');
});

test('admin routes need login, wrong password is refused, CSRF is enforced', async () => {
  assert.equal((await call('/api/admin/summary')).status, 401);
  assert.equal((await call('/api/admin/login', { method: 'POST', body: { email: 'owner@example.com', password: 'wrong' } })).status, 401);
  assert.equal((await call('/api/admin/login', { method: 'POST', body: { email: 'nobody@example.com', password: 'x' } })).status, 401);
  const { cookie, csrf } = await login();
  assert.equal((await call('/api/admin/summary', { cookie })).status, 200);
  const noCsrf = await call('/api/admin/departures', { method: 'POST', cookie, body: { tripId: 'shangarh', startDate: '2099-01-01', capacity: 10 } });
  assert.equal(noCsrf.status, 403);
  const forged = await call('/api/admin/departures', { method: 'POST', cookie, csrf: 'forged', body: { tripId: 'shangarh', startDate: '2099-01-01', capacity: 10 } });
  assert.equal(forged.status, 403);
  const ok = await call('/api/admin/departures', { method: 'POST', cookie, csrf, body: { tripId: 'shangarh', startDate: '2099-01-01', capacity: 10 } });
  assert.equal(ok.status, 201);
  const dup = await call('/api/admin/departures', { method: 'POST', cookie, csrf, body: { tripId: 'shangarh', startDate: '2099-01-01', capacity: 10 } });
  assert.equal(dup.status, 409);
  assert.equal((await call('/api/admin/departures', { method: 'POST', cookie, csrf, body: { tripId: 'shangarh', startDate: '2001-01-01', capacity: 10 } })).status, 400);
  assert.equal((await call('/api/admin/departures', { method: 'POST', cookie, csrf, body: { tripId: 'shangarh', startDate: '2099-02-30', capacity: 10 } })).status, 400);
});

test('tampered session cookie is rejected', async () => {
  const { cookie } = await login();
  const tampered = cookie.slice(0, -3) + 'abc';
  assert.equal((await call('/api/admin/summary', { cookie: tampered })).status, 401);
});

test('admin confirm / cancel bookings and capacity guard', async () => {
  const { cookie, csrf } = await login();
  const dep = firstDeparture('jibhi');
  const r = await call('/api/bookings', { method: 'POST', body: goodBooking(dep, { travellers: 3 }) });
  const booking = db.prepare('SELECT id FROM bookings WHERE reference = ?').get(r.json.reference);
  const booked1 = db.prepare('SELECT booked FROM departures WHERE id = ?').get(dep.id).booked;
  assert.equal((await call(`/api/admin/bookings/${booking.id}`, { method: 'PATCH', cookie, csrf, body: { status: 'confirmed' } })).status, 200);
  assert.equal(db.prepare('SELECT booked FROM departures WHERE id = ?').get(dep.id).booked, booked1);
  assert.equal((await call(`/api/admin/bookings/${booking.id}`, { method: 'PATCH', cookie, csrf, body: { status: 'cancelled' } })).status, 200);
  assert.equal(db.prepare('SELECT booked FROM departures WHERE id = ?').get(dep.id).booked, booked1 - 3);
  assert.equal((await call(`/api/admin/bookings/${booking.id}`, { method: 'PATCH', cookie, csrf, body: { status: 'confirmed' } })).status, 409);
  const tooLow = await call(`/api/admin/departures/${dep.id}`, { method: 'PATCH', cookie, csrf, body: { capacity: 1 } });
  assert.equal(tooLow.status, 409);
});

test('reviews stay hidden until approved; text is stored raw and returned as data', async () => {
  const sub = await call('/api/reviews', { method: 'POST', body: { tripId: 'shangarh', name: 'Asha', rating: 5, title: 'Lovely trip', body: 'Wonderful <b>views</b> and kind hosts.' } });
  assert.equal(sub.status, 201);
  assert.equal((await call('/api/reviews')).json.reviews.length, 0);
  const { cookie, csrf } = await login();
  const pending = await call('/api/admin/reviews?status=pending', { cookie });
  assert.equal(pending.json.reviews.length, 1);
  assert.equal((await call(`/api/admin/reviews/${pending.json.reviews[0].id}`, { method: 'PATCH', cookie, csrf, body: { status: 'approved' } })).status, 200);
  const pub = await call('/api/reviews?trip=shangarh');
  assert.equal(pub.json.reviews.length, 1);
  assert.equal(pub.json.reviews[0].body, 'Wonderful <b>views</b> and kind hosts.');
  assert.equal((await call('/api/reviews', { method: 'POST', body: { tripId: 'nope', name: 'A', rating: 5, title: 'x', body: 'y' } })).status, 400);
  assert.equal((await call('/api/reviews', { method: 'POST', body: { tripId: 'shangarh', name: 'Asha', rating: 9, title: 'Lovely trip', body: 'Wonderful views here.' } })).status, 400);
});

test('enquiries are stored and visible to admin only', async () => {
  const r = await call('/api/enquiries', { method: 'POST', body: { name: 'Ravi', contact: 'ravi@example.com', message: 'Dates in March for 6 people?', tripId: 'kashmir' } });
  assert.equal(r.status, 201);
  assert.equal((await call('/api/admin/enquiries')).status, 401);
  const { cookie } = await login();
  assert.equal((await call('/api/admin/enquiries', { cookie })).json.enquiries.length, 1);
});

test('rate limiting returns 429 on repeated failed logins', async () => {
  const db2 = openDatabase(':memory:');
  const app2 = createApp(db2, { sessionSecret: SECRET, production: false, limits: { login: { max: 3, windowMs: 60000 } } });
  const s2 = await new Promise((resolve) => { const s = app2.listen(0, () => resolve(s)); });
  const url = `http://127.0.0.1:${s2.address().port}/api/admin/login`;
  const codes = [];
  for (let i = 0; i < 5; i += 1) codes.push((await fetch(url, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ email: 'a@b.co', password: 'x' }) })).status);
  s2.close();
  assert.deepEqual(codes, [401, 401, 401, 429, 429]);
});

test('server refuses a short session secret; unknown API paths 404 as JSON', async () => {
  assert.throws(() => createApp(db, { sessionSecret: 'short' }));
  const r = await call('/api/nope');
  assert.equal(r.status, 404);
  assert.ok(r.json.error);
});
