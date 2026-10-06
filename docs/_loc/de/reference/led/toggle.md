# Umschalten

Schaltet eine LED-Leuchte auf dem [LED-Bildschirm](/device/screen) um, d. h., sie wird eingeschaltet wenn sie ausgeschaltet ist und umgekehrt. Gib an, welche LED mit x-, y-Koordinaten verwendet wird.

```sig
led.toggle(0,0)
```

## Parameter

* x - [Zahl](/types/number); die *x-Koordinate* oder horizontale Position (0, 1, 2, 3, 4)
* y - [Zahl](/types/number); die *y-Koordinate* oder vertikale Position (0, 1, 2, 3, 4)

Ist ein Parameter [außerhalb der Grenzen](/reference/out-of-bounds) (ein Wert außerhalb 0 bis 4), dann wird diese Funktion nichts tun.

## x, y Koordinaten?

Der LED-Bildschirm besteht aus 25 LEDs, die in einem 5x5-Raster angeordnet sind. Um die Koordinaten `x`, `y` herauszufinden, siehe [LED-Bildschirm](/device/screen).

## Beispiel

Dieser Code schaltet die zentrale LED um:

```blocks
led.toggle(2, 2)
```

## Siehe auch

[toggle all](/reference/led/toggle-all), [plot](/reference/led/plot), [unplot](/reference/led/unplot), [point](/reference/led/point), [LED screen](/device/screen),