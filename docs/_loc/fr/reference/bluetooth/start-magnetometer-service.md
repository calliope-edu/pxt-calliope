# Service magnétomètre Bluetooth

## ~indice

![](https://cdn.makecode.com/blob/5479e652051b327fa86ef770a2e277dc72052dd2/static/bluetooth/Bluetooth_SIG.png)

Pour qu'un autre appareil, comme un smartphone, puisse utiliser l'un des "services" Bluetooth dont dispose le @boardname@, il doit d'abord être [couplé avec le @boardname@](/reference/bluetooth/bluetooth-pairing). Une fois couplé, l'autre appareil peut se connecter au @boardname@ et échanger des données relatives à de nombreuses fonctionnalités du @boardname@.

## ~

Le service magnétomètre Bluetooth permet à un autre appareil tel qu'un smartphone de recevoir à distance les données du magnétomètre du @boardname@. Le magnétomètre mesure la force et la direction des champs magnétiques, y compris ceux de la Terre. Il peut donc être utilisé comme une boussole numérique et indiquer où le @boardname@ pointe par rapport au nord magnétique.

En utilisant le service magnétomètre Bluetooth, vous pouvez, par exemple, créer une application pour smartphone qui affiche la direction dans laquelle vous vous déplacez, et la mettre à jour en temps réel.

Aucun code supplémentaire n'est nécessaire sur le @boardname@ pour utiliser le service magnétomètre Bluetooth depuis un autre appareil.

```sig
bluetooth.startMagnetometerService();
```

## Exemple : démarrage du service magnétomètre Bluetooth

Le code suivant montre le démarrage du service magnétomètre Bluetooth :

```blocks
bluetooth.startMagnetometerService();
```

## Vidéo - Démo du service Magnetomètre

http://www.youtube.com/watch?v=C_0VL4Gp4_U

## Avancé

Pour des informations plus avancées sur le service magnétomètre Bluetooth du @boardname@ incluant les informations sur l'utilisation d'un smartphone, consultez la [documentation technique d'exécution du @boardname@ à l'Université de Lancaster](http://lancaster-university.github.io/microbit-docs/ble/magnetometer-service/)

## Voir Aussi

[About Bluetooth](/reference/bluetooth/about-bluetooth), [@boardname@ Bluetooth profile overview ](http://lancaster-university.github.io/microbit-docs/ble/profile/), [@boardname@ Bluetooth profile reference](http://lancaster-university.github.io/microbit-docs/resources/bluetooth/microbit-profile-V1.9-Level-2.pdf), [Bluetooth on @boardname@ resources](http://bluetooth-mdw.blogspot.co.uk/p/-microbit.html), [Bluetooth SIG](https://www.bluetooth.com)

```package
bluetooth
```