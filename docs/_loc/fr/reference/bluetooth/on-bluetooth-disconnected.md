# En cas de déconnexion Bluetooth

## ~indice

![](https://cdn.makecode.com/blob/5479e652051b327fa86ef770a2e277dc72052dd2/static/bluetooth/Bluetooth_SIG.png)

Pour qu'un autre appareil, comme un smartphone, puisse utiliser l'un des "services" Bluetooth dont dispose le @boardname@, il doit d'abord être [couplé avec le @boardname@](/reference/bluetooth/bluetooth-pairing). Une fois couplé, l'autre appareil peut se connecter au @boardname@ et échanger des données relatives à de nombreuses fonctionnalités du @boardname@.

## ~

Ce bloc démarre un [gestionnaire d'événement](/reference/event-handler) qui dans ce cas s'exécutera lorsqu'un appareil connecté à votre @boardname@ en utilisant le Bluetooth se déconnecte.

Vous pourriez utiliser ce gestionnaire d'événement pour afficher une lettre "D" sur la grille LED du @boardname@ de telle sorte que vous sachiez que vous avez terminé une connexion Bluetooth.

```sig
bluetooth.onBluetoothDisconnected(() => {
});
```

## Exemple: Afficher "D" quand une connexion Bluetooth avec le @boardname@ est fermée

```blocks
bluetooth.onBluetoothDisconnected(() => {
    basic.showString("D");
});
```

## Vidéo - en cas de déconnexion Bluetooth

http://www.youtube.com/watch?v=HyBcsD9Eh6I

## Voir Aussi

[About Bluetooth](/reference/bluetooth/about-bluetooth), [@boardname@ Bluetooth profile overview ](http://lancaster-university.github.io/microbit-docs/ble/profile/), [@boardname@ Bluetooth profile reference](http://lancaster-university.github.io/microbit-docs/resources/bluetooth/microbit-profile-V1.9-Level-2.pdf), [Bluetooth on @boardname@ resources](http://bluetooth-mdw.blogspot.co.uk/p/-microbit.html), [Bluetooth SIG](https://www.bluetooth.com)

```package
bluetooth
```