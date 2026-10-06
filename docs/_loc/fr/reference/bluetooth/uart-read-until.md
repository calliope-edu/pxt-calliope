# Lecture UART

## ~indice

![](https://cdn.makecode.com/blob/5479e652051b327fa86ef770a2e277dc72052dd2/static/bluetooth/Bluetooth_SIG.png)

Pour qu'un autre appareil, comme un smartphone, puisse utiliser l'un des "services" Bluetooth dont dispose le @boardname@, il doit d'abord être [couplé avec le @boardname@](/reference/bluetooth/bluetooth-pairing). Une fois couplé, l'autre appareil peut se connecter au @boardname@ et échanger des données relatives à de nombreuses fonctionnalités du @boardname@.

## ~

Le [service UART Bluetooth](/reference/bluetooth/start-uart-service) permet à un autre appareil comme un smartphone d'échanger toutes les données qu'il souhaite avec le @boardname@, en petits morceaux.

Lorsque le service UART Bluetooth s'exécute, ce bloc permet au @boardname@ de lire des données qui ont été reçues depuis un appareil connecté en Bluetooth, en arrêtant la lecture et en retournant la valeur obtenue dès qu'un caractère délimiteur précis est rencontré. Ce qui signifie que les appareils connectés peuvent envoyer des données au @boardname@ et indiquer que le message complet a été envoyé en ajoutant au message le caractère du délimiteur.

```sig
bluetooth.uartReadUntil("");
```

## Exemple: démarrage du service UART Bluetooth puis lecture des données reçues depuis un autre appareil qui se terminent par le caractère ":" puis affichage des données

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

## Vidéo - jeu de devinettes avec le service UART

https://www.youtube.com/watch?v=PgGeWddMAZ0

## Avancé

Pour des informations plus avancées sur le service UART Bluetooth du @boardname@ incluant les informations sur l'utilisation d'un smartphone, consultez la [documentation technique d'exécution du @boardname@ à l'Université de Lancaster](http://lancaster-university.github.io/microbit-docs/ble/uart-service/)

## Voir Aussi

[About Bluetooth](/reference/bluetooth/about-bluetooth), [@boardname@ Bluetooth profile overview ](http://lancaster-university.github.io/microbit-docs/ble/profile/), [@boardname@ Bluetooth profile reference](http://lancaster-university.github.io/microbit-docs/resources/bluetooth/microbit-profile-V1.9-Level-2.pdf), [Bluetooth on @boardname@ resources](http://bluetooth-mdw.blogspot.co.uk/p/-microbit.html), [Bluetooth SIG](https://www.bluetooth.com)

```package
bluetooth
```