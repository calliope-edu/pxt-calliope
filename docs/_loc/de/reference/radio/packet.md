# Paket

Ein Paket, das über Funk empfangen wurde.

## Eigenschaften

* `receivedNumber` - Die [Zahl,](/types/number) die in diesem Paket gesendet wurde, oder `0,` wenn dieses Paket keine Zahl enthielt. Siehe [send number](/reference/radio/send-number) und [send value](/reference/radio/send-value)
* `receivedString` - Die [Zeichenfolge,](/types/string) die in diesem Paket gesendet wurde, oder die leere Zeichenfolge, wenn dieses Paket keine Zeichenfolge enthielt. Siehe [send string](/reference/radio/send-string) und [send value](/reference/radio/send-value)
* `time` - Die Systemzeit des @boardname@ der dieses Paket zu dem Zeitpunkt gesendet hat, als das Paket gesendet wurde.
* `serial` - Die Seriennummer des @boardname@ der dieses Paket gesendet hat, oder `0` wenn der @boardname@ seine Seriennummer nicht angegeben hat.
* `Signal` - Wie stark das Funksignal ist. Der genaue Wertebereich variiert, aber es geht ungefähr von `-128` dB (schwach) zu `-42` dB (stark).

## Paket-Layout

Dieser Abschnitt dokumentiert das Datenlayout des Pakets, wenn du die Daten außerhalb von MakeCode interpretieren möchtest.

    Packet byte layout
    | 0              | 1 ... 4       | 5 ... 8           | 9 ... 28
    ----------------------------------------------------------------
    | packet type    | system time   | serial number     | payload
    

* Seriennummer ist standardmäßig 0 wenn nicht vom Benutzer aktiviert
* Systemzeit ist seit Beginn Milli-Sekunden und wird nach etwa einem Monat erneut gestartet

### Pakettypen

* PACKET_TYPE_NUMBER 0
    
    payload: number (9 ... 12)

* PACKET_TYPE_VALUE 1
    
    payload: number (9 ... 12), name length (13), name (14 ... 26)

* PACKET_TYPE_STRING 2
    
    payload: string length (9), string (10 ... 28)

* PACKET_TYPE_BUFFER 3
    
    payload: buffer length (9), buffer (10 ... 28)

* PACKET_TYPE_DOUBLE 4
    
    payload: number (9 ... 16)

* PACKET_TYPE_DOUBLE_VALUE 5
    
    payload: number (9 ... 16), name length (17), name (18 ... 26)

## Siehe auch

[on data packet received](/reference/radio/on-data-packet-received),

```package
Funk
```