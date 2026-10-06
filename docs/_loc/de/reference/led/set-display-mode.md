# setze Anzeigemodus

Setze Anzeigemodus entweder zu schwarz-weiß oder Graustufen für die Darstellung der [LEDs](/device/screen).

```sig
led.setDisplayMode(DisplayMode.Greyscale)
```

Die LED-Matrix kann durch die Einstellung des Anzeigemodus ein Gefühl von Farbtiefe erzeugen. Die Farbtiefe ist der Helligkeitsunterschied zwischen den Pixeln des Displays. Der `Graustufen` Modus lässt die Pixel in einer bestimmten Helligkeit scheinen, um den Grauwert der realen Farbe zu repräsentieren. Der `Schwarz und Weiß` Modus zeigt nur ein Bild auf den Pixeln mit den LEDs an oder aus.

## Parameter

* `Modus` der Anzeigemodus-Typ. Dies ist entweder `BlackAndWhite` oder `GreyScale`.

## Beispiel

Setze den Anzeigemodus auf `schwarz-weiß`.

```blocks
led.setDisplayMode(DisplayMode.BlackAndWhite)
```

## Siehe auch

[set brightness](/reference/led/set-brightness)