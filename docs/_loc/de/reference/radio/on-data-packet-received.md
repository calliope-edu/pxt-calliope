# On Data Packet Received

Teile eines Programms werden ausgeführt, wenn der @boardname@ den [Ziffernwert](/types/number) oder einen[String](/types/string) über Funk erhält.

## ~ hint

**Veraltet**

Diese API ist veraltet!

* Um einen [String](/types/string) zu empfangen, verwende stattdessen [wenn Text empfangen](/reference/radio/on-received-string).
* Um eine [Zahl](/types/number) zu empfangen, verwende stattdessen [wenn Zahl empfangen](/reference/radio/on-received-number).
* Um ein Name-Wert-Paar zu empfangen, verwende stattdessen [wenn Wert empfangen](/reference/radio/on-received-value).

## ~

## ~hint

Um die Teile des Pakets aus dem Block hinzuzufügen oder zu entfernen, klicke auf das blaue Zahnrad in der Ecke!

## ~

## Callback Parameter

* `packet` - das [packet](/reference/radio/packet) das über Funk empfangen wurde. Das Paket hat folgende Eigenschaften: 
  * `receivedNumber` - Die [Zahl](/types/number), die in diesem Paket gesendet wurde oder die Zahl`0`, wenn dieses Paket keine Zahl enthielt. Siehe [send number](/reference/radio/send-number) und [send value](/reference/radio/send-value)
  * `receivedString` - Die [Zeichenfolge,](/types/string) die in diesem Paket gesendet wurde, oder die leere Zeichenfolge, wenn dieses Paket keine Zeichenfolge enthielt. Siehe [String senden](/reference/radio/send-string)und[Wert senden](/reference/radio/send-value)
  * `time` - Die Systemzeit des @boardname@ der dieses Paket zu dem Zeitpunkt gesendet hat, als das Paket gesendet wurde.
  * `serial` - Die Seriennummer des @boardname@ der dieses Paket gesendet hat, oder `0` wenn der @boardname@ seine Seriennummer nicht angegeben hat.
  * `signal` - Wie stark das Funksignal von `128` (schwach) bis `42` (stark) ist.

## Problembehandlung

Das Ereignis "On Radio Data" kann aufgrund der Leistungsminderungen der Hardwarekomponenten nur einmal erzeugt werden.

Die Radio-Gruppe muss definiert und synchronisiert werden, bevor die Radio-Ereignisse funktionieren.

## Siehe auch

[send number](/reference/radio/send-number), [send string](/reference/radio/send-string), [send value](/reference/radio/send-value), [set group](/reference/radio/set-group)

```package
Funk
```