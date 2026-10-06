# write Received Packet To Serial

Writes the last packet received by the `radio` to serial in JSON format.

```sig
radio.writeReceivedPacketToSerial();
```

This should be called within a callback to [on data packet received](/reference/radio/on-data-packet-received).

### ~ notas

#### Deprecated

This API has been deprecated! Use [serial write value](/reference/serial/write-value) instead.

### ~

## Formato de datos recibidos

The format for received data when these send functions are used:

- [enviar número](/reference/radio/send-number): ```{v:ValueSent,t:MicrobitTimeAlive,s:SerialNumber}```
- [send value](/reference/radio/send-value): ```{v:ValueSent,t:MicrobitTimeAlive,s:SerialNumber,n:"Nombre"}```
- [enviar cadena](/reference/radio/send-string): ```{t:MicrobitTimeAlive,s:SerialNumber,n:"Texto"}```

### ~nota

#### Default serial number

The serial number value sent in the packet is set to `0` unless transmission of the serial number is enabled with `||radio:radio set transmit serial number||`.

### ~

## Ejemplo

When ```radio``` data is received (after pressing the `A` button on the second @boardname@), this program sends temperature data to the serial port.

```blocks
radio.setGroup(44)
input.onButtonEvent(Button.A, input.buttonEventClick(), function () {
    radio.sendNumber(input.temperature())
    radio.sendValue("temp", input.temperature())
    radio.sendString("It's warm now")
})
radio.onReceivedNumber(function (receivedNumber) {
    radio.writeReceivedPacketToSerial()
})
radio.onReceivedValue(function (name, value) {
    radio.writeReceivedPacketToSerial()
})
radio.onReceivedString(function (receivedString) {
    radio.writeReceivedPacketToSerial()
})
```

Sample output to serial when `A` button pressed:

```json
{"t":323,"s":0,"v":27}
{"t":325,"s":0,"n":"temp","v":27}
{"t":326,"s":0,"n":"It's warm now"}
```

## Ver también

[send number](/reference/radio/send-number), [send value](/reference/radio/send-value), [send string](/reference/radio/send-string), [on data packet received](/reference/radio/on-data-packet-received), [set transmit serial number](/reference/radio/set-transmit-serial-number)

```package
funk
```