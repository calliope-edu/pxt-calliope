# Service de broche E/S Bluetooth

## ~indice

![](https://cdn.makecode.com/blob/5479e652051b327fa86ef770a2e277dc72052dd2/static/bluetooth/Bluetooth_SIG.png)

Pour qu'un autre appareil, comme un smartphone, puisse utiliser l'un des "services" Bluetooth dont dispose le @boardname@, il doit d'abord être [couplé avec le @boardname@](/reference/bluetooth/bluetooth-pairing). Une fois couplé, l'autre appareil peut se connecter au @boardname@ et échanger des données relatives à de nombreuses fonctionnalités du @boardname@.

## ~

Le service de broche E/S rend possible la communication depuis un autre appareil tel qu'un smartphone avec d'autres 'objets' électroniques connectées au port d'extension du @boardname@. Vous pouvez par exemple utiliser votre smartphone pour allumer ou éteindre une lumière connectée au @boardname@ ou bien votre smartphone pourrait recevoir les données collectées depuis un capteur connecté au @boardname@. En fait, vous pouvez faire ces deux choses au même moment puisque le service de broche E/S Bluetooth vous laisse interagir avec plusieurs 'broches' sur le port d'extension de manières différentes, en même temps.

Aucun code supplémentaire n'est nécessaire sur le @boardname@ pour utiliser le service de broche E/S Bluetooth depuis un autre appareil.

```sig
bluetooth.startIOPinService();
```

## Exemple : démarrage du service de broche E/S Bluetooth

Le code suivant montre le démarrage du service de borche E/S Bluetooth :

```blocks
bluetooth.startIOPinService();
```

## Vidéo - démo du service de broche E/S - démarre à 3:49

http://www.youtube.com/watch?v=aep_GVowKfs

## Avancé

Pour des informations plus avancées sur le service de broche E/S Bluetooth du @boardname@ incluant les informations sur l'utilisation d'un smartphone, consultez la [documentation technique d'exécution du @boardname@ à l'Université de Lancaster](http://lancaster-university.github.io/microbit-docs/ble/iopin-service/)

## Voir Aussi

[About Bluetooth](/reference/bluetooth/about-bluetooth), [@boardname@ Bluetooth profile overview ](http://lancaster-university.github.io/microbit-docs/ble/profile/), [@boardname@ Bluetooth profile reference](http://lancaster-university.github.io/microbit-docs/resources/bluetooth/microbit-profile-V1.9-Level-2.pdf), [Bluetooth on @boardname@ resources](http://bluetooth-mdw.blogspot.co.uk/p/-microbit.html), [Bluetooth SIG](https://www.bluetooth.com)

```package
bluetooth
```