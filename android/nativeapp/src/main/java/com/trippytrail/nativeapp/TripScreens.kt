@file:OptIn(ExperimentalLayoutApi::class)

package com.trippytrail.nativeapp

import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.ExperimentalLayoutApi
import androidx.compose.foundation.layout.FlowRow
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.statusBarsPadding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.AssistChip
import androidx.compose.material3.Button
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.FilterChip
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp

private val Sage = Color(0xFFEAF0DE)
private val Scrim = Brush.verticalGradient(listOf(Color.Transparent, Color(0xD90B1F15)))

@Composable
fun HeroHeader() {
    Box(
        Modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(bottomStart = 30.dp, bottomEnd = 30.dp))
            .background(Brush.verticalGradient(listOf(Forest, Color(0xFF225F41))))
            .statusBarsPadding()
            .padding(start = 22.dp, end = 22.dp, top = 28.dp, bottom = 30.dp),
    ) {
        Column(verticalArrangement = Arrangement.spacedBy(4.dp)) {
            Text("TRIPPY TRAIL", style = MaterialTheme.typography.labelLarge, color = Color(0xFFDFF27A), fontWeight = FontWeight.Bold)
            Text("GOOD VIBES.", style = MaterialTheme.typography.displaySmall, color = Sage, fontWeight = FontWeight.ExtraBold)
            Text("GREAT TRAILS.", style = MaterialTheme.typography.displaySmall, color = Orange, fontWeight = FontWeight.ExtraBold)
            Spacer(Modifier.height(6.dp))
            Text("Big views. Small detours. Trips with your people.", color = Color(0xFFCFDCBC), style = MaterialTheme.typography.bodyLarge)
        }
    }
}

@Composable
fun TripList(onOpen: (String) -> Unit) {
    LazyColumn(Modifier.fillMaxSize(), verticalArrangement = Arrangement.spacedBy(18.dp), contentPadding = PaddingValues(bottom = 24.dp)) {
        item { HeroHeader() }
        item {
            Text(
                "Demo packages: routes and prices are illustrative. The team confirms dates, availability, inclusions and taxes.",
                modifier = Modifier.padding(horizontal = 20.dp),
                style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant,
            )
        }
        items(Data.trips, key = { it.id }) { trip ->
            Card(
                Modifier.padding(horizontal = 16.dp).fillMaxWidth().clickable { onOpen(trip.id) },
                shape = RoundedCornerShape(24.dp),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant),
                elevation = CardDefaults.cardElevation(defaultElevation = 2.dp),
            ) {
                Box(Modifier.fillMaxWidth().height(210.dp)) {
                    Image(painterResource(trip.image), contentDescription = trip.title, modifier = Modifier.matchParentSize(), contentScale = ContentScale.Crop)
                    Box(Modifier.matchParentSize().background(Scrim))
                    Surface(
                        modifier = Modifier.align(Alignment.TopStart).padding(14.dp),
                        shape = RoundedCornerShape(50), color = Color(0xE6FFFFFF),
                    ) {
                        Text(trip.duration, modifier = Modifier.padding(horizontal = 12.dp, vertical = 5.dp), color = Forest, style = MaterialTheme.typography.labelMedium, fontWeight = FontWeight.SemiBold)
                    }
                    Column(Modifier.align(Alignment.BottomStart).padding(16.dp)) {
                        Text(trip.title, style = MaterialTheme.typography.headlineSmall, color = Color.White, fontWeight = FontWeight.ExtraBold)
                        Text(trip.region, style = MaterialTheme.typography.labelLarge, color = Color(0xFFE6EDDB))
                    }
                }
                Column(Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(10.dp)) {
                    Text(trip.description, style = MaterialTheme.typography.bodyMedium)
                    Row(Modifier.fillMaxWidth(), verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.SpaceBetween) {
                        Surface(shape = RoundedCornerShape(50), color = MaterialTheme.colorScheme.secondary) {
                            Text(
                                "From ${formatMoney(trip.standard * 100L)}",
                                modifier = Modifier.padding(horizontal = 14.dp, vertical = 7.dp),
                                color = MaterialTheme.colorScheme.onSecondary, fontWeight = FontWeight.Bold,
                            )
                        }
                        Text("View trip →", color = MaterialTheme.colorScheme.primary, fontWeight = FontWeight.Bold)
                    }
                }
            }
        }
    }
}

@Composable
fun SectionTitle(text: String) {
    Text(text, style = MaterialTheme.typography.titleLarge, fontWeight = FontWeight.ExtraBold)
}

@Composable
fun TripDetail(trip: Trip, onBack: () -> Unit, onPlan: () -> Unit) {
    val context = LocalContext.current
    var comfort by rememberSaveable(trip.id) { mutableStateOf(false) }
    var people by rememberSaveable(trip.id) { mutableIntStateOf(2) }
    val unit = if (comfort) trip.comfort else trip.standard
    val result = estimate(unit, people)

    Column(Modifier.fillMaxSize().verticalScroll(rememberScrollState())) {
        Box(Modifier.fillMaxWidth().height(280.dp)) {
            Image(painterResource(trip.image), contentDescription = trip.title, modifier = Modifier.matchParentSize(), contentScale = ContentScale.Crop)
            Box(Modifier.matchParentSize().background(Scrim))
            Surface(
                modifier = Modifier.align(Alignment.TopStart).statusBarsPadding().padding(14.dp).size(42.dp).clickable(onClick = onBack),
                shape = CircleShape, color = Color(0xE6FFFFFF),
            ) {
                Box(contentAlignment = Alignment.Center) { Text("←", color = Forest, fontWeight = FontWeight.Bold) }
            }
            Column(Modifier.align(Alignment.BottomStart).padding(20.dp)) {
                Text(trip.title, style = MaterialTheme.typography.displaySmall, color = Color.White, fontWeight = FontWeight.ExtraBold)
                Text("${trip.region} · ${trip.duration}", style = MaterialTheme.typography.labelLarge, color = Color(0xFFE6EDDB))
            }
        }

        Column(Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(16.dp)) {
            Text(trip.description, style = MaterialTheme.typography.bodyLarge)

            SectionTitle("Places")
            FlowRow(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                trip.places.forEach { AssistChip(onClick = {}, label = { Text(it) }) }
            }

            SectionTitle("Proposed itinerary")
            trip.itinerary.forEachIndexed { index, day ->
                Card(
                    colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant),
                    shape = RoundedCornerShape(18.dp),
                ) {
                    Row(Modifier.padding(14.dp).fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(12.dp)) {
                        Box(Modifier.size(34.dp).clip(CircleShape).background(MaterialTheme.colorScheme.secondary), contentAlignment = Alignment.Center) {
                            Text("${index + 1}", color = MaterialTheme.colorScheme.onSecondary, fontWeight = FontWeight.ExtraBold)
                        }
                        Column(verticalArrangement = Arrangement.spacedBy(4.dp)) {
                            Text(day.title, fontWeight = FontWeight.Bold)
                            Text(day.description, style = MaterialTheme.typography.bodyMedium, color = MaterialTheme.colorScheme.onSurfaceVariant)
                        }
                    }
                }
            }

            SectionTitle("Sample price calculator")
            Card(colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant), shape = RoundedCornerShape(20.dp)) {
                Column(Modifier.padding(16.dp).fillMaxWidth(), verticalArrangement = Arrangement.spacedBy(12.dp)) {
                    Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                        FilterChip(selected = !comfort, onClick = { comfort = false }, label = { Text("Standard ${formatMoney(trip.standard * 100L)}") })
                        FilterChip(selected = comfort, onClick = { comfort = true }, label = { Text("Comfort ${formatMoney(trip.comfort * 100L)}") })
                    }
                    Text("How many are coming? (1–$MAX_PEOPLE)", fontWeight = FontWeight.SemiBold)
                    Stepper(people, 1, MAX_PEOPLE) { people = it }
                    Text(
                        "Groups of $GROUP_MIN or more save $GROUP_PERCENT%.",
                        style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant,
                    )
                }
            }

            Card(colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.primary), shape = RoundedCornerShape(22.dp)) {
                Column(Modifier.padding(20.dp).fillMaxWidth(), verticalArrangement = Arrangement.spacedBy(8.dp)) {
                    Text("YOUR SAMPLE ESTIMATE", style = MaterialTheme.typography.labelMedium, color = Color(0xFFDFF27A), fontWeight = FontWeight.Bold)
                    PriceRow("${formatMoney(unit * 100L)} × $people", formatMoney(result.subtotal), MaterialTheme.colorScheme.onPrimary)
                    PriceRow("Group saving ($GROUP_PERCENT%)", if (result.groupDiscount > 0) "−" + formatMoney(result.groupDiscount) else formatMoney(0), MaterialTheme.colorScheme.onPrimary)
                    Text(formatMoney(result.total), style = MaterialTheme.typography.displaySmall, color = MaterialTheme.colorScheme.onPrimary, fontWeight = FontWeight.ExtraBold)
                    Text("${formatMoney(result.perPerson)} per person · before taxes, extras excluded", style = MaterialTheme.typography.bodySmall, color = Color(0xFFCFDCBC))
                    Text("DEMO · No payment is taken and nothing is reserved.", style = MaterialTheme.typography.labelSmall, color = Color(0xFFCFDCBC), fontWeight = FontWeight.Bold)
                }
            }

            Button(onClick = onPlan, modifier = Modifier.fillMaxWidth().height(52.dp), shape = RoundedCornerShape(50)) { Text("Plan this trip", fontWeight = FontWeight.Bold) }
            if (Contact.hasWhatsApp) {
                OutlinedButton(
                    onClick = { Contact.whatsApp(context, "Hi Trippy Trail! I would like to know more about the ${trip.title} trip.") },
                    modifier = Modifier.fillMaxWidth(), shape = RoundedCornerShape(50),
                ) { Text("Ask on WhatsApp") }
            }
            if (Contact.hasEmail) {
                OutlinedButton(onClick = { Contact.email(context) }, modifier = Modifier.fillMaxWidth(), shape = RoundedCornerShape(50)) { Text("Email us") }
            }
            if (Contact.hasPhone) {
                OutlinedButton(onClick = { Contact.call(context) }, modifier = Modifier.fillMaxWidth(), shape = RoundedCornerShape(50)) { Text("Call us") }
            }
            Spacer(Modifier.height(12.dp))
        }
    }
}
