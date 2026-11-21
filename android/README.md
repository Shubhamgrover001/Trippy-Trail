# Trippy Trail: Android project

One Android Studio project with **three apps**. Pick the one you want to ship, or compare them side by side.
All three are demo-priced like the website (sample prices, no real payments).

| Module | App ID | What it is | Needs a live domain? |
|---|---|---|---|
| `webview` | `com.trippytrail.app` | The full website bundled inside the app. Works offline. PDFs save to Downloads/Trippy Trail. | No |
| `twa` | `com.trippytrail.twa` | The live website in full screen (Trusted Web Activity). Always up to date. | **Yes** (HTTPS + assetlinks) |
| `nativeapp` | `com.trippytrail.nativeapp` | Native Kotlin / Jetpack Compose: trips, itinerary, calculator, enquiry, reviews. | No |

## Build (about 10 minutes)
1. Install **Android Studio** (current stable). Open this folder. Let Gradle sync (it downloads the Android SDK pieces).
2. Pick a module in the run-configuration dropdown, choose an emulator or a USB phone, press Run.
3. APK: *Build > Build Bundle(s) / APK(s) > Build APK(s)*. Release: *Build > Generate Signed Bundle / APK* (AAB for Play Store).

> This project was written without access to the Android SDK or Google's Maven servers, so it has **not been compiled yet**.
> If Gradle reports an error on first sync or build, send me the message and I will fix it.

## Owner inputs (same list as the website)
- **WhatsApp / call / email buttons** (already set to the Trippy Trail details): `nativeapp/src/main/java/com/trippytrail/nativeapp/Contact.kt`
  and, for the bundled website, the `contact-config` block in `webview/src/main/assets/site/index.html`.
- **Domain** (TWA only): `twa/build.gradle.kts`, `twa/src/main/res/values/strings.xml`, and host `.well-known/assetlinks.json` (see `twa/README.md`).
- **Real photos, reviews, policies, GST/registration**: the demo reviews and placeholders must be replaced before launch.

## Updating the bundled website (`webview`)
Copy the new `trippy-trail-launch` folder contents into `webview/src/main/assets/site/`, then delete `sw.js` and remove the
service-worker registration `<script>` at the end of `index.html` (the app is already offline, and a service worker would keep stale copies).

## Play Store checklist
Developer account (one-time US$25), app signing key (keep the `.jks` and passwords safe), privacy policy URL, Data safety form,
content rating, 512x512 icon, feature graphic, screenshots, and a short and full description. Bump `versionCode` on every upload.
