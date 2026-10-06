# on Pulsed

Set a pin to use as a digital input and then run some code when the pin pulses either `high` or `low`.

```sig
pins.onPulsed(DigitalPin.P0, PulseValue.High, () => { });
```

### ~ notas

#### Simulador

Esta función requiere hardware real para funcionar. No es compatible con el simulador.

### ~

## Parameters

* **name**: the @boardname@ hardware pin to set for digital input (`P0` through `P20`).
* **pulse**: the state that will cause the code inside the block to run, either `high` or `low`.
* **body**: the code to run when the pin in **name** is pulsed to the state set in **pulse**.

## Ejemplo

Configure pin `P2` for digital input. Display the string `"LOW"` whenever `P2` pulses `low`.

```blocks
pins.onPulsed(DigitalPin.P2, PulseValue.Low, () => {
    basic.showString("LOW");
});
```

## Ver también

[servo set pulse](/reference/pins/servo-set-pulse), [pulse duration](/reference/pins/pulse-duration), [digital read pin](/reference/pins/digital-read-pin)