# UART Schreibe Wert

## ~hint

![](https://cdn.makecode.com/blob/5479e652051b327fa86ef770a2e277dc72052dd2/static/bluetooth/Bluetooth_SIG.png)

Um einen der Bluetooth-"Dienste" des @boardname@ mit einem anderen Gerät wie einem Smartphone zu nutzen, muss es zunächst [mit dem @boardname@ gekoppelt werden](/reference/bluetooth/bluetooth-pairing). Nach dem Koppeln kann das andere Gerät eine Verbindung zum @boardname@ herstellen und Daten über viele der @boardname@-Funktionen austauschen.

## ~

Der [Bluetooth UART-Dienst](/reference/bluetooth/start-uart-service) ermöglicht es einem anderen Gerät, z. B. einem Smartphone, beliebige Daten mit dem @boardname@ in kleinen Blöcken auszutauschen.

Wenn der Bluetooth-UART-Dienst läuft, erlaubt dieser Block einem @boardname@ Daten an ein verbundenes Bluetooth-Gerät zu senden.

```sig
bluetooth.uartWriteValue("x", 42);
```

## Advanced

Weiterführende Informationen zum @boardname@ Bluetooth UART-Dienst, einschließlich Informationen zur Verwendung eines Smartphones, finden Sie in der [@boardname@ technischen Dokumentation der Universität Lancaster](http://lancaster-university.github.io/microbit-docs/ble/uart-service/)

## Siehe auch

[About Bluetooth](/reference/bluetooth/about-bluetooth), [@boardname@ Bluetooth profile overview ](http://lancaster-university.github.io/microbit-docs/ble/profile/), [@boardname@ Bluetooth profile reference](http://lancaster-university.github.io/microbit-docs/resources/bluetooth/microbit-profile-V1.9-Level-2.pdf), [Bluetooth on @boardname@ resources](http://bluetooth-mdw.blogspot.co.uk/p/-microbit.html), [Bluetooth SIG](https://www.bluetooth.com)

```package
Bluetooth
```