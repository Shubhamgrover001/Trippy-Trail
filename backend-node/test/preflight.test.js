'use strict';
const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { check } = require('../src/preflight');

function site(files) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'pf-'));
  for (const [name, text] of Object.entries(files)) { fs.mkdirSync(path.dirname(path.join(dir, name)), { recursive: true }); fs.writeFileSync(path.join(dir, name), text); }
  return dir;
}
const levels = (r, text) => r.filter((x) => x.label.includes(text)).map((x) => x.level);
const GOOD = { NODE_ENV: 'production', SESSION_SECRET: 'x'.repeat(40), TRUST_PROXY: '1', RAZORPAY_KEY_ID: 'rzp_live_abc', RAZORPAY_KEY_SECRET: 's', RAZORPAY_WEBHOOK_SECRET: 'w' };

test('a fully ready setup has no FAIL or WARN', () => {
  const siteDir = site({
    'index.html': '<link rel="canonical" href="https://x.in/">',
    'assets/js/config.js': 'window.TRIPPY_BUSINESS = { gstNumber: "G", tourismRegistration: "T" };\nwindow.TRIPPY_API = { enabled: true, base: "" };',
    'robots.txt': 'Sitemap: https://x.in/sitemap.xml', 'sitemap.xml': '<loc>https://x.in/</loc>',
  });
  const r = check(GOOD, { siteDir, dbInfo: { admins: 1, futureOpen: 3, sampleDates: false } });
  assert.deepEqual(r.filter((x) => x.level !== 'PASS'), []);
});

test('an empty setup fails on the things that would break launch', () => {
  const siteDir = site({ 'index.html': '', 'robots.txt': 'Sitemap: https://YOUR-DOMAIN/sitemap.xml' });
  const r = check({}, { siteDir, dbInfo: { admins: 0, futureOpen: 0, sampleDates: false } });
  for (const t of ['NODE_ENV', 'SESSION_SECRET', 'robots.txt', 'No admin', 'No open upcoming']) assert.ok(levels(r, t).includes('FAIL'), t);
  assert.ok(levels(r, 'Razorpay').includes('WARN'));
});

test('test keys warn, unknown keys fail, missing site fails', () => {
  const siteDir = site({ 'index.html': '' });
  assert.ok(levels(check({ ...GOOD, RAZORPAY_KEY_ID: 'rzp_test_1' }, { siteDir, dbInfo: null }), 'TEST mode').includes('WARN'));
  assert.ok(levels(check({ ...GOOD, RAZORPAY_KEY_ID: 'bogus' }, { siteDir, dbInfo: null }), 'not a recognised').includes('FAIL'));
  assert.ok(levels(check(GOOD, { siteDir: '/nonexistent-dir-x', dbInfo: null }), 'no index.html').includes('FAIL'));
});

test('seeded sample departures are flagged', () => {
  const siteDir = site({ 'index.html': '' });
  const r = check(GOOD, { siteDir, dbInfo: { admins: 1, futureOpen: 2, sampleDates: true } });
  assert.ok(levels(r, 'seeded samples').includes('WARN'));
});
