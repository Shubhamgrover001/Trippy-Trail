/* Trippy Trail owner settings. Edit this file to change contact numbers and departure dates. */
/* OWNER INPUT: real departure dates per trip, as "YYYY-MM-DD" lists, e.g. shangarh: ["2026-12-04","2026-12-18"].
   Leave a list empty to show the sample schedule below instead:
   Shangarh every Friday, Jibhi & Shoja every Thursday, Kashmir every second Saturday (starting a week from today). */
window.TRIPPY_DEPARTURES = { shangarh: [], jibhi: [], kashmir: [] };
/* OWNER INPUT: add verified numbers here to switch the WhatsApp and call buttons on.
   whatsapp: country code + number, digits only, e.g. "919876543210" (no +, spaces or dashes).
   phone: same format; a leading + is allowed. Leave both empty to keep every button hidden. */
window.TRIPPY_CONTACT = { whatsapp: "918920933972", phone: "+918920933972", email: "Trippytrail.in@gmail.com" };
/* Live booking. Off = the site stays a demo. Turn on (enabled: true) only when the API is running and the owner inputs are in.
   base: leave "" when the website is served by the Trippy Trail server itself (same address); otherwise the API address, e.g. "https://api.example.com". */
window.TRIPPY_API = { enabled: false, base: "" };
