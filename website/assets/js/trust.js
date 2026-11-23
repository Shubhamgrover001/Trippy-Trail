/* Trippy Trail trust boosters: business details, secure-payment note, receipt note and verified reviews.
   Everything here is written as text (never HTML). Live parts only appear when live booking is switched on in config.js. */
(() => {
  'use strict';
  const $ = (selector, root = document) => root.querySelector(selector);
  const live = window.TrippyLive;
  const isLive = !!(live && live.enabled);
  document.documentElement.classList.toggle('tt-live', isLive);

  /* 1. Business details: show GST / tourism registration only once the owner has supplied them. */
  (() => {
    const cfg = window.TRIPPY_BUSINESS || {};
    const trust = $('.footer-trust');
    if (!trust) return;
    const fill = (label, value) => {
      const clean = String(value || '').trim().slice(0, 60);
      if (!clean) return false;
      const dt = [...trust.querySelectorAll('dt')].find(node => node.textContent.trim() === label);
      const dd = dt && dt.nextElementSibling;
      if (!dd) return false;
      dd.textContent = clean;
      dd.classList.remove('tbd');
      return true;
    };
    const gst = fill('GST number', cfg.gstNumber);
    const tourism = fill('Tourism registration', cfg.tourismRegistration);
    const pill = $('.pending-pill', trust);
    if (pill && gst && tourism) pill.remove();
  })();

  if (!isLive) return;

  /* 2. Live mode: receipt note on, demo-only notes off. */
  const next = $('#receipt-next');
  if (next) next.hidden = false;
  document.querySelectorAll('.tt-demo-only').forEach(node => { node.hidden = true; });

  /* 3. Secure-payment note, only when the server says payments are on. */
  live.load().then(data => {
    const note = $('#pay-secure-note');
    if (note && data.payments && data.payments.enabled) note.hidden = false;
  }).catch(() => { /* The booking form already reports API problems itself. */ });

  /* 4. Verified reviews replace the sample and browser-only reviews. */
  const section = $('#live-reviews');
  const sampleSection = $('#reviews');
  if (!section) return;
  section.hidden = false;
  if (sampleSection) sampleSection.hidden = true;
  document.querySelectorAll('a[href="#reviews"]').forEach(link => { link.setAttribute('href', '#live-reviews'); });

  const TRIP_NAMES = { shangarh: 'Shangarh', jibhi: 'Jibhi & Shoja', kashmir: 'Kashmir' };
  const list = $('#live-review-list');
  const empty = $('#live-review-empty');
  const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };

  function renderReviews(items) {
    list.replaceChildren();
    empty.hidden = items.length > 0;
    for (const review of items) {
      const card = el('article', 'lr-card');
      const head = el('div', 'lr-head');
      const rating = Math.max(1, Math.min(5, Number(review.rating) || 0));
      const stars = el('span', 'lr-stars', '★'.repeat(rating) + '☆'.repeat(5 - rating));
      stars.setAttribute('role', 'img');
      stars.setAttribute('aria-label', `${rating} out of 5 stars`);
      head.append(stars);
      if (review.verified) head.append(el('span', 'lr-badge', 'Verified traveller'));
      card.append(head, el('h3', '', review.title), el('p', 'lr-body', review.body));
      const date = String(review.createdAt || '').slice(0, 10);
      card.append(el('p', 'lr-meta', `${review.name} · ${TRIP_NAMES[review.tripId] || review.tripId}${date ? ` · ${date}` : ''}`));
      list.append(card);
    }
  }

  live.reviews().then(renderReviews).catch(() => {
    empty.textContent = 'Reviews could not be loaded right now. Please try again later.';
    empty.hidden = false;
  });

  const form = $('#live-review-form');
  const note = $('#live-review-note');
  const submit = $('#live-review-submit');
  form.addEventListener('submit', async event => {
    event.preventDefault();
    note.classList.remove('lr-error');
    if (!form.checkValidity()) { form.reportValidity(); return; }
    const data = new FormData(form);
    const body = {
      name: data.get('name'), tripId: data.get('tripId'), rating: Number(data.get('rating')),
      title: data.get('title'), body: data.get('body'),
    };
    const reference = String(data.get('bookingReference') || '').trim();
    const phone = String(data.get('phone') || '').trim();
    if (reference || phone) {
      if (!reference || !phone) {
        note.textContent = 'To get the Verified traveller badge, enter both the booking reference and the phone number, or leave both empty.';
        note.classList.add('lr-error');
        return;
      }
      body.bookingReference = reference;
      body.phone = phone;
    }
    submit.disabled = true;
    note.textContent = 'Sending…';
    try {
      const result = await live.postReview(body);
      note.textContent = result.verified ? `${result.note} It will carry the Verified traveller badge.` : result.note;
      form.reset();
    } catch (error) {
      note.textContent = error.message;
      note.classList.add('lr-error');
    } finally {
      submit.disabled = false;
    }
  });
})();
