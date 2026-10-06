# wenn Bluetooth getrennt

## ~hint

![](https://cdn.makecode.com/blob/5479e652051b327fa86ef770a2e277dc72052dd2/static/bluetooth/Bluetooth_SIG.png)

Um einen der Bluetooth-"Dienste" des @boardname@ mit einem anderen Gerät wie einem Smartphone zu nutzen, muss es zunächst [mit dem @boardname@ gekoppelt werden](/reference/bluetooth/bluetooth-pairing). Nach dem Koppeln kann das andere Gerät eine Verbindung zum @boardname@ herstellen und Daten über viele der @boardname@-Funktionen austauschen.

## ~

Dieser Block startet einen [Ereignishandler,](/reference/event-handler) der in dem Fall ausgeführt wird, wenn ein Gerät, das über Bluetooth mit deinem @boardname@ verbunden ist, getrennt wird.

Mit diesem Event-Handler kannst du den Buchstaben "D" auf der LED-Matrix des @boardname@ anzeigen, damit du weisst, dass die Bluetooth-Verbindung geschlossen wurde.

```sig
bluetooth.onBluetoothDisconnected(() => {
});
```

## Beispiel: Anzeige von "D", wenn eine Bluetooth-Verbindung mit dem @boardname@ beendet wurde

```blocks
bluetooth.onBluetoothDisconnected(() => {
    basic.showString("D");
});
```

## 



## Siehe auch

[Über Bluetooth](/reference/bluetooth/about-bluetooth), [@boardname@ Bluetooth-Profilübersicht ](http://lancaster-university.github.io/microbit-docs/ble/profile/), [@boardname@ Bluetooth-Profil-Referenz](http://lancaster-university.github.io/microbit-docs/resources/bluetooth/microbit-profile-V1.9-Level-2.pdf), [Bluetooth auf @boardname@ Ressourcen](http://bluetooth-mdw.blogspot.co.uk/p/-microbit.html), [Bluetooth SIG](https://www.bluetooth.com)

```package
Bluetooth
```