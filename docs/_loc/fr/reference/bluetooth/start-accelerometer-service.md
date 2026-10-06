# Service d'accéléromètre Bluetooth

## ~indice

![](https://cdn.makecode.com/blob/5479e652051b327fa86ef770a2e277dc72052dd2/static/bluetooth/Bluetooth_SIG.png)

Pour qu'un autre appareil, comme un smartphone, puisse utiliser l'un des "services" Bluetooth dont dispose le @boardname@, il doit d'abord être [couplé avec le @boardname@](/reference/bluetooth/bluetooth-pairing). Une fois couplé, l'autre appareil peut se connecter au @boardname@ et échanger des données relatives à de nombreuses fonctionnalités du @boardname@.

## ~

Le service d'accéléromètre Bluetooth permet à un autre appareil tel qu'un smartphone de recevoir à distance les données de l'accéléromètre du @boardname@. Un accéléromètre détecte le mouvement. Plus précisément, il mesure l'accélération dans une ou plusieurs des trois directions que nous appelons X, Y et Z.

En utilisant le service d'accéléromètre Bluetooth vous pouvez, par exemple, créer une application smartphone qui émet un bruit fort à chaque fois que votre @boardname@ (ou bien la chose importante que vous avez attaché dessus) est déplacé. Ou vous pouvez utiliser votre @boardname@ pour contrôler le mouvement d'un personnage animé dans un jeu sur votre smartphone simplement en inclinant le @boardname@ dans la direction vers laquelle vous voulez déplacer votre personnage.

Aucun code supplémentaire n'est nécessaire sur le @boardname@ pour utiliser le service d'accéléromètre Bluetooth depuis un autre appareil.

```sig
bluetooth.startAccelerometerService();
```

## Exemple : démarrage du service d'accéléromètre Bluetooth

Le code suivant montre le démarrage du service d'accéléromètre Bluetooth :

```blocks
bluetooth.startAccelerometerService();
```

## Vidéo - démo du service d'accéléromètre - démarre à 0:18

http://www.youtube.com/watch?v=aep_GVowKfs#t=18s

## Avancé

Pour des informations plus avancées sur le service d'accéléromètre Bluetooth du @boardname@ incluant les informations sur l'utilisation d'un smartphone, consultez la [documentation technique d'exécution du @boardname@ à l'Université de Lancaster](http://lancaster-university.github.io/microbit-docs/ble/accelerometer-service/)

## Voir Aussi

[About Bluetooth](/reference/bluetooth/about-bluetooth), [@boardname@ Bluetooth profile overview ](http://lancaster-university.github.io/microbit-docs/ble/profile/), [@boardname@ Bluetooth profile reference](http://lancaster-university.github.io/microbit-docs/resources/bluetooth/microbit-profile-V1.9-Level-2.pdf), [Bluetooth on @boardname@ resources](http://bluetooth-mdw.blogspot.co.uk/p/-microbit.html), [Bluetooth SIG](https://www.bluetooth.com)

```package
bluetooth
```