# schreibe empfangenes Paket auf den seriellen Port

Schreibt das letzte über `Funk` empfangene Paket im JSON-Format auf die serielle Schnittstelle.

```sig
radio.writeReceivedPacketToSerial();
```

Dies sollte innerhalb eines Callbacks zu [wenn Datenpakete empfangen](/reference/radio/on-data-packet-received) aufgerufen werden.

### ~ hint

#### Veraltet

Diese API ist veraltet! Verwende stattdessen [seriell schreibe Wert](/reference/serial/write-value).

### ~

## Empfangenes Datenformat

Das Format für empfangene Daten beim Verwenden der folgenden Sendefunktionen:

- [sende Zahl](/reference/radio/send-number): ```{v:ValueSent,t:MicrobitTimeAlive,s:SerialNumber}```
- [sende Wert](/reference/radio/send-value): ```{v:ValueSent,t:MicrobitTimeAlive,s:SerialNumber,n:"Name"}```
- [sende Text](/reference/radio/send-string): ```{t:MicrobitTimeAlive,s:SerialNumber,n:"Text"}```

### ~hint

#### Modellbezeichnung und Seriennummer

Der im Paket gesendete Wert der Seriennummer wird auf `0` gesetzt, es sei denn, die Übertragung der Seriennummer ist mit `||radio:setze Übertragung Seriennummer||` aktiviert.

### ~

## Beispiel

Wenn Daten über ```Funk``` empfangen werden (nach Drücken der `A` Knopf auf der zweiten @boardname@), das Programm sendet Temperaturdaten an den seriellen Port.

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

Serielle Beispielausgabe, wenn `A` gedrückt wird:

```json
{"t":323,"s":0,"v":27}
{"t":325,"s":0,"n":"temp","v":27}
{"t":326,"s":0,"n":"Ziemlich warm gerade"}
```

## Siehe auch

[sende Nummer](/reference/radio/send-number), [sende Wert](/reference/radio/send-value), [sende String](/reference/radio/send-string), [auf dem erhaltenen Datenverarbeitungspaket ](/reference/radio/on-data-packet-received), [auf Seriennummern-Einstellungen ](/reference/radio/set-transmit-serial-number)

```package
Funk
```