package com.trippytrail.nativeapp

import androidx.activity.compose.BackHandler
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.NavigationBar
import androidx.compose.material3.NavigationBarItem
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier

enum class Tab(val label: String, val glyph: String) {
    Trips("Trips", "⛰"),
    Enquire("Enquire", "✉"),
    Reviews("Reviews", "★"),
}

@Composable
fun App() {
    var tab by rememberSaveable { mutableStateOf(Tab.Trips) }
    var openTripId by rememberSaveable { mutableStateOf<String?>(null) }
    var enquiryTripId by rememberSaveable { mutableStateOf("shangarh") }

    BackHandler(enabled = openTripId != null) { openTripId = null }

    Scaffold(
        bottomBar = {
            NavigationBar {
                Tab.entries.forEach { item ->
                    NavigationBarItem(
                        selected = tab == item,
                        onClick = { tab = item; openTripId = null },
                        icon = { Text(item.glyph) },
                        label = { Text(item.label) },
                    )
                }
            }
        },
    ) { padding ->
        Box(Modifier.padding(padding)) {
            val trip = Data.trips.firstOrNull { it.id == openTripId }
            when {
                trip != null -> TripDetail(
                    trip = trip,
                    onBack = { openTripId = null },
                    onPlan = { enquiryTripId = trip.id; openTripId = null; tab = Tab.Enquire },
                )
                tab == Tab.Trips -> TripList(onOpen = { openTripId = it })
                tab == Tab.Enquire -> EnquiryScreen(tripId = enquiryTripId, onTripChange = { enquiryTripId = it })
                else -> ReviewsScreen()
            }
        }
    }
}
