package com.trippytrail.nativeapp

import androidx.annotation.DrawableRes

data class Day(val title: String, val description: String)

data class Trip(
    val id: String, val title: String, val region: String, val duration: String, val description: String,
    val places: List<String>, val itinerary: List<Day>,
    /** Sample price per person in rupees. Demo values, to be confirmed by the team. */
    val standard: Int, val comfort: Int,
    @DrawableRes val image: Int,
)

data class Review(val name: String, val tripId: String, val rating: Int, val title: String, val body: String)

/** Fictional demo content that mirrors the website. Replace with real, approved content before launch. */
object Data {
    val trips: List<Trip> = listOf(
        Trip(
            id = "shangarh", title = "Shangarh", region = "Himachal Pradesh", duration = "3 days · 2 nights",
            description = "A meadow escape with village walks, wide-open views and an easy evening with your people.",
            places = listOf("Shangarh meadows", "Shangchul Mahadev temple", "Shangarh village", "Sainj Valley"),
            itinerary = listOf(
            Day("Arrive, settle in, breathe out", "Meet at Aut bus stand and take the proposed transfer to Shangarh. Check in, get together over introductions and head out for an unhurried meadow walk."),
            Day("Meadows, village lanes & valley views", "After breakfast, explore the village and the Shangchul Mahadev temple surroundings respectfully, then enjoy a relaxed valley outing. Return for dinner and a possible bonfire at the stay, subject to conditions and permission."),
            Day("One last slow morning", "Make time for breakfast and a final stroll before checkout. Take the proposed return transfer to Aut for your onward journey.")
            ),
            standard = 5999, comfort = 8499, image = R.drawable.shangarh_green_meadows
        ),
        Trip(
            id = "jibhi", title = "Jibhi & Shoja", region = "Himachal Pradesh", duration = "4 days · 3 nights",
            description = "Waterfall mornings, time in Shoja and a day for the trail, with enough room to stop and stare.",
            places = listOf("Jibhi waterfall", "Jibhi village", "Shoja", "Jalori Pass", "Serolsar Lake trail"),
            itinerary = listOf(
            Day("Hello, mountain air", "Meet at Aut and transfer to Jibhi. Settle into the homestay, explore the village at your own pace and come together for dinner."),
            Day("A waterfall & a quieter road", "Visit Jibhi waterfall after breakfast, then take the proposed transfer towards Shoja. Check in and enjoy a gentle village or forest walk. A bonfire evening may be arranged if conditions and local rules permit."),
            Day("Make a day of the trail", "If the road and trail are open, head to Jalori Pass and follow the Serolsar Lake trail with the group. The walk requires suitable fitness and footwear. Use a shorter local alternative if weather or access makes the trail unsuitable."),
            Day("Take the long way home", "Enjoy breakfast, check out and take the proposed transfer back to Aut. Keep your onward travel flexible until the operator confirms road conditions and timings.")
            ),
            standard = 6999, comfort = 9999, image = R.drawable.jibhi_mist_hills_hero
        ),
        Trip(
            id = "kashmir", title = "Kashmir", region = "Srinagar · Gulmarg · Pahalgam", duration = "6 days · 5 nights",
            description = "A proposed journey through lakeside Srinagar, mountain views in Gulmarg and slower days beside the river in Pahalgam.",
            places = listOf("Dal Lake", "Srinagar gardens", "Gulmarg", "Pahalgam", "Lidder riverside"),
            itinerary = listOf(
            Day("Srinagar, at your own pace", "Arrive at Srinagar airport and take the proposed transfer to your stay. Settle in and enjoy the Dal Lake surroundings. A short shared shikara ride is proposed, subject to local conditions."),
            Day("Gardens, lanes & lakeside time", "Explore a selection of Srinagar garden stops and leave time for the lakeside or local lanes. The final garden choices and entry charges will be confirmed with the operator."),
            Day("A day in Gulmarg", "Head out for a proposed day excursion to Gulmarg and return to Srinagar. A Gondola ride is optional, separately charged and subject to tickets, weather and operations."),
            Day("Follow the valley", "Transfer to Pahalgam, check in and enjoy a relaxed riverside outing. Keep the rest of the afternoon open for settling into the valley."),
            Day("Leave room for a little wonder", "Enjoy a slower day around Pahalgam. Aru or Betaab Valley can be requested as an optional excursion, with local transport and entry costs extra. Ask the stay about a possible bonfire and its charges."),
            Day("One more view for the road", "Have breakfast, check out and take the proposed return transfer to Srinagar airport. Confirm a suitable flight time with the operator before booking your airfare.")
            ),
            standard = 18999, comfort = 26999, image = R.drawable.kashmir_gadsar_lake
        )
    )

    val reviews: List<Review> = listOf(
        Review("Aarav Mehta", "shangarh", 5, "A slower kind of weekend.", "Meadow walks, shared dinners and unhurried mornings. Exactly the reset we needed from city life."),
        Review("Simran Kaur", "shangarh", 4, "Cosy village, kind hosts.", "Loved the sunset point and the home-style food. A little more detail on the walk timings would have helped."),
        Review("Rohan Verma", "shangarh", 5, "Perfect for a group of friends.", "Easy pace, great views and plenty of time to just sit and talk. We are already planning the next one."),
        Review("Ananya Sharma", "jibhi", 4, "Forest air and a fresh perspective.", "A waterfall morning and a day on the trail made a great combination. A clearer packing list would help first-timers."),
        Review("Karan Malhotra", "jibhi", 5, "Jibhi stole our hearts.", "Mist in the mornings, quiet cafés and a lovely stay. Shoja felt like a different world."),
        Review("Neha Thakur", "jibhi", 5, "Worth every kilometre.", "Well-paced days with room to wander on our own. The group felt relaxed from the first evening."),
        Review("Vikram Rathore", "jibhi", 4, "Great trail, tiring drive.", "The trek was the highlight. The road in is long, so carry something for motion sickness."),
        Review("Isha Kapoor", "kashmir", 5, "Big views. Plenty to talk about.", "A good mix of lakeside exploring and slower valley days. Gadsar was unforgettable."),
        Review("Arjun Singh", "kashmir", 5, "Our best trip so far.", "Houseboat evenings, meadows and tea stops. Please confirm optional activity costs before departure, as we had to ask."),
        Review("Meera Iyer", "kashmir", 4, "Beautiful, but pack well.", "Stunning scenery and a thoughtful itinerary. Weather changes fast, so layers matter.")
    )

    val budgets = listOf("Under ₹10,000", "₹10,000 – ₹20,000", "₹20,000 – ₹30,000", "Above ₹30,000", "Happy to discuss")
}
