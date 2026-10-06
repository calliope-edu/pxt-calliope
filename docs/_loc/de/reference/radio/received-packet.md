# empfangenes Paket

Hole eine der Eigenschaften aus dem zuletzt empfangenen Funkpaket.

```sig
radio.receivedPacket(RadioPacketProperty.SignalStrength)
```

Neben einem [Zahlen-,](types/number) [Zeichenfolge-](/types/string)oder Namens-Wert-Paar enthält das empfangene Paket auch weitere Informationen über die Übertragung des Pakets. Du kannst diese zusätzlichen Informationen erhalten, indem Du eine Eigenschaft aus dem Paket auswählst.

## Parameter

* **type**: the property type to get from the packet. These are: >* `signal strength`: the strength of the radio signal when the packet was received. >* `serial number`: the serial number of the board sending the packet. >* `time`: the time when the packet was sent.

## Rückgabewert

* a [number](/types/number) that is the property selected in the **type** parameter: >* `signal strength`: the value ranges from `-128` up to `-28` (`-128` means a weak signal and `-28` means a strong one.) >* `serial number`: the value is the serial number of the board sending the packet. >* `time`: the value is the system time, in microseconds, of the sender at the time when the packet was sent.

## Beispiel

This program uses the signal strength from received packets to graph the approximate distance between two @boardname@s.

```blocks
radio.setGroup(1)
basic.forever(() => {
    radio.sendNumber(0)
})
radio.onReceivedNumber(function (receivedNumber) {
    led.plotBarGraph(
        Math.abs(radio.receivedPacket(RadioPacketProperty.SignalStrength) + 42),
        128 - 42
    )
})
```

## Siehe auch

[set transmit serial number](/reference/radio/set-transmit-serial-number)

```package
Funk
```