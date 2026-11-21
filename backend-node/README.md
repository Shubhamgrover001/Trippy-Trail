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
npm test                      # 14 tests
```
(On Windows PowerShell set the variables first: `$env:ADMIN_EMAIL="..."; $env:ADMIN_PASSWORD="..."`.)

## What it does
- **Departures with real capacity.** Seats are reserved inside one database transaction, so two people can never take the last seat. Unpaid holds expire after 30 minutes and the seats go back.
- **Server-side pricing.** The browser sends trip, package, and travellers; the server works out the price in paise (group 5% from 8).
- **Reviews and enquiries.** Reviews arrive as *pending* and only appear publicly after an admin approves them.
- **Admin login.** Passwords are hashed with scrypt, the session cookie is signed, HttpOnly and SameSite=Strict (Secure in production), every change needs a CSRF token, and login is rate-limited.

## API (JSON)
Public: `GET /api/trips`, `POST /api/bookings`, `GET /api/reviews?trip=`, `POST /api/reviews`, `POST /api/enquiries`
Admin (login first): `POST /api/admin/login`, `GET /api/admin/me`, `GET /api/admin/summary`, departures, bookings, reviews, enquiries, trips.

## Not in this step yet
Admin web page (`/admin`), Razorpay payments, and connecting the website to these endpoints. A booking here is a seat hold; the team confirms it by hand until payments are added.

## Owner inputs
Real departure dates and capacities (replace the demo ones), a strong admin passphrase, hosting choice, and later Razorpay test keys.
