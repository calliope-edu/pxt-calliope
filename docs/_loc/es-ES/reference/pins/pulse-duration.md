# pulse Duration

Get the duration of the last pulse in microseconds.

```sig
pins.pulseDuration();
```

A pin pulse is detected in the [onPulsed](/reference/pins/on-pulsed) event. You use **pulseDuration** inside that event to get the duration of the pulse that triggered the event.

### ~ notas

#### Simulador

Esta función requiere hardware real para funcionar. No es compatible con el simulador.

### ~

## Devuelve

* a [number](/types/number) that is the duration of the last pulse, measured in microseconds.

## Ejemplo

Wait for pin `P0` to be pulsed high. Display the duration of the pulse in microseconds on the LED screen.

```blocks
pins.onPulsed(DigitalPin.P0, PulseValue.High, () => {
    basic.showNumber(pins.pulseDuration());
});
```

## Ver también

[servo set pulse](/reference/pins/servo-set-pulse), [on pulsed](/reference/pins/on-pulsed), [digital read pin](/reference/pins/digital-read-pin)