'use strict';
const { DatabaseSync } = require('node:sqlite');
const fs = require('node:fs');
const path = require('node:path');

const SCHEMA = `
PRAGMA foreign_keys = ON;
CREATE TABLE IF NOT EXISTS trips (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  duration TEXT NOT NULL,
  standard_paise INTEGER NOT NULL CHECK (standard_paise > 0),
  comfort_paise INTEGER NOT NULL CHECK (comfort_paise > 0),
  active INTEGER NOT NULL DEFAULT 1 CHECK (active IN (0,1))
);
CREATE TABLE IF NOT EXISTS departures (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  trip_id TEXT NOT NULL REFERENCES trips(id),
  start_date TEXT NOT NULL CHECK (start_date GLOB '[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]'),
  capacity INTEGER NOT NULL CHECK (capacity > 0),
  booked INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open','closed','cancelled')),
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
  UNIQUE (trip_id, start_date),
  CHECK (booked >= 0 AND booked <= capacity)
);
CREATE INDEX IF NOT EXISTS idx_departures_trip_date ON departures(trip_id, start_date);
CREATE TABLE IF NOT EXISTS bookings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  reference TEXT NOT NULL UNIQUE,
  departure_id INTEGER NOT NULL REFERENCES departures(id),
  package TEXT NOT NULL CHECK (package IN ('standard','comfort')),
  travellers INTEGER NOT NULL CHECK (travellers BETWEEN 1 AND 30),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  offer_code TEXT,
  subtotal_paise INTEGER NOT NULL,
  group_discount_paise INTEGER NOT NULL,
  offer_discount_paise INTEGER NOT NULL,
  total_paise INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','confirmed','cancelled','expired')),
  hold_expires_at TEXT,
  razorpay_order_id TEXT,
  razorpay_payment_id TEXT,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
);
CREATE INDEX IF NOT EXISTS idx_bookings_departure ON bookings(departure_id, status);
CREATE INDEX IF NOT EXISTS idx_bookings_status_hold ON bookings(status, hold_expires_at);
CREATE TABLE IF NOT EXISTS reviews (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  trip_id TEXT NOT NULL REFERENCES trips(id),
  name TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','approved','rejected')),
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
);
CREATE INDEX IF NOT EXISTS idx_reviews_status ON reviews(status, trip_id);
CREATE TABLE IF NOT EXISTS enquiries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  trip_id TEXT REFERENCES trips(id),
  name TEXT NOT NULL,
  contact TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new','handled')),
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
);
CREATE TABLE IF NOT EXISTS admins (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
);
`;

function openDatabase(file) {
  if (file !== ':memory:') fs.mkdirSync(path.dirname(path.resolve(file)), { recursive: true });
  const db = new DatabaseSync(file);
  db.exec('PRAGMA journal_mode = WAL; PRAGMA busy_timeout = 5000;');
  db.exec(SCHEMA);
  // Older databases: link a review to the booking it came from (set only after the booking is checked).
  if (!db.prepare('PRAGMA table_info(reviews)').all().some((c) => c.name === 'booking_id')) db.exec('ALTER TABLE reviews ADD COLUMN booking_id INTEGER REFERENCES bookings(id)');
  db.exec('CREATE UNIQUE INDEX IF NOT EXISTS idx_reviews_booking ON reviews(booking_id) WHERE booking_id IS NOT NULL');
  return db;
}

/** Run fn inside an immediate transaction (takes the write lock up front, so capacity checks cannot race). */
function transaction(db, fn) {
  db.exec('BEGIN IMMEDIATE');
  try {
    const result = fn();
    db.exec('COMMIT');
    return result;
  } catch (error) {
    db.exec('ROLLBACK');
    throw error;
  }
}

module.exports = { openDatabase, transaction };
