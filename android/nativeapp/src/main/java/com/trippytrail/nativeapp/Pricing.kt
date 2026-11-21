package com.trippytrail.nativeapp

import java.text.NumberFormat
import java.util.Locale

const val GROUP_MIN = 8
const val GROUP_PERCENT = 5
const val MAX_PEOPLE = 30

/** All amounts are in paise (integer), like the website. This is an illustration, not a server quote. */
data class Estimate(
    val people: Int,
    val subtotal: Long,
    val groupDiscount: Long,
    val total: Long,
    val perPerson: Long,
)

fun estimate(unitRupees: Int, people: Int): Estimate {
    val subtotal = unitRupees * 100L * people
    val group = if (people >= GROUP_MIN) (subtotal * GROUP_PERCENT + 50) / 100 else 0L
    val total = subtotal - group
    return Estimate(people, subtotal, group, total, (total * 2 + people) / (2L * people))
}

fun formatMoney(paise: Long): String {
    val rupees = paise / 100
    val rest = paise % 100
    val grouped = NumberFormat.getIntegerInstance(Locale("en", "IN")).format(rupees)
    return "₹" + grouped + if (rest != 0L) "." + rest.toString().padStart(2, '0') else ""
}
