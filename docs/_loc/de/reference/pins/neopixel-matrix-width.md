# Neopixel Matrixbreite

Für Neopixelmatrix (Streifen) auf dem angegebenen [-Pin-](/device/pins) die Breite dieser Matrix festlegen. Dies informiert den Simulator um den Neopixelstreifen als Matrix anzuzeigen.

```sig
pins.setMatrixWidth(Digital.P1, 16)
```

## Parameter

* `Name`: Der @boardname@ Hardwarepin zum Konfigurieren (`P0`-`P20`)
* `Breite`: eine [Zahl](/types/number) (z. B. von `2` bis `16`)

## Beispiel

Um das untenstehende Beispiel zu verwenden, solltest du die Neopixel-Erweiterung zu deinem Projekt hinzufügen und dann den unten stehenden JavaScript-Code in dein Projekt kopieren. Das Beispiel erstellt einen Streifen von 25 Neopixeln, die einer 5x5-Matrix entsprechen und zeichnet dann ein `X` auf die Matrix. Ändere den Wert der Variablen `Breite` um Matrizen unterschiedlicher Größe zu erhalten.

```blocks
let width = 5
let strip = neopixel.create(DigitalPin.P1, width * width, NeoPixelMode.RGB)
strip.setMatrixWidth(width)
pins.setMatrixWidth(DigitalPin.P1, width)
for (let i = 0; i <= width - 1; i++) {
    strip.setMatrixColor(i, i, neopixel.colors(NeoPixelColors.Red))
    strip.setMatrixColor(width - (i + 1), i, neopixel.colors(NeoPixelColors.Blue))
}
strip.show()
```