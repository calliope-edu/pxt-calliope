# Punkt

Findet heraus, ob die angegebene LED auf dem [LED Bildschirm](/device/screen) aktiviert oder deaktiviert ist.

```sig
led.point(0,0);
```

## Parameter

* `x` ist eine [Zahl](/types/number), die den horizontalen Platz auf dem LED-Bildschirm angibt (von links nach rechts: 0, 1, 2, 3 oder 4)
* `y` ist eine [Zahl](/types/number), die den vertikalen Platz auf dem LED-Bildschirm angibt (von oben nach unten: 0, 1, 2, 3 oder 4)

Ist ein Parameter [außerhalb der Grenzen](/reference/out-of-bounds) (ein anderer Wert als 0 bis 4), wird diese Funktion `falsch` zurückgeben.

## Rückgabewert

* ein [boolescher Wert](/blocks/logic/boolean). Wenn es `wahr` ist, bedeutet das, dass die LED eingeschaltet ist. Wenn es `falsch` ist, bedeutet das, dass die LED ausgeschaltet ist.

## ~hint

Der LED-Bildschirm ist ein durchgehendes Quadrat aus LEDs mit fünf LEDs auf jeder Seite. Weitere Informationen dazu, wie die LEDs mit `x` und `y` Koordinaten nummeriert sind, siehe [LED-Bildschirm](/device/screen).

## ~

## Beispiel: Ausschalten

Dieses Programm schaltet die Mittel-LED (2, 2) aus, wenn sie bereits eingeschaltet ist. (Wenn sie bereits ausgeschaltet ist, lässt dieses Programm sie aus.)

```blocks
if (led.point(2, 2)) {
    led.unplot(2, 2)
}
```

## Siehe auch

[unplot](/reference/led/unplot), [plot](/reference/led/plot), [LED screen](/device/screen)