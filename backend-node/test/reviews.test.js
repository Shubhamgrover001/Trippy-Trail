'use strict';
const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const { openDatabase } = require('../src/db');
const { createApp } = require('../src/app');
const { seed } = require('../src/seed');

let db, srv, base;
const big = { max: 1000, windowMs: 1000 };
before(async () => {
  db = openDatabase(':memory:'); seed(db);
  const app = createApp(db, { sessionSecret: 'r'.repeat(48), production: false, limits: { login: big, write: big, read: big, pay: big } });
  srv = await new Promise((r) => { const s = app.listen(0, () => r(s)); }); base = `http://127.0.0.1:${srv.address().port}`;
});
after(() => srv.close());
const post = async (p, body) => { const r = await fetch(base + p, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) }); return { s: r.status, j: await r.json().catch(() => ({})) }; };

async function booking(tripId = 'shangarh', phone = '+91 98765 43210') {
  const dep = db.prepare('SELECT id FROM departures WHERE trip_id = ? ORDER BY id LIMIT 1').get(tripId);
  const r = await post('/api/bookings', { departureId: dep.id, package: 'standard', travellers: 2, name: 'Rev Tester', phone });
  assert.equal(r.s, 201);
  return { ref: r.j.reference, depId: dep.id };
}
const review = (extra = {}) => ({ tripId: 'shangarh', name: 'Asha', rating: 5, title: 'Lovely trip', body: 'Great views and kind hosts all along.', ...extra });
const pastAndConfirm = (ref, depId) => { db.prepare("UPDATE bookings SET status = 'confirmed', hold_expires_at = NULL WHERE reference = ?").run(ref); db.prepare("UPDATE departures SET start_date = '2020-01-01' WHERE id = ?").run(depId); };

test('verified review: needs confirmed booking, same trip, matching phone, trip already taken, one per booking', async () => {
  const { ref, depId } = await booking();
  const body = (o = {}) => review({ bookingReference: ref, phone: '98765 43210', ...o });
  assert.equal((await post('/api/reviews', body())).s, 400, 'pending booking cannot review');
  db.prepare("UPDATE bookings SET status = 'confirmed' WHERE reference = ?").run(ref);
  const early = await post('/api/reviews', body());
  assert.equal(early.s, 400); assert.match(early.j.error, /taken place/i);
  pastAndConfirm(ref, depId);
  assert.equal((await post('/api/reviews', body({ phone: '90000 00000' }))).s, 400, 'wrong phone refused');
  assert.equal((await post('/api/reviews', body({ tripId: 'jibhi' }))).s, 400, 'other trip refused');
  assert.equal((await post('/api/reviews', body({ bookingReference: 'TT-NOPE0000' }))).s, 400, 'unknown reference refused');
  const wrong = await post('/api/reviews', body({ phone: '90000 00000' }));
  const unknown = await post('/api/reviews', body({ bookingReference: 'TT-NOPE0000' }));
  assert.equal(wrong.j.error, unknown.j.error, 'same message either way: nothing leaks about which bookings exist');
  const good = await post('/api/reviews', body({ bookingReference: ref.toLowerCase() }));
  assert.equal(good.s, 201); assert.equal(good.j.verified, true);
  const again = await post('/api/reviews', body());
  assert.equal(again.s, 400); assert.match(again.j.error, /already/i);
});

test('verified flag is public only after approval; unlinked reviews are never "verified"', async () => {
  const plain = await post('/api/reviews', review({ title: 'No booking link' }));
  assert.equal(plain.s, 201); assert.equal(plain.j.verified, false);
  assert.equal((await (await fetch(base + '/api/reviews')).json()).reviews.length, 0, 'nothing public before approval');
  db.prepare("UPDATE reviews SET status = 'approved'").run();
  const list = (await (await fetch(base + '/api/reviews')).json()).reviews;
  assert.equal(list.length, 2);
  assert.equal(list.find((r) => r.title === 'Lovely trip').verified, true);
  assert.equal(list.find((r) => r.title === 'No booking link').verified, false);
  assert.ok(!JSON.stringify(list).match(/Rev Tester|98765|TT-/), 'no phone, booking name or reference exposed');
});

test('older databases get the booking_id column on open', () => {
  const cols = db.prepare('PRAGMA table_info(reviews)').all().map((c) => c.name);
  assert.ok(cols.includes('booking_id'));
});
