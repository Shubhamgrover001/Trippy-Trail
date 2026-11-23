'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { openDatabase } = require('../src/db');
const { createApp } = require('../src/app');
const { hashPassword } = require('../src/auth');

test('logout really ends the session: the old cookie stops working server-side', async () => {
  const db = openDatabase(':memory:');
  db.prepare('INSERT INTO admins (email, password_hash) VALUES (?, ?)').run('o@x.com', hashPassword('correct horse battery'));
  const app = createApp(db, { sessionSecret: 'k'.repeat(48), production: false, limits: { login: { max: 50, windowMs: 1000 }, write: { max: 50, windowMs: 1000 } } });
  const srv = await new Promise((r) => { const s = app.listen(0, () => r(s)); });
  const base = `http://127.0.0.1:${srv.address().port}`;
  try {
    const login = await fetch(base + '/api/admin/login', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ email: 'o@x.com', password: 'correct horse battery' }) });
    const cookie = login.headers.get('set-cookie').split(';')[0];
    const { csrfToken } = await login.json();
    assert.equal((await fetch(base + '/api/admin/me', { headers: { cookie } })).status, 200);
    assert.equal((await fetch(base + '/api/admin/logout', { method: 'POST', headers: { cookie, 'x-csrf-token': csrfToken } })).status, 200);
    assert.equal((await fetch(base + '/api/admin/me', { headers: { cookie } })).status, 401, 'copied cookie must be dead after logout');
    const again = await fetch(base + '/api/admin/login', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ email: 'o@x.com', password: 'correct horse battery' }) });
    assert.equal((await fetch(base + '/api/admin/me', { headers: { cookie: again.headers.get('set-cookie').split(';')[0] } })).status, 200, 'a fresh login still works');
  } finally { srv.close(); }
});
