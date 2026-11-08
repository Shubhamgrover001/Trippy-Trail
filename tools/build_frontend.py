"""Patch the original single-file demo into static/index.html wired to the Flask API.
Every replacement must match exactly once, so a changed source fails loudly instead of silently.
Usage: python tools/build_frontend.py
"""
import os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
src = open(os.path.join(ROOT, "tools", "original.html"), encoding="utf-8").read()


def sub1(text, old, new, label):
    n = text.count(old)
    if n != 1:
        sys.exit(f"patch '{label}': expected 1 match, found {n}")
    return text.replace(old, new)


# 1) contact fields (a real booking needs a way to reach the traveller)
CONTACT = ('<div class="booking-two-fields"><div class="booking-field"><label for="booking-phone">Phone / WhatsApp</label>'
           '<input id="booking-phone" name="phone" type="tel" inputmode="tel" autocomplete="tel" required minlength="10" maxlength="20" placeholder="+91 98765 43210"></div>'
           '<div class="booking-field"><label for="booking-email">Email</label>'
           '<input id="booking-email" name="email" type="email" autocomplete="email" required maxlength="254" placeholder="you@example.com"></div></div>\n        ')
src = sub1(src, '<div class="booking-travellers">', CONTACT + '<div class="booking-travellers">', "contact fields")

# 2) inline error line on the payment step
src = sub1(src, '<p class="payment-demo-explainer">',
           '<p class="booking-field-error" id="booking-payment-error" role="alert" hidden></p>\n        <p class="payment-demo-explainer">', "payment error")

# 3) draft carries phone + email
src = sub1(src, "leadName: $('#booking-name').value.trim(),",
           "leadName: $('#booking-name').value.trim(), phone: $('#booking-phone').value.trim(), email: $('#booking-email').value.trim(),", "draft contact")

# 4) payment submit -> real API
start = "  $('#booking-payment-form').addEventListener('submit', event => {"
i = src.index(start)
assert src.count(start) == 1
end_marker = "    setStep('receipt');\n  });"
j = src.index(end_marker, i) + len(end_marker)
NEW_HANDLER = r"""  $('#booking-payment-form').addEventListener('submit', async event => {
    event.preventDefault();
    if (!draft) { setStep('details'); return; }
    const method = $('input[name="payment-method"]:checked', dialog)?.value;
    if (!Object.hasOwn(methods, method)) return;
    draft.method = method;
    const button = $('[type="submit"]', event.currentTarget);
    const errorBox = $('#booking-payment-error');
    errorBox.hidden = true;
    button.disabled = true;
    try {
      const booking = await window.TrippyApi.createBooking(draft);
      Object.assign(draft.quote, booking.quote); // the server's price is the one that counts
      await window.TrippyApi.pay(booking, draft);
      demoReference = booking.reference;
      $('#receipt-trip').textContent = `${draft.tripTitle} · ${catalog[draft.tripId].duration}`;
      $('#receipt-date').textContent = `${displayDate(draft.preferredArrival)} · preference only`;
      $('#receipt-people').textContent = `${draft.people} traveller${draft.people === 1 ? '' : 's'} · ${catalog[draft.tripId].packages[draft.packageKey].label}`;
      $('#receipt-method').textContent = methods[method];
      $('#receipt-reference').textContent = demoReference;
      setStep('receipt');
    } catch (error) {
      errorBox.textContent = error.message || 'Something went wrong. Please try again.';
      errorBox.hidden = false;
    } finally {
      button.disabled = false;
    }
  });"""
src = src[:i] + NEW_HANDLER + src[j:]

# 5) API client, injected before the catalog script
API_JS = r"""<script>
/* Trippy Trail API client: server owns prices, bookings and payment verification. */
(() => {
  'use strict';
  const json = async (url, body, headers = {}) => {
    const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json', ...headers }, body: JSON.stringify(body) });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      const first = data.fields && Object.values(data.fields)[0];
      throw new Error(first || data.error || 'Request failed (' + res.status + ')');
    }
    return data;
  };
  const loadScript = src => new Promise((ok, bad) => {
    if (document.querySelector('script[src="' + src + '"]')) return ok();
    const s = document.createElement('script'); s.src = src; s.onload = ok; s.onerror = () => bad(new Error('Could not load the payment window. Check your connection.'));
    document.head.append(s);
  });
  const newKey = () => (crypto.randomUUID ? crypto.randomUUID() : String(Date.now()) + Math.random().toString(36).slice(2)).replace(/[^A-Za-z0-9_-]/g, '');
  let mode = 'mock';
  fetch('/api/config').then(r => r.json()).then(c => { mode = c.mode; applyMode(); }).catch(() => {});

  function applyMode() {
    const set = (sel, text) => { const n = document.querySelector(sel); if (n) n.textContent = text; };
    set('#booking-details-form .booking-bottom-note', 'Your details are stored securely and used only to follow up on this booking.');
    if (mode === 'live') {
      set('.booking-header .eyebrow', 'SECURE BOOKING');
      set('#booking-demo-note', 'Check your price, then pay securely online.');
      set('[data-booking-step="payment"] .booking-small-badge', 'SECURE PAYMENT');
      set('#payment-step-title', 'Complete your booking.');
      set('.payment-demo-explainer', 'You will pay on a secure Razorpay window. We never see your card, UPI or bank details.');
      set('[data-booking-step="payment"] [type="submit"]', 'Pay now');
    } else {
      set('.payment-demo-explainer', 'Test mode: no real money moves. The booking is recorded as a mock payment.');
    }
  }

  let key = null, lastSig = '';
  window.TrippyApi = {
    async createBooking(d) {
      const body = { tripId: d.tripId, packageKey: d.packageKey, people: d.people, date: d.preferredArrival, name: d.leadName, phone: d.phone, email: d.email };
      const sig = JSON.stringify(body);
      if (sig !== lastSig) { key = newKey(); lastSig = sig; } // retries of the same form reuse the key => no duplicate bookings
      return json('/api/bookings', body, { 'Idempotency-Key': key });
    },
    async pay(booking, d) {
      if (booking.status === 'paid') return;
      if (booking.mode === 'mock') { await json('/api/payments/mock-confirm', { reference: booking.reference }); return; }
      await loadScript('https://checkout.razorpay.com/v1/checkout.js');
      const dlg = document.querySelector('#booking-dialog');
      // The booking dialog sits in the browser top layer; move Razorpay's overlay inside it so it is visible.
      const mo = new MutationObserver(() => document.querySelectorAll('body > .razorpay-container').forEach(n => dlg.appendChild(n)));
      mo.observe(document.body, { childList: true });
      try {
        await new Promise((resolve, reject) => {
          const rz = new window.Razorpay({
            key: booking.razorpayKeyId, amount: booking.amountPaise, currency: 'INR', order_id: booking.orderId,
            name: 'Trippy Trail', description: d.tripTitle + ' · ' + booking.reference,
            prefill: { name: d.leadName, email: d.email, contact: d.phone },
            handler: r => json('/api/payments/verify', r).then(resolve, reject),
            modal: { ondismiss: () => reject(new Error('Payment was cancelled. You have not been charged.')) }
          });
          rz.on('payment.failed', r => reject(new Error((r.error && r.error.description) || 'Payment failed. Please try again.')));
          rz.open();
        });
      } finally { mo.disconnect(); }
    }
  };
})();
</script>
"""
src = sub1(src, "<script>\n/* Illustrative packages for the demo.", API_JS + "<script>\n/* Illustrative packages for the demo.", "api client")

out = os.path.join(ROOT, "static", "index.html")
open(out, "w", encoding="utf-8").write(src)
print("wrote", out, len(src) // 1024, "KB")
