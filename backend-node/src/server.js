'use strict';
const path = require('node:path');
const fs = require('node:fs');
const { openDatabase } = require('./db');
const { createApp } = require('./app');

// Minimal .env loader (no extra dependency). Real environment variables win.
const envFile = path.join(__dirname, '..', '.env');
if (fs.existsSync(envFile)) {
  for (const line of fs.readFileSync(envFile, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && process.env[m[1]] === undefined) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
}

const root = path.join(__dirname, '..');
const db = openDatabase(path.resolve(root, process.env.DATABASE_PATH || './data/trippy-trail.db'));
const production = process.env.NODE_ENV === 'production';
const app = createApp(db, {
  sessionSecret: process.env.SESSION_SECRET || '',
  production,
  trustProxy: process.env.TRUST_PROXY === '1',
  siteDir: path.resolve(root, process.env.SITE_DIR || './public'),
  razorpay: {
    keyId: process.env.RAZORPAY_KEY_ID || '',
    keySecret: process.env.RAZORPAY_KEY_SECRET || '',
    webhookSecret: process.env.RAZORPAY_WEBHOOK_SECRET || '',
  },
});
if (production && /^rzp_test_/.test(process.env.RAZORPAY_KEY_ID || '')) console.warn('[payments] Razorpay TEST keys are active in production.');

setInterval(() => { try { app.releaseExpired(); } catch (e) { console.error('[hold-release]', e); } }, 60 * 1000).unref();

const port = Number(process.env.PORT || 3000);
app.listen(port, () => console.log(`Trippy Trail API listening on http://localhost:${port}`));
