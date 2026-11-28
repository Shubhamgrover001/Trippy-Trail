# Trippy Trail launch guide

The site works in two modes, set in `assets/js/config.js`:
- **Demo** (`TRIPPY_API.enabled: false`, the default): no real bookings. Safe to show anyone.
- **Live** (`enabled: true`): real departures and seats, a 30-minute seat hold, online payment through Razorpay, verified-traveller reviews. Needs the server in `backend-node/`.

Open the demo through a web server, not by double-clicking `index.html`. Quick local test: `python3 -m http.server 8000` inside this folder.

## What is built
- Website: trips, itineraries, gallery, how booking works, reviews, FAQ, policy pages (placeholders), business-details footer.
- Server: departures and seats, bookings with server-side pricing (5% group saving from 8 travellers), Razorpay payments (test or live), reviews, enquiries, admin dashboard at `/admin/`.
- Checks: `npm test` in `backend-node/` (31 tests) and `npm run preflight` (launch checklist).

## Owner input needed before going public
1. **Domain.** Replace `YOUR-DOMAIN` in `robots.txt` and `sitemap.xml`. Add the canonical link, `og:url` and `og:image` in `index.html` (search `LAUNCH TODO`). Submit the sitemap in Google Search Console.
2. **Business details.** Fill `registeredName`, `gstNumber` and `tourismRegistration` in `config.js`. The footer shows them automatically.
3. **Policies.** Approved wording for cancellation and refunds, rescheduling, prices/taxes/payments and booking terms. The privacy page needs a legal review.
4. **Real trips.** Real departure dates, seats and final prices, entered in the admin page.
5. **Photos and logo.** Original Trippy Trail photos and logo files to replace the web-sourced demo photos.
6. **Razorpay.** Test keys first, then live keys. Add the webhook URL `https://YOUR-DOMAIN/api/webhooks/razorpay` and its secret.
7. **Hosting.** Any host that runs Node 22 and keeps a persistent disk for the SQLite file. A `Dockerfile` is included.
8. **Admin passphrase.** 12+ characters, chosen by the owner.

## Go-live steps
1. Copy `backend-node/.env.example` to `.env` and fill it in (`NODE_ENV=production`, a long `SESSION_SECRET`, `TRUST_PROXY=1`, Razorpay keys).
2. Put these website files in the folder `SITE_DIR` points to.
3. `npm run create-admin`, then start the server (`npm start`, or build the Docker image from the repo root with a volume at `/data`).
4. Sign in at `/admin/`, add the real departures, check prices.
5. Set `TRIPPY_API.enabled` to `true` in `config.js`.
6. Run `npm run preflight` until there is no FAIL. Clear the WARNs you care about.
7. Make one real test booking with Razorpay test keys, then switch to live keys.
