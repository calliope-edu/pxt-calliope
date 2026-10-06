# Servo-Impulsdauer einstellen

Konfiguriere den angegebenen Pin als Servo-Ausgang, setze die Periodendauer auf 20 Millisekunden und setze die Impulsdauer auf den angegebenen Wert.

```sig
pins.servoSetPulse(AnalogPin.P1, 1500)
```

## Parameter

* `Name`: eine [Zeichenkette](/types/string), die den zu konfigurierenden Anschluss angibt (`P0`, `P4`oder `P10`)
* `micros`: eine [Zahl](/types/number) die den analogen Zeitraum in Mikrosekunden angibt.

## Beispiel

Im folgenden Code wird die Servo-Impulsdauer auf `1000` Mikrosekunden festgelegt.

```blocks
pins.servoSetPulse(AnalogPin.P0, 1000)
```

## Siehe auch

[@boardname@ pins](/device/pins), [on pin pressed](/reference/input/on-pin-pressed), [analog read pin](/reference/pins/analog-read-pin), [digital read pin](/reference/pins/digital-read-pin), [digital write pin](/reference/pins/digital-write-pin)

[Kurzer Leitfaden zu Servos](https://www.kitronik.co.uk/pdf/a-brief-guide-to-servos.pdf)