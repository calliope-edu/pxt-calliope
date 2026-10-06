# Service bouton Bluetooth

## ~indice

![](https://cdn.makecode.com/blob/5479e652051b327fa86ef770a2e277dc72052dd2/static/bluetooth/Bluetooth_SIG.png)

Pour qu'un autre appareil, comme un smartphone, puisse utiliser l'un des "services" Bluetooth dont dispose le @boardname@, il doit d'abord être [couplé avec le @boardname@](/reference/bluetooth/bluetooth-pairing). Une fois couplé, l'autre appareil peut se connecter au @boardname@ et échanger des données relatives à de nombreuses fonctionnalités du @boardname@.

## ~

Le service de bouton Bluetooth permet à un autre appareil tel qu’un smartphone soit notifié sans fil à chaque fois qu’un bouton à l’avant d’un @boardname@ est enfoncé. Chacun des deux boutons du @boardname@ peut être dans trois états différents :

* Non appuyé
* Appuyé
* Appui long - appuyé et maintenu appuyé pendant au moins 2 secondes 

Le service de boutons vous permet de faire en sorte que d’autres éléments connectés à votre @boardname@ à l’aide de Bluetooth répondent d’une manière ou d’une autre lorsque vous appuyez sur l’un des boutons. Vous pouvez par exemple cacher votre smartphone quelque part dans la pièce et lui faire jouer un bruit amusant quand vous appuyez sur l'un des boutons de votre @boardname@. On vous laisse choisir ce qui serait amusant.

Aucun code supplémentaire n'est nécessaire sur le @boardname@ pour utiliser le service bouton Bluetooth depuis un autre appareil.

```sig
bluetooth.startButtonService();
```

## Exemple : démarrage du service bouton Bluetooth

Le code suivant montre le démarrage du service bouton Bluetooth :

```blocks
bluetooth.startButtonService();
```

## Vidéo - démo du service bouton - démarre à 0:59

http://www.youtube.com/watch?v=aep_GVowKfs

## Avancé

Pour des informations plus avancées sur le service bouton Bluetooth du @boardname@ incluant les informations sur l'utilisation d'un smartphone, consultez la [documentation technique d'exécution du @boardname@ à l'Université de Lancaster](http://lancaster-university.github.io/microbit-docs/ble/button-service/)

## Voir Aussi

[About Bluetooth](/reference/bluetooth/about-bluetooth), [@boardname@ Bluetooth profile overview ](http://lancaster-university.github.io/microbit-docs/ble/profile/), [@boardname@ Bluetooth profile reference](http://lancaster-university.github.io/microbit-docs/resources/bluetooth/microbit-profile-V1.9-Level-2.pdf), [Bluetooth on @boardname@ resources](http://bluetooth-mdw.blogspot.co.uk/p/-microbit.html), [Bluetooth SIG](https://www.bluetooth.com)

```package
bluetooth
```