# Analog Pitch

Envía una señal de modulación por ancho de pulso (PWM) al pin `P0`.

```sig
pins.analogPitch(440, 300)
```

La señal PWM se envía al pin de tono actual. Usa [configurar tono analógico pin](/reference/pins/analog-set-pitch-pin) para configurar primero el pin de tono actual.

## Parameters

* **frecuencia**: un [número](/types/number) que representa la frecuencia de la señal PWM en el pin de tono.
* **ms**: un [número](/types/number) en milisegundos que representa la duración de la señal en el pin de tono.

## Ejemplo

Configura el pin de tono en `P1` y envía un tono de 440 Hz durante 1 segundo.

```blocks
pins.analogSetPitchPin(AnalogPin.P0)
let frequency1 = 440
let duration = 1000
pins.analogSetPitchPin(AnalogPin.P1)
pins.analogPitch(frequency1, duration)
```

## Algunas notas comunes

* 440 = A4 en el piano
* see [piano key frequencies ](https://en.wikipedia.org/wiki/Piano_key_frequencies) for more information

## Ver también

[@boardname@ pins](/device/pins), [analog set period](/reference/pins/analog-set-period), [analog set pitch pin](/reference/pins/analog-set-pitch-pin)