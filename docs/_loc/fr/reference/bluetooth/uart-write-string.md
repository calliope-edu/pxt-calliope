# Ecriture de chaînes UART

## ~indice

![](https://cdn.makecode.com/blob/5479e652051b327fa86ef770a2e277dc72052dd2/static/bluetooth/Bluetooth_SIG.png)

Pour qu'un autre appareil, comme un smartphone, puisse utiliser l'un des "services" Bluetooth dont dispose le @boardname@, il doit d'abord être [couplé avec le @boardname@](/reference/bluetooth/bluetooth-pairing). Une fois couplé, l'autre appareil peut se connecter au @boardname@ et échanger des données relatives à de nombreuses fonctionnalités du @boardname@.

## ~

Le [service UART Bluetooth](/reference/bluetooth/start-uart-service) permet à un autre appareil comme un smartphone d'échanger toutes les données qu'il souhaite avec le @boardname@, en petits morceaux.

Avec le service UART Bluetooth en cours d'exécution, ce bloc permet au @boardname@ d'envoyer des données à un appareil connecté en Bluetooth.

```sig
bluetooth.uartWriteString("");
```

## Exemple : démarrage du service UART Bluetooth puis envoi de "HELLO" à chaque fois que le bouton A est pressé et qu'un autre appareil est connecté via Bluetooth

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
        bluetooth.uartWriteString("HELLO");
    }
});
```

## Vidéo - jeu de devinettes avec le service UART

https://www.youtube.com/watch?v=PgGeWddMAZ0

## Avancé

Pour des informations plus avancées sur le service UART Bluetooth du @boardname@ incluant les informations sur l'utilisation d'un smartphone, consultez la [documentation technique d'exécution du @boardname@ à l'Université de Lancaster](http://lancaster-university.github.io/microbit-docs/ble/uart-service/)

## Voir Aussi

[About Bluetooth](/reference/bluetooth/about-bluetooth), [@boardname@ Bluetooth profile overview ](http://lancaster-university.github.io/microbit-docs/ble/profile/), [@boardname@ Bluetooth profile reference](http://lancaster-university.github.io/microbit-docs/resources/bluetooth/microbit-profile-V1.9-Level-2.pdf), [Bluetooth on @boardname@ resources](http://bluetooth-mdw.blogspot.co.uk/p/-microbit.html), [Bluetooth SIG](https://www.bluetooth.com)

```package
bluetooth
```