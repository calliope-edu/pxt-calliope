# Funk

Daten über Funkpakete senden und empfangen.

```cards
radio.sendNumber(0);
radio.sendValue("name", 0);
radio.sendString("");
radio.onReceivedNumber(function (receivedNumber) { });
radio.onReceivedValue(function (name, value) { });
radio.onReceivedString(function (receivedString) { });
radio.receivedPacket(RadioPacketProperty.SignalStrength)
radio.setGroup(0);
```

## Fortgeschritten

```cards
radio.setTransmitPower(7);
radio.setTransmitSerialNumber(false);
radio.raiseEvent(0, 0);
```

```package
Funk
```

## Siehe auch

[sende Zahl](/reference/radio/send-number), [sende Wert](/reference/radio/send-value), [sende Text](/reference/radio/send-string), [wenn Zahl empfangen](/reference/radio/on-received-number), [wenn Wert empfangen](/reference/radio/on-received-value), [wenn Text empfangen](/reference/radio/on-received-string), [erhaltenes Paket](/reference/radio/received-packet), [Gruppe festlegen](/reference/radio/set-group), [Sendeleistung einstellen](/reference/radio/set-transmit-power), [Seriennummer übertragen](/reference/radio/set-transmit-serial-number), [Ereignis auslösen](/reference/radio/raise-event)