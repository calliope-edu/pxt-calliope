# Ecriture ligne UART

## ~indice
![](https://cdn.makecode.com/blob/5479e652051b327fa86ef770a2e277dc72052dd2/static/bluetooth/Bluetooth_SIG.png)

For another device like a smartphone to use any of the Bluetooth "services" which the @boardname@ has, it must first be [paired with the @boardname@](/reference/bluetooth/bluetooth-pairing). Once paired, the other device may connect to the @boardname@ and exchange data relating to many of the @boardname@'s features.

## ~

Le [service UART Bluetooth](/reference/bluetooth/start-uart-service) permet à un autre appareil comme un smartphone d'échanger toutes les données qu'il souhaite avec le @boardname@, en petits morceaux.

Avec le service UART Bluetooth en cours d'exécution, ce bloc permet au @boardname@ d'envoyer une ligne de texte à un appareil connecté en Bluetooth.

```sig
bluetooth.uartWriteLine("");
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
        bluetooth.uartWriteLine("HELLO");
    }
});
```

## Vidéo - jeu de devinettes avec le service UART

https://www.youtube.com/watch?v=PgGeWddMAZ0

## Avancé

Pour des informations plus avancées sur le service UART Bluetooth du @boardname@ incluant les informations sur l'utilisation d'un smartphone, consultez la [documentation technique d'exécution du @boardname@ à l'Université de Lancaster](http://lancaster-university.github.io/microbit-docs/ble/uart-service/)

## Voir Aussi

[About Bluetooth](/reference/bluetooth/about-bluetooth), [@boardname@ Bluetooth profile overview ](http://lancaster-university.github.io/microbit-docs/ble/profile/), [@boardname@ Bluetooth profile reference](http://lancaster-university.github.io/microbit-docs/resources/bluetooth/microbit-profile-V1.9-Level-2.pdf),  [Bluetooth on @boardname@ resources](http://bluetooth-mdw.blogspot.co.uk/p/-microbit.html), [Bluetooth SIG](https://www.bluetooth.com)

```package
bluetooth
```