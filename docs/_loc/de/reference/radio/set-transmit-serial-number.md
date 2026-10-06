# Seriennummer übertragen setzen

Gestatte Paketen des jeweiligen Funkmoduls das Einbetten der Seriennummer der Speicherkarte in jedes Datenpaket.

```sig
radio.setTransmitSerialNumber(true);
```

## Parameter

* **Wertübergabe**: Es handelt sich hier um einen[booleschen](/types/boolean) Parameterwert, der wenn er `wahr` ist, heißt das, dass die Seriennummer der Karte in jedem übertragenen Paket enthalten ist. Wenn er `falsch`ist, wird der Wert der Seriennummer auf `0` gesetzt.

## Beispiel

Dieses Programm veranlasst den `Funk` die Seriennummer in jedem Paket zu senden.

```blocks
radio.setTransmitSerialNumber(true);
```

## Siehe auch

[Eigenschaften des zugewiesenen Paketes](/reference/radio/received-packet), [Ziffernwert senden](/reference/radio/send-number), [Wert senden](/reference/radio/send-value), [String senden](/reference/radio/send-string)

```package
Funk
```