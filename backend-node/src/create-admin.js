'use strict';
// Usage: ADMIN_EMAIL=you@example.com ADMIN_PASSWORD='long passphrase' npm run create-admin
const path = require('node:path');
const fs = require('node:fs');
const { openDatabase } = require('./db');
const { hashPassword } = require('./auth');
const envFile = path.join(__dirname, '..', '.env');
if (fs.existsSync(envFile)) for (const line of fs.readFileSync(envFile, 'utf8').split(/\r?\n/)) {
  const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
  if (m && process.env[m[1]] === undefined) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
}
const email = (process.env.ADMIN_EMAIL || '').trim().toLowerCase();
const password = process.env.ADMIN_PASSWORD || '';
if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { console.error('Set ADMIN_EMAIL to a valid email.'); process.exit(1); }
if (password.length < 12) { console.error('ADMIN_PASSWORD must be at least 12 characters.'); process.exit(1); }
const db = openDatabase(path.resolve(__dirname, '..', process.env.DATABASE_PATH || './data/trippy-trail.db'));
const hash = hashPassword(password);
const existing = db.prepare('SELECT id FROM admins WHERE email = ?').get(email);
if (existing) { db.prepare('UPDATE admins SET password_hash = ? WHERE id = ?').run(hash, existing.id); console.log('Admin password updated for', email); }
else { db.prepare('INSERT INTO admins (email, password_hash) VALUES (?, ?)').run(email, hash); console.log('Admin created:', email); }
