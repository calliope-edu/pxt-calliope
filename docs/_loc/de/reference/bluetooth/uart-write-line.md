# UART-Zeile schreiben

## ~hint
![](https://cdn.makecode.com/blob/5479e652051b327fa86ef770a2e277dc72052dd2/static/bluetooth/Bluetooth_SIG.png)

Um einen der Bluetooth-"Dienste" des @boardname@ mit einem anderen Gerät wie einem Smartphone zu nutzen, muss es zunächst [mit dem @boardname@ gekoppelt werden](/reference/bluetooth/bluetooth-pairing). Nach dem Koppeln kann das andere Gerät eine Verbindung zum @boardname@ herstellen und Daten über viele der @boardname@-Funktionen austauschen.

## ~

Der [Bluetooth UART-Dienst](/reference/bluetooth/start-uart-service) ermöglicht es einem anderen Gerät wie einem Smartphone, beliebige Daten in kleinen Stücken mit dem @boardname@ auszutauschen.

Mit dem laufenden Bluetooth UART-Dienst ermöglicht dieser Block einem @boardname@, eine Zeile Text an ein über Bluetooth verbundenes Gerät zu senden.

```sig
bluetooth.uartWriteLine("");
```

## Beispiel: Den Bluetooth UART-Dienst starten und dann "HELLO" senden, wann immer die Taste A gedrückt wird und ein anderes Gerät über Bluetooth verbunden ist

```blocks
let connected = 0;
bluetooth.onBluetoothConnected(() => {
    basic.showString("C");
    connected = 1;
});
bluetooth.onBluetoothDisconnected(() => {
    basic.showString("D");
    connected = 0;
});
input.onButtonEvent(Button.A, input.buttonEventValue(ButtonEvent.Down), () => {
    if (connected == 1) {
        bluetooth.uartWriteLine("HELLO");
    }
});
```

## Video - UART-Dienst Ratespiel

https://www.youtube.com/watch?v=PgGeWddMAZ0

## Fortgeschritten

Weiterführende Informationen zum @boardname@ Bluetooth UART-Dienst, einschließlich Informationen zur Verwendung eines Smartphones, finden Sie in der [@boardname@ technischen runtime Dokumentation der Lancaster Universität](http://lancaster-university.github.io/microbit-docs/ble/uart-service/)

## Siehe auch

[About Bluetooth](/reference/bluetooth/about-bluetooth), [@boardname@ Bluetooth profile overview ](http://lancaster-university.github.io/microbit-docs/ble/profile/), [@boardname@ Bluetooth profile reference](http://lancaster-university.github.io/microbit-docs/resources/bluetooth/microbit-profile-V1.9-Level-2.pdf),  [Bluetooth on @boardname@ resources](http://bluetooth-mdw.blogspot.co.uk/p/-microbit.html), [Bluetooth SIG](https://www.bluetooth.com)

```package
Bluetooth
```