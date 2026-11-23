'use strict';
// Launch checklist for the server. Usage: npm run preflight   (exit code 1 if anything is FAIL)
const path = require('node:path');
const fs = require('node:fs');

/** Pure checks. Returns [{ level: 'PASS'|'WARN'|'FAIL', label, hint? }]. */
function check(env, { siteDir, dbInfo, today = new Date().toISOString().slice(0, 10) }) {
  const out = [];
  const add = (level, label, hint) => out.push({ level, label, hint });
  const read = (file) => { try { return fs.readFileSync(path.join(siteDir, file), 'utf8'); } catch { return null; } };

  (env.NODE_ENV === 'production' ? add.bind(null, 'PASS', 'NODE_ENV=production') : add.bind(null, 'FAIL', 'NODE_ENV is not "production"', 'Set NODE_ENV=production on the host.'))();
  (String(env.SESSION_SECRET || '').length >= 32 ? add.bind(null, 'PASS', 'SESSION_SECRET is set (32+ characters)') : add.bind(null, 'FAIL', 'SESSION_SECRET missing or shorter than 32 characters', 'Generate one: node -e "console.log(require(\'crypto\').randomBytes(48).toString(\'hex\'))"'))();
  (env.TRUST_PROXY === '1' ? add.bind(null, 'PASS', 'TRUST_PROXY=1') : add.bind(null, 'WARN', 'TRUST_PROXY is not 1', 'Set TRUST_PROXY=1 if the host puts a proxy in front (almost all do), or rate limiting sees one shared address.'))();

  const keyId = env.RAZORPAY_KEY_ID || '';
  if (!keyId || !env.RAZORPAY_KEY_SECRET) add('WARN', 'Razorpay keys not set: online payment is off', 'Add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET.');
  else if (/^rzp_test_/.test(keyId)) add('WARN', 'Razorpay is in TEST mode', 'Swap to rzp_live_ keys at launch.');
  else if (/^rzp_live_/.test(keyId)) add('PASS', 'Razorpay LIVE keys set');
  else add('FAIL', 'RAZORPAY_KEY_ID is not a recognised key', 'It should start with rzp_test_ or rzp_live_.');
  if (keyId && !env.RAZORPAY_WEBHOOK_SECRET) add('WARN', 'RAZORPAY_WEBHOOK_SECRET not set', 'Payments still verify at checkout, but the webhook safety net for closed browsers is off.');

  if (!fs.existsSync(path.join(siteDir, 'index.html'))) add('FAIL', `SITE_DIR has no index.html (${siteDir})`, 'Copy the website/ folder contents into SITE_DIR.');
  else add('PASS', 'Website files found in SITE_DIR');

  const config = read('assets/js/config.js') || '';
  if (/TRIPPY_API\s*=\s*\{\s*enabled:\s*true/.test(config)) add('PASS', 'Live booking is switched on in config.js');
  else add('WARN', 'Live booking is OFF in config.js (site runs as a demo)', 'Set window.TRIPPY_API = { enabled: true, base: "" } when ready.');
  if (/gstNumber:\s*""/.test(config)) add('WARN', 'GST number not set in config.js');
  if (/tourismRegistration:\s*""/.test(config)) add('WARN', 'Tourism registration not set in config.js');

  for (const file of ['robots.txt', 'sitemap.xml']) {
    const text = read(file);
    if (text && text.includes('YOUR-DOMAIN')) add('FAIL', `${file} still has YOUR-DOMAIN`, 'Replace it with the real domain.');
  }
  const html = (read('index.html') || '').replace(/<!--[\s\S]*?-->/g, '');
  if (!/rel="canonical"/.test(html)) add('WARN', 'No canonical link in index.html', 'Add it once the domain is known (search LAUNCH TODO).');

  if (!dbInfo) add('WARN', 'Database file not created yet', 'It is created on first start. Then run npm run create-admin.');
  else {
    (dbInfo.admins > 0 ? add.bind(null, 'PASS', 'An admin account exists') : add.bind(null, 'FAIL', 'No admin account', 'Run: npm run create-admin'))();
    (dbInfo.futureOpen > 0 ? add.bind(null, 'PASS', `${dbInfo.futureOpen} open upcoming departure(s)`) : add.bind(null, 'FAIL', 'No open upcoming departures', 'Add real departure dates in the admin Departures tab.'))();
    if (dbInfo.futureOpen > 0 && dbInfo.sampleDates) add('WARN', 'Upcoming departures look like seeded samples', 'Replace them with real dates and seats in the admin page.');
  }
  return out;
}

function inspectDb(file, today) {
  if (!fs.existsSync(file)) return null;
  const { DatabaseSync } = require('node:sqlite');
  const db = new DatabaseSync(file, { readOnly: true });
  try {
    const admins = db.prepare('SELECT COUNT(*) n FROM admins').get().n;
    const futureOpen = db.prepare("SELECT COUNT(*) n FROM departures WHERE status = 'open' AND start_date >= ?").get(today).n;
    // Seeded sample data: every departure created in one burst, and no booking has ever been made.
    const spread = db.prepare("SELECT (julianday(MAX(created_at)) - julianday(MIN(created_at))) * 86400 AS s FROM departures").get().s;
    const sampleDates = (spread === null || spread < 5) && db.prepare('SELECT COUNT(*) n FROM bookings').get().n === 0;
    return { admins, futureOpen, sampleDates };
  } finally { db.close(); }
}

if (require.main === module) {
  const root = path.join(__dirname, '..');
  const envFile = path.join(root, '.env');
  if (fs.existsSync(envFile)) for (const line of fs.readFileSync(envFile, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && process.env[m[1]] === undefined) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
  const today = new Date().toISOString().slice(0, 10);
  const results = check(process.env, {
    siteDir: path.resolve(root, process.env.SITE_DIR || './public'),
    dbInfo: inspectDb(path.resolve(root, process.env.DATABASE_PATH || './data/trippy-trail.db'), today),
    today,
  });
  for (const r of results) console.log(`${r.level.padEnd(4)}  ${r.label}${r.hint ? `\n      → ${r.hint}` : ''}`);
  const count = (l) => results.filter((r) => r.level === l).length;
  console.log(`\n${count('PASS')} pass, ${count('WARN')} warn, ${count('FAIL')} fail`);
  process.exit(count('FAIL') ? 1 : 0);
}

module.exports = { check };
