# Service température Bluetooth

## ~indice

![](https://cdn.makecode.com/blob/5479e652051b327fa86ef770a2e277dc72052dd2/static/bluetooth/Bluetooth_SIG.png)

Pour qu'un autre appareil, comme un smartphone, puisse utiliser l'un des "services" Bluetooth dont dispose le @boardname@, il doit d'abord être [couplé avec le @boardname@](/reference/bluetooth/bluetooth-pairing). Une fois couplé, l'autre appareil peut se connecter au @boardname@ et échanger des données relatives à de nombreuses fonctionnalités du @boardname@.

## ~

Le @boardname@ est capable de fournir une mesure approximative de la température ambiante actuelle. C’est une approximation seulement car en fait la valeur de température est déduite de la température de son processeur principal. Le service température Bluetooth permet à un autre appareil tel qu'un smartphone de connaître sans fil la température relevée actuellement par le @boardname@ ou de recevoir un flux constant des valeurs de la température. Les valeurs de la température sont exprimées en degrés Celsius.

En utilisant le service température Bluetooth, vous pouvez transformer votre smartphone ou tablette en thermomètre graphique en utilisant le capteur de votre @boardname@.

Aucun code supplémentaire n'est nécessaire sur le @boardname@ pour utiliser le service température Bluetooth depuis un autre appareil.

```sig
bluetooth.startTemperatureService();
```

## Exemple : démarrage du service température Bluetooth

Le code suivant montre le démarrage du service température Bluetooth :

```blocks
bluetooth.startTemperatureService();
```

## Vidéo - démo du service température - démarre à 3:05

http://www.youtube.com/watch?v=aep_GVowKfs

## Avancé

Pour des informations plus avancées sur le service température Bluetooth du @boardname@ incluant les informations sur l'utilisation d'un smartphone, consultez la [documentation technique d'exécution du @boardname@ à l'Université de Lancaster](http://lancaster-university.github.io/microbit-docs/ble/temperature-service/)

## Voir Aussi

[About Bluetooth](/reference/bluetooth/about-bluetooth), [@boardname@ Bluetooth profile overview ](http://lancaster-university.github.io/microbit-docs/ble/profile/), [@boardname@ Bluetooth profile reference](http://lancaster-university.github.io/microbit-docs/resources/bluetooth/microbit-profile-V1.9-Level-2.pdf), [Bluetooth on @boardname@ resources](http://bluetooth-mdw.blogspot.co.uk/p/-microbit.html), [Bluetooth SIG](https://www.bluetooth.com)

```package
bluetooth
```