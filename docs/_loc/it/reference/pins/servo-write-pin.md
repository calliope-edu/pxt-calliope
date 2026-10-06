# Servo Write Pin

Write a value to the servo on the specified [pin](/device/pins) and control the shaft.

This function will move the shaft of a standard servo to the specified angle, or set the speed of a continuous rotation servo. (`0` specifies full speed in one direction, `180` specifies full speed in the other, and approximately `90` specifies no movement.)

```sig
pins.servoWritePin(AnalogPin.P0, 180)
```

## Parametri

* `name`: a [string](/types/string) that specifies the pin name (`P0` through `P4`, or `P10`)
* `value`: a [number](/types/number) from `0` through `180`

## Esempi

### Impostare l'angolo dell'albero al punto medio su un servo

```blocks
pins.servoWritePin(AnalogPin.P0, 90)
```

### Controllare l'albero usando le informazioni di inclinazione dell'accelerometro

```blocks
basic.forever(() => {
    let millig = input.acceleration(Dimension.X)
    // map accelerometer readings to angle
    let angle = pins.map(millig, -1023, 1023, 0, 180)
    pins.servoWritePin(AnalogPin.P0, angle)
})
```

### Impostare la velocità massima su un servo continuo

```blocks
pins.servoWritePin(AnalogPin.P0, 0)
```

## Vedi anche

[@boardname@ pins](/device/pins), [servo set pulse](/reference/pins/servo-set-pulse)

[Brief Guide to Servos](https://www.kitronik.co.uk/pdf/a-brief-guide-to-servos.pdf)