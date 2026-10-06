# Impuls in

Erfassen Sie die Dauer eines Pulses (hoch oder niedrig) von einem der Pins in Mikrosekunden.

```sig
pins.pulseIn(DigitalPin.P0, PulseValue.High)
```

## ~avatar

Einige Pins werden auch vom [LED-Bildschirm](/device/screen) verwendet. Bitte lies die [Seite über Pins](/device/pins) sorgfältig durch.

## ~

### ~ hint

#### Simulator

Zur Verwendung dieser Funktion brauchst Du echte Hardware, die im Simulator nicht unterstützt wird.

### ~

## Parameter

* `name`, der Name des Pins (`P0`, `P1` oder `P2`, bis `P20`).
* `value`, der Wert des Pulses, entweder `high` oder `low`.
* `maxDuration`, maximale Wartezeit auf den Puls in Mikrosekunden. Wenn kein Puls empfangen wird, ist die zurückgegebene Dauer `0`.

## Rückgabewert

* eine [Zahl](/types/number), die die Pulsdauer in Mikrosekunden angibt.

## Beispiel: Entfernungsmessung mit einem Sonar

Senden Sie einen Impuls auf `P0` und lesen Sie einen Impuls, der von einem HC-SR04 Sonar-Ultraschallsensor zurückgegeben wird. Der Sensor bestimmt die Entfernung des Objekts vor ihm.

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

## Siehe auch

[digital write pin](/reference/pins/digital-write-pin)