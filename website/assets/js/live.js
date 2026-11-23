/* Trippy Trail live booking client. Talks to the Trippy Trail API and Razorpay Checkout.
   Switched on by window.TRIPPY_API.enabled in config.js; when off, the site stays the demo it was. */
(() => {
  'use strict';
  const cfg = window.TRIPPY_API || {};
  const base = String(cfg.base || '').replace(/\/+$/, '');
  const CHECKOUT_SRC = 'https://checkout.razorpay.com/v1/checkout.js';
  let cache = null;
  let cacheAt = 0;
  let checkoutPromise = null;

  async function request(path, { method = 'GET', body } = {}) {
    let res;
    try {
      res = await fetch(`${base}/api${path}`, {
        method,
        headers: body === undefined ? {} : { 'content-type': 'application/json' },
        body: body === undefined ? undefined : JSON.stringify(body),
        signal: AbortSignal.timeout(15000),
      });
    } catch {
      throw Object.assign(new Error('We could not reach the booking system. Please check your connection or WhatsApp us.'), { offline: true });
    }
    const json = await res.json().catch(() => ({}));
    if (!res.ok) throw Object.assign(new Error(json.error || 'Something went wrong. Please try again.'), { status: res.status });
    return json;
  }

  /** Trips (prices, open departures with seats left) and the payment mode. Cached for a minute. */
  async function load(force = false) {
    if (!force && cache && Date.now() - cacheAt < 60000) return cache;
    const [t, p] = await Promise.all([request('/trips'), request('/payments/config').catch(() => ({ enabled: false, mode: 'off' }))]);
    cache = { trips: Object.fromEntries(t.trips.map(trip => [trip.id, trip])), payments: p };
    cacheAt = Date.now();
    return cache;
  }

  function loadCheckout() {
    if (window.Razorpay) return Promise.resolve(window.Razorpay);
    checkoutPromise ||= new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = CHECKOUT_SRC;
      s.async = true;
      s.onload = () => (window.Razorpay ? resolve(window.Razorpay) : reject(new Error('checkout')));
      s.onerror = () => reject(new Error('checkout'));
      document.head.append(s);
    }).catch(() => { checkoutPromise = null; throw new Error('The secure payment window could not load. Please check your connection and try again.'); });
    return checkoutPromise;
  }

  const book = input => request('/bookings', { method: 'POST', body: input });

  /**
   * Open Razorpay Checkout for a held booking. Resolves { status, note } once the server has verified the payment,
   * or { cancelled: true } if the window is closed first. Rejects with a readable Error on real failures.
   */
  async function pay(reference, { description, name, phone, email }) {
    const order = await request(`/bookings/${encodeURIComponent(reference)}/pay`, { method: 'POST' });
    const Razorpay = await loadCheckout();
    return new Promise((resolve, reject) => {
      let settled = false;
      const done = fn => value => { if (!settled) { settled = true; fn(value); } };
      const ok = done(resolve);
      const fail = done(reject);
      const rzp = new Razorpay({
        key: order.keyId,
        order_id: order.orderId,
        amount: order.amountPaise,
        currency: order.currency,
        name: 'Trippy Trail',
        description,
        prefill: { name, contact: phone, email: email || undefined },
        notes: { reference },
        theme: { color: '#ff6500' },
        handler: response => {
          request('/payments/verify', { method: 'POST', body: {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          } }).then(ok, fail);
        },
        modal: { ondismiss: () => ok({ cancelled: true }) },
      });
      rzp.on('payment.failed', () => { /* Checkout lets the traveller retry inside its own window. */ });
      rzp.open();
    });
  }

  /** Approved reviews (each flagged verified or not) and review submission. */
  const reviews = () => request('/reviews').then(r => r.reviews || []);
  const postReview = input => request('/reviews', { method: 'POST', body: input });

  window.TrippyLive = Object.freeze({ enabled: cfg.enabled === true, load, book, pay, reviews, postReview });
})();
