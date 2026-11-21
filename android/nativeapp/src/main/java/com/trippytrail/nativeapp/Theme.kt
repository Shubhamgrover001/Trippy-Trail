package com.trippytrail.nativeapp

import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color

val Forest = Color(0xFF16402C)
val Paper = Color(0xFFF7F7F0)
val Orange = Color(0xFFF08A3C)

private val LightColors = lightColorScheme(
    primary = Forest, onPrimary = Paper,
    secondary = Orange, onSecondary = Color.White,
    background = Paper, onBackground = Forest,
    surface = Paper, onSurface = Forest,
    surfaceVariant = Color(0xFFEAF0DE), onSurfaceVariant = Color(0xFF4F6048),
    outline = Color(0xFFB9C4AC),
)

private val DarkColors = darkColorScheme(
    primary = Color(0xFFEAF0DE), onPrimary = Forest,
    secondary = Orange, onSecondary = Color(0xFF1A1208),
    background = Color(0xFF0F2A1D), onBackground = Color(0xFFEAF0DE),
    surface = Color(0xFF0F2A1D), onSurface = Color(0xFFEAF0DE),
    surfaceVariant = Color(0xFF1B4A34), onSurfaceVariant = Color(0xFFBBC9AF),
    outline = Color(0xFF3F6A53),
)

@Composable
fun TrippyTheme(content: @Composable () -> Unit) {
    MaterialTheme(colorScheme = if (isSystemInDarkTheme()) DarkColors else LightColors, content = content)
}
