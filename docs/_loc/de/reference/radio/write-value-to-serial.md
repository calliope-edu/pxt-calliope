# Wert auf seriell schreiben

Schreibt die per Funk empfangenen Daten im JSON-Format auf den seriellen Port.

```sig
radio.writeValueToSerial();
```

## ~ hint

**Veraltet**

Hinweis: Diese API ist veraltet! Verwende stattdessen [schreibe empfangenes Paket auf seriell.](/reference/radio/write-received-packet-to-serial)

## ~

## Empfangenes Datenformat

Das Format für empfangene Daten, die auf die serielle Schnittstelle geschrieben werden, lautet wie folgt:

- [send-number](/reference/radio/send-number): ```{v:ValueSent,t:MicrobitTimeAlive,s:SerialNumber}```
- [send value](/reference/radio/send-value): ```{v:ValueSent,t:MicrobitTimeAlive,s:SerialNumber,n:"Name"}```
- [send string](/reference/radio/send-string): ```{t:MicrobitTimeAlive,s:SerialNumber,n:"Text"}```

## Beispiele

Wenn Daten über ```Funk``` empfangen werden (nach Drücken der `A` Taste auf dem zweiten @boardname@), sendet dieses Programm Temperaturdaten an die serielle Schnittstelle.

```blocks
radio.setGroup(1)
input.onButtonEvent(Button.A, input.buttonEventClick(), () => {
    radio.sendNumber(input.temperature());
});
radio.onDataReceived(() => {
    radio.writeValueToSerial();
});
```

Serielle Beispielausgabe, wenn `A` gedrückt wird:

```Text
{v:27,t:323,s:0}
```

## Siehe auch

[send number](/reference/radio/send-number), [send value](/reference/radio/send-value), [send string](/reference/radio/send-string), [on data packet received](/reference/radio/on-data-packet-received)

```package
Funk
```