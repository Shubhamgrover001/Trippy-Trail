package com.trippytrail.webview

import android.annotation.SuppressLint
import android.content.ActivityNotFoundException
import android.content.ContentValues
import android.content.Intent
import android.graphics.Bitmap
import android.net.Uri
import android.os.Build
import android.os.Bundle
import android.os.Environment
import android.provider.MediaStore
import android.util.Base64
import android.webkit.JavascriptInterface
import android.webkit.WebResourceRequest
import android.webkit.WebResourceResponse
import android.webkit.WebView
import android.widget.Toast
import androidx.activity.OnBackPressedCallback
import androidx.appcompat.app.AppCompatActivity
import androidx.core.splashscreen.SplashScreen.Companion.installSplashScreen
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import androidx.core.view.updatePadding
import androidx.webkit.WebViewAssetLoader
import androidx.webkit.WebViewClientCompat
import java.io.File

/**
 * Loads the bundled Trippy Trail site (app/src/main/assets/site) from a virtual HTTPS origin,
 * so IndexedDB, localStorage and the PDF generator behave exactly as in a browser, fully offline.
 */
class MainActivity : AppCompatActivity() {

    private lateinit var web: WebView

    private val host = "appassets.androidplatform.net"
    private val home = "https://$host/assets/site/index.html"

    // Browsers save blob downloads on their own; a WebView does not. This hands the PDF to Android.
    private val blobPatch = """
        (function(){
          if (window.__ttPatched || !window.TrippyAndroid) return;
          window.__ttPatched = true;
          var orig = HTMLAnchorElement.prototype.click;
          HTMLAnchorElement.prototype.click = function(){
            var a = this;
            if (a.download && a.href.indexOf('blob:') === 0) {
              fetch(a.href).then(function(r){ return r.blob(); }).then(function(b){
                var fr = new FileReader();
                fr.onload = function(){ TrippyAndroid.save(a.download, b.type || 'application/pdf', String(fr.result).split(',')[1]); };
                fr.readAsDataURL(b);
              });
              return;
            }
            return orig.apply(this, arguments);
          };
        })();
    """.trimIndent()

    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        installSplashScreen()
        super.onCreate(savedInstanceState)

        web = WebView(this)
        setContentView(web)
        ViewCompat.setOnApplyWindowInsetsListener(web) { v, insets ->
            val bars = insets.getInsets(WindowInsetsCompat.Type.systemBars() or WindowInsetsCompat.Type.ime())
            v.updatePadding(bars.left, bars.top, bars.right, bars.bottom)
            insets
        }

        val loader = WebViewAssetLoader.Builder()
            .addPathHandler("/assets/", WebViewAssetLoader.AssetsPathHandler(this))
            .build()

        web.settings.apply {
            javaScriptEnabled = true
            domStorageEnabled = true
            allowFileAccess = false
            allowContentAccess = false
            setSupportZoom(false)
        }
        web.addJavascriptInterface(Bridge(), "TrippyAndroid")

        web.webViewClient = object : WebViewClientCompat() {
            override fun shouldInterceptRequest(view: WebView, request: WebResourceRequest): WebResourceResponse? =
                loader.shouldInterceptRequest(request.url)

            override fun shouldOverrideUrlLoading(view: WebView, request: WebResourceRequest): Boolean {
                val url = request.url
                if (url.host == host) return false
                openExternally(url)
                return true
            }

            override fun onPageStarted(view: WebView, url: String?, favicon: Bitmap?) {
                view.evaluateJavascript(blobPatch, null)
            }

            override fun onPageFinished(view: WebView, url: String?) {
                view.evaluateJavascript(blobPatch, null)
            }
        }

        onBackPressedDispatcher.addCallback(this, object : OnBackPressedCallback(true) {
            override fun handleOnBackPressed() {
                if (web.canGoBack()) web.goBack() else finish()
            }
        })

        if (savedInstanceState != null) web.restoreState(savedInstanceState) else web.loadUrl(home)
    }

    override fun onSaveInstanceState(outState: Bundle) {
        super.onSaveInstanceState(outState)
        web.saveState(outState)
    }

    override fun onDestroy() {
        web.removeJavascriptInterface("TrippyAndroid")
        web.destroy()
        super.onDestroy()
    }

    private fun openExternally(uri: Uri) {
        try {
            startActivity(Intent(Intent.ACTION_VIEW, uri).addFlags(Intent.FLAG_ACTIVITY_NEW_TASK))
        } catch (_: ActivityNotFoundException) {
            Toast.makeText(this, "No app found to open this link.", Toast.LENGTH_SHORT).show()
        }
    }

    inner class Bridge {
        @JavascriptInterface
        fun save(name: String, mime: String, base64: String) {
            val safe = name.replace(Regex("[^A-Za-z0-9._ -]"), "_").take(100).ifBlank { "trippy-trail.pdf" }
            val bytes = try { Base64.decode(base64, Base64.DEFAULT) } catch (_: IllegalArgumentException) { return }
            try {
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
                    val values = ContentValues().apply {
                        put(MediaStore.Downloads.DISPLAY_NAME, safe)
                        put(MediaStore.Downloads.MIME_TYPE, mime)
                        put(MediaStore.Downloads.RELATIVE_PATH, Environment.DIRECTORY_DOWNLOADS + "/Trippy Trail")
                    }
                    val uri = contentResolver.insert(MediaStore.Downloads.EXTERNAL_CONTENT_URI, values)
                        ?: throw IllegalStateException("insert failed")
                    contentResolver.openOutputStream(uri)?.use { it.write(bytes) }
                    runOnUiThread {
                        Toast.makeText(this@MainActivity, "Saved to Downloads/Trippy Trail", Toast.LENGTH_LONG).show()
                        try {
                            startActivity(
                                Intent(Intent.ACTION_VIEW).setDataAndType(uri, mime)
                                    .addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION or Intent.FLAG_ACTIVITY_NEW_TASK)
                            )
                        } catch (_: ActivityNotFoundException) { /* no PDF viewer; the file is still saved */ }
                    }
                } else {
                    val dir = getExternalFilesDir(Environment.DIRECTORY_DOWNLOADS) ?: filesDir
                    val file = File(dir, safe)
                    file.writeBytes(bytes)
                    runOnUiThread {
                        Toast.makeText(this@MainActivity, "Saved to " + file.absolutePath, Toast.LENGTH_LONG).show()
                    }
                }
            } catch (e: Exception) {
                runOnUiThread { Toast.makeText(this@MainActivity, "Could not save the file.", Toast.LENGTH_SHORT).show() }
            }
        }
    }
}
