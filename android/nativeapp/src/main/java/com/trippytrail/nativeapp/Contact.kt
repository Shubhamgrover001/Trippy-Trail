package com.trippytrail.nativeapp

import android.content.ActivityNotFoundException
import android.content.ClipData
import android.content.ClipboardManager
import android.content.Context
import android.content.Intent
import android.net.Uri
import android.widget.Toast

/**
 * Trippy Trail contact details. WHATSAPP: country code + number, digits only. PHONE: same, a leading + is allowed.
 * A button stays hidden while its value is empty.
 */
object Contact {
    const val WHATSAPP = "918920933972"
    const val PHONE = "+918920933972"
    const val EMAIL = "Trippytrail.in@gmail.com"
    const val INSTAGRAM = "https://www.instagram.com/trippy.trail_/"

    val hasWhatsApp: Boolean get() = Regex("\\d{10,15}").matches(WHATSAPP)
    val hasPhone: Boolean get() = Regex("\\+?\\d{10,15}").matches(PHONE)

    val hasEmail: Boolean get() = Regex("[^\\s@]+@[^\\s@]+\\.[^\\s@]+").matches(EMAIL)

    private fun open(context: Context, intent: Intent) {
        try {
            context.startActivity(intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK))
        } catch (_: ActivityNotFoundException) {
            Toast.makeText(context, "No app found to open this.", Toast.LENGTH_SHORT).show()
        }
    }

    fun whatsApp(context: Context, message: String) {
        if (!hasWhatsApp) return
        open(context, Intent(Intent.ACTION_VIEW, Uri.parse("https://wa.me/$WHATSAPP?text=" + Uri.encode(message))))
    }

    fun call(context: Context) {
        if (!hasPhone) return
        open(context, Intent(Intent.ACTION_DIAL, Uri.parse("tel:+" + PHONE.removePrefix("+"))))
    }

    fun email(context: Context, subject: String = "Trip enquiry") {
        if (!hasEmail) return
        open(context, Intent(Intent.ACTION_SENDTO, Uri.parse("mailto:$EMAIL?subject=" + Uri.encode(subject))))
    }

    fun instagram(context: Context) = open(context, Intent(Intent.ACTION_VIEW, Uri.parse(INSTAGRAM)))

    fun share(context: Context, message: String) {
        val send = Intent(Intent.ACTION_SEND).setType("text/plain").putExtra(Intent.EXTRA_TEXT, message)
        open(context, Intent.createChooser(send, "Share enquiry"))
    }

    fun copy(context: Context, message: String) {
        val clipboard = context.getSystemService(Context.CLIPBOARD_SERVICE) as ClipboardManager
        clipboard.setPrimaryClip(ClipData.newPlainText("Trippy Trail enquiry", message))
        Toast.makeText(context, "Message copied", Toast.LENGTH_SHORT).show()
    }
}
