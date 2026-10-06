# Analog Set Pitch Pin

Specify which [pin](/device/pins) (P0, P1, P2) is used to generate tones.

```sig
pins.analogSetPitchPin(AnalogPin.P0)
```

## Parametri

* `name` - [String](/types/string); the pin name ("P0", "P1", or "P2")

## Esempio

Set the pitch pin to `P0` and send a 440 Hz tone for 1 second.

```blocks
pins.analogSetPitchPin(AnalogPin.P0)
let frequency = 440
let duration = 1000
pins.analogPitch(frequency, duration)
```

## Some common notes

* 440 = A4 on piano
* vedi [frequenze tasto pianoforte](https://en.wikipedia.org/wiki/Piano_key_frequencies) per ulteriori informazioni

## Vedi anche

[@boardname@ pins](/device/pins), [analog set period](/reference/pins/analog-set-period), [analog pitch](/reference/pins/analog-pitch), [set audio pin](/reference/pins/set-audio-pin)