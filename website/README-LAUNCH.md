# Trippy Trail launch build (front-end demo)

Open through a web server, not by double-clicking `index.html`. PDF downloads load fonts and tools from `assets/`, which browsers block on `file://`.
Quick local test: `python3 -m http.server 8000` inside this folder, then open http://localhost:8000

## What is in this build
- Public site: trips, itineraries, gallery, reviews, collaboration link, enquiry, sample price estimate, itinerary and estimate PDFs.
- FAQ section, five policy pages (placeholders) and a business-details footer (placeholders).
- SEO and speed: photos, fonts and PDF tools in `assets/`, lazy loading, structured data, `robots.txt`, `sitemap.xml`, `_headers`.

## Owner input needed before going public
1. Replace `YOUR-DOMAIN` in `robots.txt` and `sitemap.xml`. In `index.html` head, add the canonical link, `og:url` and `og:image` (search `LAUNCH TODO`). Submit the sitemap in Google Search Console.
2. Approved policy wording: cancellation and refunds, rescheduling, prices/taxes/payments, booking terms, privacy. Search `policies = {` in `index.html`. Until then each page says it is pending and offers no terms.
3. Business details in the footer: registered name, GST number, tourism registration (if any), support contact. Search `class="tbd"`.
4. Original Trippy Trail photos to replace the web-sourced demo photos (keep alt text and credits).
5. Payments, departures, shared gallery and reviews stay demos until the backend is built.
