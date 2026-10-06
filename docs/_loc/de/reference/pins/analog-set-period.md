# Setze Zeitraum für analogen Pin

Konfiguriere die Dauer der Pulsweitenmodulation (PWM) auf der angegebenen analogen [Pin](/device/pins). Bevor Du diese Funktion aufrufst, sollte die von Dir angegebene Pin als analoge Eingangspin festgelegt werden.

```sig
pins.analogSetPeriod(AnalogPin.P0, 20000)
```

## Parameter

* **Name**: ein [String](/types/string), der die zu konfigurierende Pin angibt (`P0` bis `P4`, oder `P10`)
* **Micros**: eine [Zahl](/types/number), die die analoge Periode in Mikrosekunden angibt.

## Beispiel

Der folgende Code setzt zuerst `P1` auf analog mit **analog write pin**, und setzt dann den PWM-Zeitraum von `P1` auf 20.000 Mikrosekunden.

```blocks
pins.analogWritePin(AnalogPin.P0, 512)
pins.analogSetPeriod(AnalogPin.P0, 20000)
```

## Siehe auch

[@boardname@ pins](/device/pins), [on pin pressed](/reference/input/on-pin-pressed), [analog read pin](/reference/pins/analog-read-pin), [analog write pin](/reference/pins/analog-write-pin), [digital read pin](/reference/pins/digital-read-pin), [digital write pin](/reference/pins/digital-write-pin)