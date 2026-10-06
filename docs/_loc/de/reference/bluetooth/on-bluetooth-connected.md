# Wenn Bluetooth verbunden

## ~hint

![](https://cdn.makecode.com/blob/5479e652051b327fa86ef770a2e277dc72052dd2/static/bluetooth/Bluetooth_SIG.png)

Um einen der Bluetooth-"Dienste" des @boardname@ mit einem anderen Gerät wie einem Smartphone zu nutzen, muss es zunächst [mit dem @boardname@ gekoppelt werden](/reference/bluetooth/bluetooth-pairing). Nach dem Koppeln kann das andere Gerät eine Verbindung zum @boardname@ herstellen und Daten über viele der @boardname@-Funktionen austauschen.

## ~

Dieser Block startet einen [event handler](/reference/event-handler) welcher in dem Fall ausgeführt wird, wenn sich etwas mit deinem @boardname@ über Bluetooth verbindet.

```sig
bluetooth.onBluetoothConnected(() => {});
```

## Beispiel

Du kannst diesen Event-Handler verwenden, um einen Buchstaben "C" auf dem @boardname@ LED-Display anzuzeigen, damit du weisst, dass du eine Bluetooth-Verbindung hast. Oder du möchtest einige Daten an dein Smartphone schicken, sobald es sich mit deinem @boardname@ verbindet. Vielleicht hast du den Beschleunigungsmesser in deinem @boardname@ benutzt, um zum Beispiel deine Schritte zu zählen. Mit diesem Ereignis-Handler kannst du die bis dahin gezählte Schrittanzahl an dein Telefon senden, wenn eine Bluetooth-Verbindung aufgebaut wird.

```blocks
bluetooth.onBluetoothConnected(() => {
    basic.showString("C");
});
```

## Video - wenn Bluetooth verbunden

http://www.youtube.com/watch?v=HyBcsD9Eh6I

## Siehe auch

[Über Bluetooth](/reference/bluetooth/about-bluetooth), [@boardname@ Bluetooth-Profilübersicht ](http://lancaster-university.github.io/microbit-docs/ble/profile/), [@boardname@ Bluetooth-Profil-Referenz](http://lancaster-university.github.io/microbit-docs/resources/bluetooth/microbit-profile-V1.9-Level-2.pdf), [Bluetooth auf @boardname@ Ressourcen](http://bluetooth-mdw.blogspot.co.uk/p/-microbit.html), [Bluetooth SIG](https://www.bluetooth.com)

```package
Bluetooth
```