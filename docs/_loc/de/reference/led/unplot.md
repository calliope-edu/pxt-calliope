# Lösche

Schaltet die angegebene LED-Lampe auf dem [LED-Bildschirm](/device/screen) aus.

```sig
led.unplot(0,0)
```

## ~hint

Verwende [zeichne](/reference/led/plot) um eine LED **anzuschalten**.

## ~

## Parameter

* `x` ist eine [Zahl](/types/number), die den horizontalen Platz auf dem LED-Bildschirm angibt (von links nach rechts: 0, 1, 2, 3 oder 4)
* `y` ist eine [Zahl](/types/number), die den vertikalen Platz auf dem LED-Bildschirm angibt (von oben nach unten: 0, 1, 2, 3 oder 4)

Ist ein Parameter [außerhalb der Grenzen](/reference/out-of-bounds) (ein Wert außerhalb 0 bis 4), dann wird diese Funktion nichts tun.

## ~hint

Der LED-Bildschirm ist ein durchgehendes Quadrat aus LEDs mit fünf LEDs auf jeder Seite. Weitere Informationen dazu, wie die LEDs mit `x` und `y` Koordinaten nummeriert sind, siehe [LED-Bildschirm](/device/screen).

## ~

## Beispiel: Mitte aus

Dieses Programm zeigt ein Bild auf dem LED-Bildschirm und schaltet die mittlere LED mit `lösche` aus.

```blocks
basic.showLeds(`
. . # . .
. . # . .
# # # # #
. . # . .
. . # . .
`)
basic.pause(500)
led.unplot(2, 2)
```

## ~hint

Verwenden Sie die [Punkt](/reference/led/point) Funktion, um herauszufinden, ob eine LED ein- oder ausgeschaltet ist.

## ~

## Siehe auch

[plot](/reference/led/plot), [point](/reference/led/point), [LED screen](/device/screen)