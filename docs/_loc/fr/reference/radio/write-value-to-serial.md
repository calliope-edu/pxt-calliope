# write Value To Serial

Write the data received by radio to serial in JSON format.

```sig
radio.writeValueToSerial();
```

## ~ indice

**Deprecated**

Cette API est obsolète! Utilisez plutôt l'option [écrire le paquet reçu sur le port série](/reference/radio/write-received-packet-to-serial).

## ~

## Data received format

The format for received data printed to serial is as follows:

- [send number](/reference/radio/send-number): ```{v:ValueSent,t:MicrobitTimeAlive,s:SerialNumber}```
- [send value](/reference/radio/send-value): ```{v:ValueSent,t:MicrobitTimeAlive,s:SerialNumber,n:"Name"}```
- [send string](/reference/radio/send-string): ```{t:MicrobitTimeAlive,s:SerialNumber,n:"Text"}```

## Exemples

Quand ```radio``` les données sont reçues (après avoir appuyé sur `La` button on the second @boardname@), this program sends temperature data to serial.

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

## Voir Aussi

[send number](/reference/radio/send-number), [send value](/reference/radio/send-value), [send string](/reference/radio/send-string), [on data packet received](/reference/radio/on-data-packet-received)

```package
funk
```