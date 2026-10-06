# Helligkeit eines Punktes

Lese die Helligkeit einer LED auf dem [LED-Bildschirm](/device/screen).

```sig
led.pointBrightness(0,0);
```

## Parameter

* `x` ist eine [Zahl](/types/number), die den horizontalen Platz auf dem LED-Bildschirm angibt (von links nach rechts: 0, 1, 2, 3 oder 4)
* `y` ist eine [Zahl](/types/number), die den vertikalen Platz auf dem LED-Bildschirm angibt (von oben nach unten: 0, 1, 2, 3 oder 4)

Wenn ein Parameter [außerhalb der Grenzen](/reference/out-of-bounds) ist (ein Wert anders als 0 bis 4), wird diese Funktion `false` zurückgeben.

## Rückgabewert

* eine [Zahl](/blocks/logic/number). Wenn es `true` ist, bedeutet das, dass die LED eingeschaltet ist. Wenn es `false` ist, bedeutet das, dass die LED ausgeschaltet ist.

## ~hint

Der LED-Bildschirm ist ein solides Quadrat aus LEDs mit fünf LEDs auf jeder Seite. Um mehr darüber zu erfahren, wie man die LEDs mit den `x` und `y` Koordinaten nummeriert, siehe [LED-Bildschirm](/device/screen).

## ~

## Beispiel: Ausschalten

Dieses Programm schaltet die zentrale LED (2, 2) aus, wenn sie nicht hell genug ist.  (Wenn sie bereits ausgeschaltet ist, lässt dieses Programm sie ausgeschaltet.)

```blocks
if (led.pointBrightness(2, 2) < 100) {
    led.unplot(2, 2)
}
```

## Siehe auch

[unplot](/reference/led/unplot), [plot](/reference/led/plot), [LED-Bildschirm](/device/screen)