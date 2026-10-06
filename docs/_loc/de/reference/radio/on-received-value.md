# Bei Empfangenem Wert

Führe einen Teil eines Programms aus, wenn der @boardname@ ein Name-Wert-Paar über `radio` empfängt.

```sig
radio.onReceivedValue(function (name, value) {})
```

## Parameter

* **name**: a [string](/types/string) that is a name for the value received.
* **value**: a [number](/types/number) that is the value received.

### ~ hint

#### @boardname@ radio

Watch this video to see how the radio hardware works on the @boardname@:

https://www.youtube.com/watch?v=Re3H2ISfQE8

### ~

## Beispiel

Dieses Programm sendet kontinuierlich Zahlen, die angeben, wie schnell der @boardname@ abbremst oder beschleunigt. Wenn es Zahlen für dasselbe von nahegelegenen @boardname@s empfängt, zeigt es die Zahlen als [Säulendiagramm](/reference/led/plot-bar-graph) an.

```blocks
radio.setGroup(1)
basic.forever(() => {
    radio.sendValue("accel-x", input.acceleration(Dimension.X))
})
radio.onReceivedValue(function (name, value) {
    if (name == "accel-x") {
        led.plotBarGraph(value, 1023);
    }
})
```

## Problembehandlung

The `||radio:on received value||` event can only be created once, due to the hardware restrictions.

Die Radio-Gruppe muss definiert und synchronisiert werden, bevor die Radio-Ereignisse funktionieren.

## Siehe auch

[on received number](/reference/radio/on-received-number), [received packet](/reference/radio/received-packet), [send number](/reference/radio/send-number), [send string](/reference/radio/send-string), [send value](/reference/radio/send-value), [set group](/reference/radio/set-group)

```package
Funk
```