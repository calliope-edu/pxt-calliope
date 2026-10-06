# Verteile

Ordnet den angegebenen Wert von einem Bereich zu einem anderen um. Diese Funktion verteilt den Wert von `von niedrig` auf den Wert von `nach niedrig`, der Wert von `von hoch ` bis zum Wert von `bis hoch`, und Zwischenwerte auf entsprechende Zwischenwerte.

Diese Funktion beschränkt die Werte nicht auf die Bereiche, da Werte außerhalb des Bereichs manchmal beabsichtigt und nützlich sind. Wenn du einen Bereich begrenzen möchtest, kannst du die `Math.clamp` Funktion vor oder nach dem Aufruf dieser diese Funktion verwenden.

```sig
pins.map(0, 0, 4, 0, 1023);
```

## Parameter

* `value`: Eine [Zahl](/types/number), der den zuzuordnenden Wert angibt
* `fromLow`: eine [Zahl](/types/number), die die untere Grenze des Ursprungsintervalls angibt
* `fromHigh`: eine [Zahl](/types/number), die die obere Grenze des Ursprungsintervalls angibt
* `toLow`: eine [Zahl](/types/number), die die untere Grenze des Zielintervalls angibt
* `toHigh`: eine [Zahl](/types/number), die die obere Grenze des Zielintervalls angibt

## Beispiel

In diesem Beispiel wird der vom analogen Pin `P0` gelesene Wert einer LED Koordinate zwischen `0` und `4` zugeordnet.

```blocks
let value1 = pins.analogReadPin(AnalogPin.P0)
let index = pins.map(value1, 0, 1023, 0, 4)
led.plot(0, index)
```

## Siehe auch

[analog read pin](/reference/pins/analog-read-pin)