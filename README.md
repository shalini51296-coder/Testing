# Super TET 2026 - Android app

Your `CTET__Test_V1.html` packaged as an installable Android app (works offline).
The icon, splash screen, and build pipeline are already set up.

## Get the APK (about 10 minutes, no Android Studio needed)

1. Create a free account at github.com and make a **new private repository**.
2. Upload everything in this folder to it (Add file -> Upload files).
   Important: the hidden `.github` folder must be uploaded too.
   If your browser skips it, use Add file -> Create new file, type the name
   `.github/workflows/build-apk.yml`, and paste the contents of that file.
3. Open the **Actions** tab -> **Build Android APK** -> **Run workflow**.
4. After 4-8 minutes, open the finished run and download **Super-TET-2026-apk**
   from the *Artifacts* section (it is a .zip; unzip to get `Super-TET-2026.apk`).
5. Copy the APK to your phone, tap it, and allow "Install unknown apps" when asked.

## Updating the test series later
Replace `www/index.html` (keep the two local `<link>` lines at the top:
`tailwind.css` and `fa/css/all.min.css`), commit, and download the new APK.
It installs over the old one and keeps saved accounts and scores, because the
signing key is fixed (`signing/debug.keystore`). Keep the repository private.

## Notes
- The APK is debug-signed: perfect for installing on your own / your students'
  phones. Publishing on Google Play needs a proper release build (AAB).
- Saved data (accounts, weak topics) lives inside the app. Uninstalling the app
  or clearing its storage erases it.
