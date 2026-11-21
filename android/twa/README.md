# Trippy Trail: Trusted Web Activity (TWA)

Shows the **live website** full screen (no browser bar) once Android can verify you own the domain.
It needs the site published on HTTPS first, so nothing here works until the domain exists.

1. Publish the website (the `trippy-trail-launch` folder) on HTTPS. The PWA manifest and service worker are already included.
2. Set `hostName` in `build.gradle.kts` and the domain in `res/values/strings.xml`.
3. Build a **release** APK/AAB signed with your upload key. Get its SHA-256 fingerprint:
   `keytool -list -v -keystore your.jks -alias your-alias`
   If you use Play App Signing, use the *App signing key* fingerprint from the Play Console instead.
4. Copy `assetlinks.template.json`, put the fingerprint in, and host it at
   `https://YOUR-DOMAIN/.well-known/assetlinks.json` (content type `application/json`, no redirects).
5. Until verification passes the app falls back to a Chrome custom tab with an address bar. That is expected.
