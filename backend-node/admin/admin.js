'use strict';
// Trippy Trail admin. No inline script or style (CSP), and all data goes in as plain text nodes.
(() => {
  let csrf = '';
  const $ = (id) => document.getElementById(id);
  const inr = (paise) => '₹' + (paise / 100).toLocaleString('en-IN', { maximumFractionDigits: 2 });
  const when = (iso) => (iso ? new Date(iso).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }) : '');

  function h(tag, props, ...kids) {
    const el = document.createElement(tag);
    for (const [k, val] of Object.entries(props || {})) {
      if (k === 'class') el.className = val;
      else if (k.startsWith('on')) el.addEventListener(k.slice(2), val);
      else if (val === true) el.setAttribute(k, '');
      else if (val !== false && val != null) el.setAttribute(k, val);
    }
    for (const kid of kids.flat()) el.append(kid instanceof Node ? kid : document.createTextNode(kid ?? ''));
    return el;
  }
  const pill = (s) => h('span', { class: 'pill ' + s }, s);

  function say(text, bad) { const m = $('msg'); m.textContent = text || ''; m.className = bad ? 'error' : ''; }

  async function api(path, { method = 'GET', body } = {}) {
    const headers = {};
    if (body !== undefined) headers['content-type'] = 'application/json';
    if (method !== 'GET') headers['x-csrf-token'] = csrf;
    const res = await fetch('/api' + path, { method, headers, credentials: 'same-origin', body: body === undefined ? undefined : JSON.stringify(body) });
    const json = await res.json().catch(() => ({}));
    if (res.status === 401 && path !== '/admin/login') { showLogin(); throw new Error('Please sign in.'); }
    if (!res.ok) throw new Error(json.error || 'Request failed.');
    return json;
  }
  // Run an action, then refresh the current tab; show any error in the message line.
  async function act(fn) {
    try { say(''); await fn(); await refresh(); } catch (e) { say(e.message, true); }
  }

  // ---- tabs -------------------------------------------------------------
  const TABS = {
    Bookings: renderBookings, Departures: renderDepartures, Trips: renderTrips, Reviews: renderReviews, Enquiries: renderEnquiries,
  };
  let current = 'Bookings';
  const filters = { bookings: '', reviews: 'pending', enquiries: '' };

  function drawTabs() {
    const nav = $('tabs');
    nav.replaceChildren(...Object.keys(TABS).map((name) => h('button', {
      role: 'tab', 'aria-selected': String(name === current),
      onclick: () => { current = name; say(''); drawTabs(); refresh(); },
    }, name)));
  }

  async function refresh() {
    await Promise.all([drawSummary(), TABS[current]().then((node) => $('view').replaceChildren(node))]);
  }

  async function drawSummary() {
    const s = await api('/admin/summary');
    const items = [['Pending bookings', s.pendingBookings], ['Confirmed', s.confirmedBookings], ['Open departures', s.openDepartures], ['Reviews to approve', s.pendingReviews], ['New enquiries', s.newEnquiries]];
    $('summary').replaceChildren(...items.map(([label, n]) => h('div', { class: 'stat' }, h('b', {}, String(n)), h('span', {}, label))));
  }

  const table = (heads, rows) => rows.length
    ? h('table', {}, h('thead', {}, h('tr', {}, heads.map((x) => h('th', {}, x)))), h('tbody', {}, rows))
    : h('p', { class: 'empty' }, 'Nothing here yet.');
  const select = (opts, value, onchange, label) => h('label', {}, label, h('select', { onchange: (e) => onchange(e.target.value) },
    opts.map(([v, t]) => h('option', { value: v, selected: v === value }, t))));

  // ---- bookings ---------------------------------------------------------
  async function renderBookings() {
    const q = filters.bookings ? '?status=' + filters.bookings : '';
    const { bookings } = await api('/admin/bookings' + q);
    const rows = bookings.map((b) => h('tr', {},
      h('td', {}, b.reference, h('br'), h('span', { class: 'muted' }, when(b.createdAt))),
      h('td', {}, b.tripTitle, h('br'), h('span', { class: 'muted' }, b.startDate + ' · ' + b.package)),
      h('td', {}, b.name, h('br'), h('span', { class: 'muted' }, b.phone + (b.email ? ' · ' + b.email : ''))),
      h('td', {}, String(b.travellers)),
      h('td', {}, inr(b.totalPaise), b.groupDiscountPaise ? h('br') : '', b.groupDiscountPaise ? h('span', { class: 'muted' }, 'group saving ' + inr(b.groupDiscountPaise)) : ''),
      h('td', {}, pill(b.status), b.status === 'pending' && b.holdExpiresAt ? h('br') : '', b.status === 'pending' && b.holdExpiresAt ? h('span', { class: 'muted' }, 'hold ends ' + when(b.holdExpiresAt)) : ''),
      h('td', { class: 'wrap' }, b.paymentId || ''),
      h('td', { class: 'actions' },
        b.status === 'pending' ? h('button', { class: 'small', onclick: () => act(() => api('/admin/bookings/' + b.id, { method: 'PATCH', body: { status: 'confirmed' } })) }, 'Confirm') : '',
        b.status === 'pending' || b.status === 'confirmed' ? h('button', { class: 'small bad', onclick: () => { if (confirm('Cancel booking ' + b.reference + '? Seats go back to the departure.')) act(() => api('/admin/bookings/' + b.id, { method: 'PATCH', body: { status: 'cancelled' } })); } }, 'Cancel') : '')));
    return h('div', {},
      h('div', { class: 'toolbar' }, select([['', 'All'], ['pending', 'Pending'], ['confirmed', 'Confirmed'], ['cancelled', 'Cancelled'], ['expired', 'Expired']], filters.bookings, (v) => { filters.bookings = v; refresh(); }, 'Status')),
      table(['Ref', 'Trip', 'Traveller', 'People', 'Total', 'Status', 'Payment id', ''], rows));
  }

  // ---- departures -------------------------------------------------------
  async function renderDepartures() {
    const [{ departures }, { trips }] = await Promise.all([api('/admin/departures'), api('/admin/trips')]);
    const form = h('form', { class: 'toolbar', onsubmit: (e) => {
      e.preventDefault();
      const f = new FormData(e.target);
      act(async () => { await api('/admin/departures', { method: 'POST', body: { tripId: f.get('tripId'), startDate: f.get('startDate'), capacity: Number(f.get('capacity')) } }); e.target.reset(); });
    } },
    h('label', {}, 'Trip', h('select', { name: 'tripId' }, trips.map((t) => h('option', { value: t.id }, t.title)))),
    h('label', {}, 'Start date', h('input', { name: 'startDate', type: 'date', required: true })),
    h('label', {}, 'Seats', h('input', { name: 'capacity', type: 'number', min: 1, max: 500, value: 12, required: true })),
    h('button', { type: 'submit' }, 'Add departure'));
    const rows = departures.map((d) => h('tr', {},
      h('td', {}, d.tripTitle), h('td', {}, d.startDate),
      h('td', {}, d.booked + ' / ' + d.capacity),
      h('td', {}, pill(d.status)),
      h('td', { class: 'actions' },
        h('button', { class: 'small ghost', onclick: () => { const n = prompt('New number of seats (at least ' + d.booked + ')', d.capacity); if (n !== null) act(() => api('/admin/departures/' + d.id, { method: 'PATCH', body: { capacity: Number(n) } })); } }, 'Seats'),
        d.status !== 'open' ? h('button', { class: 'small', onclick: () => act(() => api('/admin/departures/' + d.id, { method: 'PATCH', body: { status: 'open' } })) }, 'Open') : '',
        d.status === 'open' ? h('button', { class: 'small ghost', onclick: () => act(() => api('/admin/departures/' + d.id, { method: 'PATCH', body: { status: 'closed' } })) }, 'Close') : '',
        d.status !== 'cancelled' ? h('button', { class: 'small bad', onclick: () => { if (confirm('Cancel this departure? Existing bookings are not changed automatically.')) act(() => api('/admin/departures/' + d.id, { method: 'PATCH', body: { status: 'cancelled' } })); } }, 'Cancel') : '')));
    return h('div', {}, form, table(['Trip', 'Start', 'Booked / seats', 'Status', ''], rows));
  }

  // ---- trips ------------------------------------------------------------
  async function renderTrips() {
    const { trips } = await api('/admin/trips');
    const rows = trips.map((t) => {
      const std = h('input', { type: 'number', min: 1, step: '1', value: String(t.standardPaise / 100) });
      const cmf = h('input', { type: 'number', min: 1, step: '1', value: String(t.comfortPaise / 100) });
      return h('tr', {},
        h('td', {}, t.title, h('br'), h('span', { class: 'muted' }, t.duration)),
        h('td', {}, std), h('td', {}, cmf),
        h('td', {}, pill(t.active ? 'open' : 'closed'), ' ', t.active ? 'Listed' : 'Hidden'),
        h('td', { class: 'actions' },
          h('button', { class: 'small', onclick: () => act(() => api('/admin/trips/' + t.id, { method: 'PATCH', body: { standardPaise: Math.round(Number(std.value) * 100), comfortPaise: Math.round(Number(cmf.value) * 100) } })) }, 'Save prices'),
          h('button', { class: 'small ghost', onclick: () => act(() => api('/admin/trips/' + t.id, { method: 'PATCH', body: { active: !t.active } })) }, t.active ? 'Hide' : 'Show')));
    });
    return h('div', {}, h('p', { class: 'muted' }, 'Prices are per person in rupees. Changes apply to new bookings only.'), table(['Trip', 'Standard ₹', 'Comfort ₹', 'Listing', ''], rows));
  }

  // ---- reviews ----------------------------------------------------------
  async function renderReviews() {
    const { reviews } = await api('/admin/reviews?status=' + filters.reviews);
    const set = (r, status) => act(() => api('/admin/reviews/' + r.id, { method: 'PATCH', body: { status } }));
    const rows = reviews.map((r) => h('tr', {},
      h('td', {}, r.tripTitle, h('br'), h('span', { class: 'muted' }, when(r.createdAt))),
      h('td', {}, r.name, h('br'), '★'.repeat(r.rating)),
      h('td', { class: 'wrap' }, h('b', {}, r.title), h('br'), r.body),
      h('td', { class: 'actions' },
        r.status !== 'approved' ? h('button', { class: 'small', onclick: () => set(r, 'approved') }, 'Approve') : '',
        r.status !== 'rejected' ? h('button', { class: 'small bad', onclick: () => set(r, 'rejected') }, 'Reject') : '')));
    return h('div', {},
      h('div', { class: 'toolbar' }, select([['pending', 'Pending'], ['approved', 'Approved'], ['rejected', 'Rejected']], filters.reviews, (v) => { filters.reviews = v; refresh(); }, 'Status')),
      table(['Trip', 'Reviewer', 'Review', ''], rows));
  }

  // ---- enquiries --------------------------------------------------------
  async function renderEnquiries() {
    const q = filters.enquiries ? '?status=' + filters.enquiries : '';
    const { enquiries } = await api('/admin/enquiries' + q);
    const rows = enquiries.map((e) => h('tr', {},
      h('td', {}, when(e.createdAt)), h('td', {}, e.name, h('br'), h('span', { class: 'muted' }, e.contact)),
      h('td', { class: 'wrap' }, e.message), h('td', {}, pill(e.status)),
      h('td', { class: 'actions' }, h('button', { class: 'small ghost', onclick: () => act(() => api('/admin/enquiries/' + e.id, { method: 'PATCH', body: { status: e.status === 'new' ? 'handled' : 'new' } })) }, e.status === 'new' ? 'Mark handled' : 'Reopen'))));
    return h('div', {},
      h('div', { class: 'toolbar' }, select([['', 'All'], ['new', 'New'], ['handled', 'Handled']], filters.enquiries, (v) => { filters.enquiries = v; refresh(); }, 'Status')),
      table(['When', 'From', 'Message', 'Status', ''], rows));
  }

  // ---- session ----------------------------------------------------------
  function showLogin() { $('app').hidden = true; $('login').hidden = false; csrf = ''; }
  async function showApp(me) {
    csrf = me.csrfToken;
    $('who').textContent = me.email;
    $('login').hidden = true; $('app').hidden = false;
    api('/payments/config').then((c) => { const m = $('mode'); m.textContent = 'Payments: ' + c.mode; m.className = 'pill ' + (c.mode === 'test' ? 'test' : c.mode === 'live' ? 'live' : ''); }).catch(() => {});
    drawTabs();
    await refresh().catch((e) => say(e.message, true));
  }

  $('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    $('loginError').textContent = '';
    const f = new FormData(e.target);
    try {
      const me = await api('/admin/login', { method: 'POST', body: { email: f.get('email'), password: f.get('password') } });
      e.target.reset();
      await showApp(me);
    } catch (err) { $('loginError').textContent = err.message; }
  });
  $('logout').addEventListener('click', async () => { try { await api('/admin/logout', { method: 'POST' }); } catch { /* already signed out */ } showLogin(); });

  api('/admin/me').then(showApp).catch(showLogin);
})();
