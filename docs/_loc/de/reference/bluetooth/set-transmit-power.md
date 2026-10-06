# Bluetooth Set Transmit Power

## ~hint
![](https://cdn.makecode.com/blob/5479e652051b327fa86ef770a2e277dc72052dd2/static/bluetooth/Bluetooth_SIG.png)

Um einen der Bluetooth-"Dienste" des @boardname@ mit einem anderen Gerät wie einem Smartphone zu nutzen, muss es zunächst [mit dem @boardname@ gekoppelt werden](/reference/bluetooth/bluetooth-pairing). Nach dem Koppeln kann das andere Gerät eine Verbindung zum @boardname@ herstellen und Daten über viele der @boardname@-Funktionen austauschen.

## ~

Ändere die Ausgabeleistung des Senders auf den angegebenen Wert.

```sig
bluetooth.setTransmitPower(7);
```

## Parameter

* `Power`: eine [Zahl](/types/number) im Bereich `0..7`, wobei `0` die niedrigste Leistung ist und `7` die höchste.

## Siehe auch

[About Bluetooth](/reference/bluetooth/about-bluetooth), [@boardname@ Bluetooth profile overview ](http://lancaster-university.github.io/microbit-docs/ble/profile/), [@boardname@ Bluetooth profile reference](http://lancaster-university.github.io/microbit-docs/resources/bluetooth/microbit-profile-V1.9-Level-2.pdf),  [Bluetooth on @boardname@ resources](http://bluetooth-mdw.blogspot.co.uk/p/-microbit.html), [Bluetooth SIG](https://www.bluetooth.com)

```package
Bluetooth
```