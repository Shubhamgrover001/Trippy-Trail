'use strict';
// Loads the three demo trips and a few DEMO departures so the system can be tried. Safe to re-run.
const path = require('node:path');
const { openDatabase } = require('./db');

const TRIPS = [
  ['shangarh', 'Shangarh', '3 days · 2 nights', 599900, 849900],
  ['jibhi', 'Jibhi & Shoja', '4 days · 3 nights', 699900, 999900],
  ['kashmir', 'Kashmir', '6 days · 5 nights', 1899900, 2699900],
];

function seed(db, { withDepartures = true } = {}) {
  const up = db.prepare(`INSERT INTO trips (id, title, duration, standard_paise, comfort_paise) VALUES (?,?,?,?,?)
    ON CONFLICT(id) DO NOTHING`);
  for (const t of TRIPS) up.run(...t);
  if (!withDepartures) return;
  const ins = db.prepare('INSERT OR IGNORE INTO departures (trip_id, start_date, capacity) VALUES (?,?,?)');
  const base = new Date();
  [['shangarh', 21, 12], ['shangarh', 49, 12], ['jibhi', 35, 14], ['jibhi', 63, 14], ['kashmir', 56, 16], ['kashmir', 91, 16]].forEach(([trip, days, cap]) => {
    const d = new Date(base.getTime() + days * 86400000);
    ins.run(trip, d.toISOString().slice(0, 10), cap);
  });
}

module.exports = { seed, TRIPS };

if (require.main === module) {
  const db = openDatabase(path.resolve(__dirname, '..', process.env.DATABASE_PATH || './data/trippy-trail.db'));
  seed(db);
  console.log('Seeded demo trips and demo departures. Replace the demo departures with real ones in the admin dashboard.');
}
