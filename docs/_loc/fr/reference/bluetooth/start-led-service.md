# Service LED Bluetooth

## ~indice

![](https://cdn.makecode.com/blob/5479e652051b327fa86ef770a2e277dc72052dd2/static/bluetooth/Bluetooth_SIG.png)

Pour qu'un autre appareil, comme un smartphone, puisse utiliser l'un des "services" Bluetooth dont dispose le @boardname@, il doit d'abord être [couplé avec le @boardname@](/reference/bluetooth/bluetooth-pairing). Une fois couplé, l'autre appareil peut se connecter au @boardname@ et échanger des données relatives à de nombreuses fonctionnalités du @boardname@.

## ~

Le service LED Bluetooth permet à un autre appareil tel qu'un smartphone d'envoyer de courtes chaînes de caractères ou des motifs via une connexion Bluetooth sur un @boardname@ pour l'afficher sur sa matrice de LEDs. Le texte défilera sur le @boardname@ et la vitesse de défilement peut aussi être contrôlée en utilisant le service LED Bluetooth. Les appareils utilisant le service LED peuvent aussi lire l'état actuel de la matrice de LEDS du @boardname@.

Vous pouvez par exemple dessiner un smiley avec une appli sur votre smartphone et lorsque vous appuyez sur un bouton, il apparait comme par magie sur votre @boardname@ de l'autre côté de la pièce. Ou vous pouvez programmer votre smartphone pour envoyer un message à votre @boardname@ à chaque fois que vous recevez un email, un SMS, ou une notification sur les réseaux sociaux, de telle sorte que vous pouvez porter votre @boardname@ comme une montre connectée et laisser votre téléphone dans votre sac.

Aucun code supplémentaire n'est nécessaire sur le @boardname@ pour utiliser le service LED Bluetooth depuis un autre appareil.

```sig
bluetooth.startLEDService();
```

## Exemple : démarrage du service LED Bluetooth

Le code suivant montre le démarrage du service LED Bluetooth :

```blocks
bluetooth.startLEDService();
```

## Vidéo - démo du service de LED - démarre à 2:00

http://www.youtube.com/watch?v=aep_GVowKfs

## Avancé

Pour des informations plus avancées sur le service LED Bluetooth du @boardname@ incluant les informations sur l'utilisation d'un smartphone, consultez la [documentation technique d'exécution du @boardname@ à l'Université de Lancaster](http://lancaster-university.github.io/microbit-docs/ble/led-service/)

## Voir Aussi

[About Bluetooth](/reference/bluetooth/about-bluetooth), [@boardname@ Bluetooth profile overview ](http://lancaster-university.github.io/microbit-docs/ble/profile/), [@boardname@ Bluetooth profile reference](http://lancaster-university.github.io/microbit-docs/resources/bluetooth/microbit-profile-V1.9-Level-2.pdf), [Bluetooth on @boardname@ resources](http://bluetooth-mdw.blogspot.co.uk/p/-microbit.html), [Bluetooth SIG](https://www.bluetooth.com)

```package
bluetooth
```