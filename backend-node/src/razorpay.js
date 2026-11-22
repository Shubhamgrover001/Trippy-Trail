'use strict';
// Razorpay (test mode first). Off unless RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET are set.
// The secret never leaves the server; the browser only gets the public key id and an order id.
const crypto = require('node:crypto');

const API = 'https://api.razorpay.com/v1';

function hmacHex(secret, data) {
  return crypto.createHmac('sha256', secret).update(data).digest('hex');
}

function safeEqualHex(a, b) {
  const x = Buffer.from(String(a || ''), 'utf8');
  const y = Buffer.from(String(b || ''), 'utf8');
  return x.length === y.length && crypto.timingSafeEqual(x, y);
}

function createRazorpay({ keyId, keySecret, webhookSecret, client } = {}) {
  const enabled = !!(keyId && keySecret);
  const mode = !enabled ? 'off' : keyId.startsWith('rzp_live_') ? 'live' : 'test';

  /** Default client: POST /orders over HTTPS with Basic auth. Tests inject their own. */
  const http = client || {
    async createOrder({ amountPaise, receipt, notes }) {
      const res = await fetch(`${API}/orders`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          authorization: `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString('base64')}`,
        },
        body: JSON.stringify({ amount: amountPaise, currency: 'INR', receipt, notes }),
        signal: AbortSignal.timeout(10000),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw Object.assign(new Error('Payment provider refused the order.'), { status: 502, detail: json?.error?.description });
      return json;
    },
  };

  return {
    enabled,
    mode,
    keyId: enabled ? keyId : null,
    hasWebhook: !!webhookSecret,
    async createOrder(args) {
      const order = await http.createOrder(args);
      if (!order || typeof order.id !== 'string') throw Object.assign(new Error('Payment provider gave an unexpected reply.'), { status: 502 });
      return order;
    },
    /** Checkout callback: signature = HMAC_SHA256(order_id + "|" + payment_id, key_secret). */
    verifyCheckout({ orderId, paymentId, signature }) {
      if (!enabled || !orderId || !paymentId || !signature) return false;
      return safeEqualHex(hmacHex(keySecret, `${orderId}|${paymentId}`), signature);
    },
    /** Webhook: signature = HMAC_SHA256(raw request body, webhook_secret). */
    verifyWebhook(rawBody, signature) {
      if (!webhookSecret || !rawBody || !signature) return false;
      return safeEqualHex(hmacHex(webhookSecret, rawBody), signature);
    },
  };
}

module.exports = { createRazorpay, hmacHex };
