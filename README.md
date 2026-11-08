# Trippy Trail – real booking app

Flask + SQLite backend behind the original single-file site.

## Run
    pip install -r requirements.txt
    python tools/build_frontend.py      # builds static/index.html from tools/original.html
    ADMIN_TOKEN=change-me python app.py # http://127.0.0.1:5000  (MOCK payments, no real money)
    pytest -q

## Go live (Razorpay)
    export RAZORPAY_KEY_ID=rzp_test_...  RAZORPAY_KEY_SECRET=...  RAZORPAY_WEBHOOK_SECRET=...
    gunicorn -w 2 'app:create_app()'
Webhook URL (Razorpay dashboard, events `payment.captured`, `order.paid`): `https://<domain>/api/payments/webhook`.
Serve over HTTPS (reverse proxy). Start with `rzp_test_` keys and do a test payment before `rzp_live_`.

## API
| Route | Purpose |
|---|---|
| GET /api/config, /api/catalog | mode + public prices |
| POST /api/quote | server price |
| POST /api/bookings | validate, price on server, create order (Idempotency-Key supported) |
| POST /api/payments/mock-confirm | mock mode only |
| POST /api/payments/verify | live: HMAC signature check |
| POST /api/payments/webhook | live: signed, amount-checked, idempotent |
| GET /api/admin/bookings[?status=], GET /api/admin/export.csv, PATCH /api/admin/bookings/<ref> | `Authorization: Bearer $ADMIN_TOKEN`; disabled if token unset |

## Before real customers
- Replace sample prices in `catalog.json` with operator-approved rates (and decide on GST).
- The PDF still says "Sample estimate / No payment taken" (text inside the PDF module): change it for live mode.
- Razorpay checkout code is written to spec but untested against the live gateway (needs your keys).
- Add a refund/cancellation policy and an email/WhatsApp confirmation to the traveller.
- Back up `trippy.db`; the rate limiter is in-memory (use Redis/nginx if you scale beyond one process).
