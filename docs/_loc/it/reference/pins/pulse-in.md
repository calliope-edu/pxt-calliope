# pulse In

Get the duration, in microseconds, of a pulse (high or low) from one of the pins.

```sig
pins.pulseIn(DigitalPin.P0, PulseValue.High)
```

## ~avatar

Alcuni pin sono usati anche dallo [schermo LED](/device/screen). Sei pregato di leggere attentamente la [pagina sui pin](/device/pins).

## ~

### ~ hint

#### Simulatore

This function needs real hardware to work with. It's not supported in the simulator.

### ~

## Parametri

* `name` the name of the pin (`P0`, `P1`, or `P2`, up through `P20`).
* `value` the value of the pulse, either `high` or `low`.
* `maxDuration`, maximum duration to wait for the pulse in microseconds. If no pulse is received, the duration returned is `0`.

## Returns

* a [number](/types/number) that is the pulse duration in microseconds.

## Example: Measuring distance with a sonar

Invia un impulso su `P0` e legge un impulso restituito da un sensore ultrasonico sonar HC-SR04. Il sensore determina la distanza dell'oggetto di fronte ad esso.

```blocks
basic.forever(() => {
    // send pulse
    pins.digitalWritePin(DigitalPin.P0, 0)
    control.waitMicros(2)
    pins.digitalWritePin(DigitalPin.P0, 1)
    control.waitMicros(10)
    pins.digitalWritePin(DigitalPin.P0, 0)

    // read pulse
    led.plotBarGraph(pins.pulseIn(DigitalPin.P1, PulseValue.High) / 58, 0)
    basic.pause(100)
})
```

## Vedi anche

[digital write pin](/reference/pins/digital-write-pin)