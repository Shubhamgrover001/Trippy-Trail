plugins {
    id("com.android.application")
}

android {
    namespace = "com.trippytrail.twa"
    compileSdk = 35
    defaultConfig {
        applicationId = "com.trippytrail.twa"
        minSdk = 24
        targetSdk = 35
        versionCode = 1
        versionName = "1.0.0"

        // OWNER INPUT: the live domain only, no https:// and no trailing slash (e.g. "trippytrail.in").
        // Also update the same domain in src/main/res/values/strings.xml (asset_statements).
        manifestPlaceholders["hostName"] = "YOUR-DOMAIN"
    }
    buildTypes {
        release {
            isMinifyEnabled = false
        }
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
}

dependencies {
    implementation("com.google.androidbrowserhelper:androidbrowserhelper:2.5.0")
}
