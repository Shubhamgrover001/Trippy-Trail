@file:OptIn(ExperimentalLayoutApi::class)

package com.trippytrail.nativeapp

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.ExperimentalLayoutApi
import androidx.compose.foundation.layout.FlowRow
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.statusBarsPadding
import androidx.compose.animation.AnimatedVisibility
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.Button
import androidx.compose.material3.FilterChip
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp

@Composable
fun EnquiryScreen(tripId: String, onTripChange: (String) -> Unit) {
    val context = LocalContext.current
    var dates by rememberSaveable { mutableStateOf("") }
    var people by rememberSaveable { mutableIntStateOf(2) }
    var budget by rememberSaveable { mutableStateOf(Data.budgets.last()) }
    var notes by rememberSaveable { mutableStateOf("") }
    var message by rememberSaveable { mutableStateOf("") }
    val trip = Data.trips.first { it.id == tripId }

    Column(
        Modifier.fillMaxSize().statusBarsPadding().verticalScroll(rememberScrollState()).padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(14.dp),
    ) {
        Text("What's your kind of escape?", style = MaterialTheme.typography.headlineMedium, fontWeight = FontWeight.ExtraBold)
        Text(
            "Build a short enquiry, then share it with Trippy Trail yourself. Nothing is sent automatically.",
            color = MaterialTheme.colorScheme.onSurfaceVariant,
        )

        Text("Destination", fontWeight = FontWeight.Bold)
        FlowRow(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            Data.trips.forEach { FilterChip(selected = it.id == tripId, onClick = { onTripChange(it.id); message = "" }, label = { Text(it.title) }) }
        }

        OutlinedTextField(
            value = dates, onValueChange = { dates = it.take(80); message = "" }, singleLine = true,
            label = { Text("Preferred dates (optional)") }, modifier = Modifier.fillMaxWidth(),
        )

        Text("Travellers", fontWeight = FontWeight.Bold)
        Stepper(people, 1, 50) { people = it; message = "" }

        Text("Budget per person", fontWeight = FontWeight.Bold)
        FlowRow(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            Data.budgets.forEach { FilterChip(selected = it == budget, onClick = { budget = it; message = "" }, label = { Text(it) }) }
        }

        OutlinedTextField(
            value = notes, onValueChange = { notes = it.take(800); message = "" },
            label = { Text("Anything else? (optional)") }, minLines = 3, modifier = Modifier.fillMaxWidth(),
        )

        Button(
            shape = RoundedCornerShape(50),
            onClick = {
                message = buildString {
                    appendLine("Hi Trippy Trail! I would love to plan a trip.")
                    appendLine()
                    appendLine("Destination: ${trip.title}")
                    appendLine("Preferred dates: ${dates.trim().ifBlank { "Flexible" }}")
                    appendLine("Travellers: $people")
                    appendLine("Budget per person: $budget")
                    if (notes.isNotBlank()) appendLine("Notes: ${notes.trim()}")
                    appendLine()
                    append("Please share your current departure dates, actual itinerary, starting point, inclusions and price. Thank you!")
                }
            },
            modifier = Modifier.fillMaxWidth(),
        ) { Text("Create my message") }

        AnimatedVisibility(visible = message.isNotEmpty()) {
          Column(verticalArrangement = Arrangement.spacedBy(14.dp)) {
            Text("Review or edit before you share", fontWeight = FontWeight.Bold)
            OutlinedTextField(value = message, onValueChange = { message = it.take(1800) }, minLines = 8, modifier = Modifier.fillMaxWidth())
            Button(onClick = { Contact.copy(context, message) }, modifier = Modifier.fillMaxWidth()) { Text("Copy message") }
            OutlinedButton(onClick = { Contact.instagram(context) }, modifier = Modifier.fillMaxWidth()) { Text("Open Instagram") }
            OutlinedButton(onClick = { Contact.share(context, message) }, modifier = Modifier.fillMaxWidth()) { Text("Share…") }
            if (Contact.hasWhatsApp) {
                OutlinedButton(onClick = { Contact.whatsApp(context, message) }, modifier = Modifier.fillMaxWidth()) { Text("Send on WhatsApp") }
            }
            if (Contact.hasEmail) {
                OutlinedButton(onClick = { Contact.email(context) }, modifier = Modifier.fillMaxWidth()) { Text("Email us") }
            }
            if (Contact.hasPhone) {
                OutlinedButton(onClick = { Contact.call(context) }, modifier = Modifier.fillMaxWidth()) { Text("Call us") }
            }
            Text(
                "This app has not submitted an enquiry or made a booking.",
                style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant,
            )
          }
        }
    }
}
