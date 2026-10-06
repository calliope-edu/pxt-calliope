# Zeichne

Schaltet die angegebene LED-Lampe auf dem [LED-Bildschirm](/device/screen) ein.

```sig
led.plot(0,0);
```

## ~hint

Verwende [lösche](/reference/led/unplot) um eine LED **auszuschalten**.

## ~

## Parameter

* `x` ist eine [Zahl](/types/number), die den horizontalen Platz auf dem LED-Bildschirm angibt (von links nach rechts: 0, 1, 2, 3 oder 4)
* `y` ist eine [Zahl](/types/number), die den vertikalen Platz auf dem LED-Bildschirm angibt (von oben nach unten: 0, 1, 2, 3 oder 4)

Ist ein Parameter [außerhalb der Grenzen](/reference/out-of-bounds) (ein Wert außerhalb 0 bis 4), dann wird diese Funktion nichts tun.

## ~hint

Der LED-Bildschirm ist ein durchgehendes Quadrat aus LEDs mit fünf LEDs auf jeder Seite. Weitere Informationen dazu, wie die LEDs mit `x` und `y` Koordinaten nummeriert sind, siehe [LED-Bildschirm](/device/screen).

## ~

## Beispiel: Eine LED

Dieses Programm schaltet die untere rechte LED ein.

```blocks
led.plot(4, 4)
```

## Beispiel: Quadrat

Dieses Programm verwendet eine [für Schleif](/blocks/loops/for) und die `zeichne` Funktion um ein Quadrat an den Kanten des LED-Bildschirms zu erstellen.

```blocks
for (let i = 0; i < 5; i++) {
    led.plot(0, i)
    led.plot(4, i)
    led.plot(i, 0)
    led.plot(i, 4)
    basic.pause(500)
}
```

## ~hint

Verwenden Sie die [Punkt](/reference/led/point) Funktion, um herauszufinden, ob eine LED ein- oder ausgeschaltet ist.

## ~

## Siehe auch

[unplot](/reference/led/unplot), [point](/reference/led/point), [LED screen](/device/screen)