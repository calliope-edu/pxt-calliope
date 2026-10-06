# write Value To Serial

Write the data received by radio to serial in JSON format.

```sig
radio.writeValueToSerial();
```

## ~ notas

**Deprecated**

This API has been deprecated! Use [write received packet to serial](/reference/radio/write-received-packet-to-serial) instead.

## ~

## Formato de datos recibidos

The format for received data printed to serial is as follows:

- [enviar número](/reference/radio/send-number): ```{v:ValueSent,t:MicrobitTimeAlive,s:SerialNumber}```
- [send value](/reference/radio/send-value): ```{v:ValueSent,t:MicrobitTimeAlive,s:SerialNumber,n:"Nombre"}```
- [enviar cadena](/reference/radio/send-string): ```{t:MicrobitTimeAlive,s:SerialNumber,n:"Texto"}```

## Ejemplos

When ```radio``` data is received (after pressing the `A` button on the second @boardname@), this program sends temperature data to serial.

```blocks
radio.setGroup(1)
input.onButtonEvent(Button.A, input.buttonEventClick(), () => {
    radio.sendNumber(input.temperature());
});
radio.onDataReceived(() => {
    radio.writeValueToSerial();
});
```

Sample output to serial when `A` button pressed:

```Text
{v:27,t:323,s:0}
```

## Ver también

[send number](/reference/radio/send-number), [send value](/reference/radio/send-value), [send string](/reference/radio/send-string), [on data packet received](/reference/radio/on-data-packet-received)

```package
funk
```