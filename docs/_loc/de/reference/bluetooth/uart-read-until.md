# UART Lesen

## ~hint

![](https://cdn.makecode.com/blob/5479e652051b327fa86ef770a2e277dc72052dd2/static/bluetooth/Bluetooth_SIG.png)

Um einen der Bluetooth-"Dienste" des @boardname@ mit einem anderen Gerät wie einem Smartphone zu nutzen, muss es zunächst [mit dem @boardname@ gekoppelt werden](/reference/bluetooth/bluetooth-pairing). Nach dem Koppeln kann das andere Gerät eine Verbindung zum @boardname@ herstellen und Daten über viele der @boardname@-Funktionen austauschen.

## ~

Der [Bluetooth UART-Dienst](/reference/bluetooth/start-uart-service) ermöglicht es einem anderen Gerät, z. B. einem Smartphone, beliebige Daten mit dem @boardname@ in kleinen Blöcken auszutauschen.

Wenn der Bluetooth-UART-Dienst läuft, erlaubt dieser Block einem @boardname@ Daten zu lesen, die von einem Bluetooth-verbundenen Gerät empfangen wurden, das Lesen zu beenden und den erhaltenen Wert zurückzugeben, sobald ein spezifiziertes Trennzeichen aufgetreten ist. Das bedeutet, dass angeschlossene Geräte Daten an den @boardname@ senden können und angeben, dass die vollständige Nachricht gesendet wurde, indem sie der Nachricht ein Trennzeichen anhängen.

```sig
bluetooth.uartReadUntil("");
```

## Beispiel: Starten des Bluetooth-UART-Dienstes und lesen der von einem anderen Gerät empfangenen Daten, welche mit dem ":" Zeichen beendet und dann angezeigt werden

```blocks
let uartData = "";
let connected = 0;
basic.showString("UART");
bluetooth.onBluetoothConnected(() => {
    basic.showString("C");
    connected = 1;
    while (connected == 1) {
        uartData = bluetooth.uartReadUntil(":");
        basic.showString(uartData);
    }
});
bluetooth.onBluetoothDisconnected(() => {
    basic.showString("D");
});

```

## Video - UART Service Ratespiel

https://www.youtube.com/watch?v=PgGeWddMAZ0

## Fortgeschritten

Weiterführende Informationen zum @boardname@ Bluetooth UART-Dienst, einschließlich Informationen zur Verwendung eines Smartphones, finden Sie in der [@boardname@ technischen Dokumentation der Universität Lancaster](http://lancaster-university.github.io/microbit-docs/ble/uart-service/)

## Siehe auch

[Über Bluetooth](/reference/bluetooth/about-bluetooth), [@boardname@ Bluetooth-Profilübersicht ](http://lancaster-university.github.io/microbit-docs/ble/profile/), [@boardname@ Bluetooth-Profil-Referenz](http://lancaster-university.github.io/microbit-docs/resources/bluetooth/microbit-profile-V1.9-Level-2.pdf), [Bluetooth auf @boardname@ Ressourcen](http://bluetooth-mdw.blogspot.co.uk/p/-microbit.html), [Bluetooth SIG](https://www.bluetooth.com)

```package
Bluetooth
```