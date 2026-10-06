# scrivi Valore a Seriale

Write the data received by radio to serial in JSON format.

```sig
radio.writeValueToSerial();
```

## ~ hint

**Obsoleto**

Quest'API è stata deprecata! Usa invece [scrivi il pacchetto ricevuto sul numero di serie](/reference/radio/write-received-packet-to-serial).

## ~

## Formato dati ricevuti

Il formato per i dati stampati ricevuti al numero di serie è come segue:

- [invia numero](/reference/radio/send-number): ```{v:ValueSent,t:MicrobitTimeAlive,s:SerialNumber}```
- [invia valore](/reference/radio/send-value): ```{v:ValueSent,t:MicrobitTimeAlive,s:SerialNumber,n:"Name"}```
- [invia stringa](/reference/radio/send-string): ```{t:MicrobitTimeAlive,s:SerialNumber,n:"Text"}```

## Esempi

Quando ```radio``` dati sono ricevuti (dopo la pressione `A` pulsante sulla seconda @boardname@), questo programma invia i dati di temperatura al seriale.

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

## Vedi anche

[send number](/reference/radio/send-number), [send value](/reference/radio/send-value), [send string](/reference/radio/send-string), [on data packet received](/reference/radio/on-data-packet-received)

```package
funk
```