# pulse Duration

Get the duration of the last pulse in microseconds.

```sig
pins.pulseDuration();
```

A pin pulse is detected in the [onPulsed](/reference/pins/on-pulsed) event. You use **pulseDuration** inside that event to get the duration of the pulse that triggered the event.

### ~ hint

#### Simulatore

This function needs real hardware to work with. It's not supported in the simulator.

### ~

## Returns

* a [number](/types/number) that is the duration of the last pulse, measured in microseconds.

## Esempio

Attendi che il pin `P0` sia pulsato verso l'alto. Mostra la durata della pulsazione in microsecondi sullo schermo LED.

```blocks
pins.onPulsed(DigitalPin.P0, PulseValue.High, () => {
    basic.showNumber(pins.pulseDuration());
});
```

## Vedi anche

[servo set pulse](/reference/pins/servo-set-pulse), [on pulsed](/reference/pins/on-pulsed), [digital read pin](/reference/pins/digital-read-pin)