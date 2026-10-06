# Servo schreibe Pin

Schreibt einen Wert an das Servo am angegebenen [Pin](/device/pins), und steuert die Welle.

Mit dieser Funktion wird die Welle eines Standard-Servos bis zum angegebenen Winkel bewegt, oder die Drehzahl eines kontinuierlichen 360 Grad-Servos eingestellt. (`0` bedeutet volle Geschwindigkeit in die eine Richtung, `180` ist volle Geschwindigkeit in die anderen Richtung, und ungefähr `90` bedeutet Stillstand.)

```sig
pins.servoWritePin(AnalogPin.P0, 180)
```

## Parameter

* `Name`: eine [Zeichenfolge](/types/string), die den zu konfigurierenden Pin angibt (`P0` bis `P4` oder `P10`)
* `Wert`: Ein [Ziffernwert](/types/number) von `0` bis`180`

## Beispiele

### Die Welle in Mittelstellung drehen

```blocks
pins.servoWritePin(AnalogPin.P0, 90)
```

### Steuerung der Servo-Welle durch den Kippwinkel des Beschleunigungsmessers

```blocks
basic.forever(() => {
    let millig = input.acceleration(Dimension.X)
    // map accelerometer readings to angle
    let angle = pins.map(millig, -1023, 1023, 0, 180)
    pins.servoWritePin(AnalogPin.P0, angle)
})
```

### Ein 360°-Drehservo mit voller Geschwindigkeit drehen

```blocks
pins.servoWritePin(AnalogPin.P0, 0)
```

## Siehe auch

[@boardname@ pins](/device/pins), [servo set pulse](/reference/pins/servo-set-pulse)

[Kurzer Leitfaden zu Servos](https://www.kitronik.co.uk/pdf/a-brief-guide-to-servos.pdf)