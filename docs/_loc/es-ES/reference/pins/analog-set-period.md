# Analog Set Period

Configura el período de la modulación por ancho de pulso (PWM) en el pin analógico especificado [pin](/device/pins).

```sig
pins.analogSetPeriod(AnalogPin.P0, 20000)
```

## Parameters

* **nombre**: una [cadena](/types/string) que especifica el pin a configurar (`P0` hasta `P4`, o `P10`)
* **micros**: un [número](/types/number) que especifica el período analógico en microsegundos.

## Ejemplo

The following code first sets `P0` to analog with **analog write pin**, and then sets the PWM period of `P0` to 20,000 microseconds.

```blocks
pins.analogWritePin(AnalogPin.P0, 512)
pins.analogSetPeriod(AnalogPin.P0, 20000)
```

## Ver también

[@boardname@ pins](/device/pins), [on pin pressed](/reference/input/on-pin-pressed), [analog read pin](/reference/pins/analog-read-pin), [analog write pin](/reference/pins/analog-write-pin), [digital read pin](/reference/pins/digital-read-pin), [digital write pin](/reference/pins/digital-write-pin)