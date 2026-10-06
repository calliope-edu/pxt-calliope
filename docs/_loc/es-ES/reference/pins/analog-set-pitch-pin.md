# Analog Set Pitch Pin

Specify which [pin](/device/pins) (P0, P1, P2) is used to generate tones.

```sig
pins.analogSetPitchPin(AnalogPin.P0)
```

## Parameters

* `name` - [String](/types/string); the pin name ("P0", "P1", or "P2")

## Ejemplo

Configura el pin de tono en `P0` y envía un tono de 440 Hz durante 1 segundo.

```blocks
pins.analogSetPitchPin(AnalogPin.P0)
let frequency = 440
let duration = 1000
pins.analogPitch(frequency, duration)
```

## Algunas notas comunes

* 440 = A4 en el piano
* see [piano key frequencies ](https://en.wikipedia.org/wiki/Piano_key_frequencies) for more information

## Ver también

[@boardname@ pines](/device/pins), [configura período analógico](/reference/pins/analog-set-period), [paso analógico](/reference/pins/analog-pitch), [configura pin audio](/reference/pins/set-audio-pin)