# ERSTE SCHRITTE: DIE 5X5 LED-MATRIX

## Anleitung @unplugged

Optionen innerhalb eines Programms können nicht nur von Eingaben abhängig gemacht werden, sondern auch von anderen Bedingungen. Zum Beispiel kannst du ein Orakel erstellen, das zufällig ein trauriges oder glückliches Lächeln zeigt:

## Schritt 1 @fullscreen

### wenn... – dann... Beziehung
Die Aktionen unterhalb des "dann" werden nur ausgeführt, wenn die Bedingung zuvor erfüllt ist. In diesem Fall wird das Herz auf der LED-Matrix nicht sichtbar sein, da die Entscheidungsvariable nicht gleich 1 ist. Du kannst den "wenn… dann..." Block im "Logik" Bereich finden.

## Schritt 2 @fullscreen

### Und weiter geht's
Nach dem "wenn… dann.." Block wird das Programm in jedem Fall fortgesetzt, egal ob die Bedingung erfüllt wurde vor oder nicht.

## Schritt 3 @fullscren

### wenn... – dann... – ansonsten...
Wenn du den "wenn… dann..." Block erweiterst, wird die erste Bedingung zuerst ausprobiert, sollte diese nicht erfüllt sin, wird die zweite Bedingung probiert und dann die nächste. Nur die Aktionen werden ausgelöst, für die die zugehörige Bedingung erfüllt ist.

Klicke auf das + am unteren Rand des Blocks, um den Block auszuklappen. Die Wahrscheinlichkeit, entweder einen glücklichen oder einen traurigen Smiley auf dem LED-Raster zu zeigen, ist 50/50.

```blocks
basic.showLeds(`
    . # . # .
    # # # # #
    # # # # #
    . # # # .
    . . # . .`);
```