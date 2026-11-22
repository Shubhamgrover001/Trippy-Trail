# Trippy Trail backend (step 1: core)

Node + Express + SQLite. One small server that also serves the website.
Needs **Node 22.13 or newer** (uses the built-in `node:sqlite`, so the only dependency is Express).

## Run it on your computer
```bash
npm install
cp .env.example .env          # then fill SESSION_SECRET (see the comment inside)
npm run seed                  # demo trips + DEMO departures
ADMIN_EMAIL=you@example.com ADMIN_PASSWORD='a long passphrase' npm run create-admin
cp -r ../trippy-trail-launch/* public/   # the website; served at /
npm start                     # http://localhost:3000
npm test                      # 23 tests
```
(On Windows PowerShell set the variables first: `$env:ADMIN_EMAIL="..."; $env:ADMIN_PASSWORD="..."`.)

## What it does
- **Departures with real capacity.** Seats are reserved inside one database transaction, so two people can never take the last seat. Unpaid holds expire after 30 minutes and the seats go back.
- **Server-side pricing.** The browser sends trip, package, and travellers; the server works out the price in paise (group 5% from 8).
- **Reviews and enquiries.** Reviews arrive as *pending* and only appear publicly after an admin approves them.
- **Admin login.** Passwords are hashed with scrypt, the session cookie is signed, HttpOnly and SameSite=Strict (Secure in production), every change needs a CSRF token, and login is rate-limited.

## API (JSON)
Public: `GET /api/trips`, `POST /api/bookings`, `GET /api/reviews?trip=`, `POST /api/reviews`, `POST /api/enquiries`
Payments (need Razorpay keys): `GET /api/payments/config`, `POST /api/bookings/:reference/pay`, `POST /api/payments/verify`, `POST /api/webhooks/razorpay`
Admin (login first): `POST /api/admin/login`, `GET /api/admin/me`, `GET /api/admin/summary`, departures, bookings, reviews, enquiries, trips.

## Admin page
Open `/admin` and sign in with the account made by `npm run create-admin`. Tabs: bookings (confirm / cancel, shows the Razorpay payment id), departures (add, change seats, open / close / cancel), trip prices, review approval, enquiries. The page has no inline script or style and writes all data as plain text.

## Razorpay (test mode)
Payments stay **off** until `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` are in `.env`. Use keys that start with `rzp_test_`: no real money moves, and the admin header shows "Payments: test".
1. The website asks `POST /api/bookings/:reference/pay`; the server creates the order for the price it calculated itself.
2. Razorpay Checkout runs in the browser; its result is sent to `POST /api/payments/verify`, where the server checks the signature with the key secret and confirms the booking.
3. Optional safety net: in the Razorpay dashboard add a webhook to `https://YOUR-DOMAIN/api/webhooks/razorpay` for `payment.captured` and `order.paid`, and put its secret in `RAZORPAY_WEBHOOK_SECRET`. Confirming twice is harmless.
4. If someone pays after their 30-minute hold ended, the seats are taken again when free. If not, the payment id is saved and the booking stays unconfirmed so the team can refund or sort it by hand (visible in the admin bookings list).
Going live later means swapping in `rzp_live_` keys, which needs the business's Razorpay KYC. Nothing else changes.

## Not in this step yet
Connecting the website's booking form to these endpoints (Razorpay Checkout button), and hosting.

## Owner inputs
Real departure dates and capacities (replace the demo ones), a strong admin passphrase, hosting choice, and later Razorpay test keys.
