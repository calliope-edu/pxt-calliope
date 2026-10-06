# Analog Set Pitch Pin

Gib an, welcher [Pin](/device/pins) (P1, P2) verwendet wird, um Töne zu generieren.

```sig
pins.analogSetPitchPin(AnalogPin.P0)
```

## Parameter

* `name` - [String](/types/string); der Pin-Name ("P1", oder "P2")

## Beispiel

Stelle den Pitch-Pin auf `P0` um einen 440-Hz-Ton pro Sekunde zu senden.

```blocks
pins.analogSetPitchPin(AnalogPin.P0)
let frequency = 440
let duration = 1000
pins.analogPitch(frequency, duration)
```

## Hinweise

* 440 = A4 auf dem Klavier
* siehe [Klaviertastenfrequenzen](https://en.wikipedia.org/wiki/Piano_key_frequencies) für weitere Informationen

## Siehe auch

[@boardname@ Pins](/device/pins), [analoge Periode festlegen](/reference/pins/analog-set-period), [analoger Ton](/reference/pins/analog-pitch), [Audio-Pin festlegen](/reference/pins/set-audio-pin)