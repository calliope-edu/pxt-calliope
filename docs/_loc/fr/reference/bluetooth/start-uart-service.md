# Service UART Bluetooth

## ~indice

![](https://cdn.makecode.com/blob/5479e652051b327fa86ef770a2e277dc72052dd2/static/bluetooth/Bluetooth_SIG.png)

Pour qu'un autre appareil, comme un smartphone, puisse utiliser l'un des "services" Bluetooth dont dispose le @boardname@, il doit d'abord être [couplé avec le @boardname@](/reference/bluetooth/bluetooth-pairing). Une fois couplé, l'autre appareil peut se connecter au @boardname@ et échanger des données relatives à de nombreuses fonctionnalités du @boardname@.

## ~

Le service UART Bluetooth permet à un autre appareil comme un smartphone d'échanger toutes les données qu'il souhaite avec le @boardname@ en petits morceaux destinés à être réassemblés. [UART](https://en.wikipedia.org/wiki/Universal_asynchronous_receiver/transmitter) est l'abréviation pour Emetteur Récepteur Asynchrone Universel, c'est l'un des moyens par lequel les communications de données sérielles sont effectuées, généralement entre deux périphériques connectés par une connexion physique filaire. Le service Bluetooth UART émule ce comportement d'un système physique UART et permet l'échange de 20 octets de données maximum à un instant donné, dans l'une ou l'autre direction.

Lorsque ce service est utilisé, le @boardname@ configure un tampon de 60 octets et les données qu'il reçoit sont accumulées dans ce tampon jusqu'à ce qu'il soit plein. Lors de l'utilisation du service UART depuis le code de votre @boardname@, vous pouvez indiquer un caractère spécial qui sera utilisé pour signifier que le message, divisé en 3 morceaux au plus, a maintenant été entièrement envoyé par l'autre appareil connecté, ce qui libérera intégralement le contenu du tampon du @boardname@ pour tout code essayant de le lire. En d'autres termes ce caractère spécial, connu sous le nom de 'délimiteur' est utilisé par l'appareil connecté au @boardname@ pour signifier "J'ai fini d'envoyer mon message, tu peux maintenant l'utiliser".

Vous pouvez utiliser le service UART pour plein de choses. Le contenu que vous placez dans les messages importe peu, c'est ce qui le rend très flexible. Vous pouvez créer un jeu de devinettes, les questions et réponses passant entre le @boardname@ et votre smartphone, ou vous pouvez connecter une caméra au @boardname@ et faire transiter l'image obtenue depuis le port d'extension en petits morceaux via Bluetooth sur votre smartphone. Il y a de nombreuses et grandes possibilités.

Pour utiliser le service UART Bluetooth depuis un autre appareil vous avez besoin d'un code supplémentaire sur le @boardname@ qui lit et utilise les données du tampon UART et/ou écrit des données dans le tampon pour une transmission via Bluetooth à d'autres appareils.

```sig
bluetooth.startUartService();
```

## Exemple : démarrage du service UART Bluetooth

Le code suivant montre le démarrage du service UART Bluetooth :

```blocks
bluetooth.startUartService();
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