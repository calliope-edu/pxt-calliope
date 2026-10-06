# À propos du Bluetooth

![](https://cdn.makecode.com/blob/5479e652051b327fa86ef770a2e277dc72052dd2/static/bluetooth/Bluetooth_SIG.png)

## Introduction

Le Bluetooth est une technologie de communication sans fil qui permet à des appareils de communiquer entre eux sans avoir besoin d'un dispositif central comme un routeur ou un point d'accès.

Le Bluetooth dispose d'une caractéristique spéciale "basse énergie" qui signifie qu'il peut être utilisé sans nécessiter trop de consommation de la part des appareils qui s'en servent. C'est cette caractéristique basse énergie Bluetooth que le @boardname@ utilise.

Dans le monde de la basse énergie Bluetooth, un appareil dispose d'un "profil" qui définit la façon dont les autres appareils sont capables de communiquer avec lui via Bluetooth. D'une certaine façon, le profil Bluetooth définit la façon dont un appareil apparait aux autres appareils en terme de fonctionnalités et de choses qu'il peut faire.

Pour le dire autrement, un profil Bluetooth est en fait une spécification d'interface. Il définit les données dont dispose un appareil, ce qu'un autre appareil peut en faire via une connexion Bluetooth et comment l'appareil avec le profil doit répondre lorsqu'un appareil connecté agit sur ses données d'une certaine façon. Examinons cette description un peu plus en détail techniquement.

## Concepts de base

Un appareil Bluetooth contient une table de données appelée table d'attributs qui peut être accédée par d'autres appareils connectés de plusieurs manières possibles. Cette table de données et les manières dont elle peut être exploitée rentre dans un domaine technique du Bluetooth appelé le profil d'attributs génériques, résumé en "GATT" et vous pourrez voir le terme GATT dans certaines documentations ou API telles que celles fournies par la plate-forme Android.

La table d'attributs contient quelque chose comme une série d'enregistrements de divers types. Les principaux types sont appelés les Services, les Caractéristiques et les Descripteurs. Voyons ces termes chacun leur tour.

## Attributs

Services, Caractéristiques et Descripteurs sont tous des types d'attributs. D'où le nom de profil d'attributs génériques, de table d'attributs et de quelque chose appelé le protocole d'attributs. Tous les attributs ont un type identifié par un UUID (Identificateur Universel Unique). Certains attributs sont définis par le SIG Bluetooth, le corps des standards techniques du Bluetooth et ceux-ci ont des UUIDs de 16 bits de longueur. Certains attributs sont conçus sur mesure pour un appareil particulier par l'équipe du produit et ceux-ci ont des UUIDs de 128 bits. Le @boardname@ utilise un mélange d'UUID de 16 et 128 bits.

## Structure

Les services, caractéristiques et descripteurs sont organisés en hiérarchie avec les services en haut et les descripteurs en bas. Les services contiennent une ou plusieurs caractéristiques. Une caractéristique possède aucun ou plusieurs descripteurs. Aucun car les descripteurs sont totalement facultatifs alors qu'un service doit contenir au moins une caractéristique.

![](https://cdn.makecode.com/blob/d5171d3a8bddcb5a1b3ff76bdb02b2d73fb89a33/static/bluetooth/gatt_hierarchy.png)

## Services

Un service est un conteneur pour des éléments de données Bluetooth liés logiquement. Ces éléments de données sont en fait appelés des caractéristiques. Un service peut être considéré comme le propriétaire des caractéristiques qui s'y trouvent. Souvent, un service représente une fonctionnalité particulière (par exemple une fonctionnalité matérielle) ou un dispositif comme des boutons ou un capteur spécifique. Un exemple de service défini par le SIG Bluetooth est le service d'information de l'appareil, qui comme le nom le suggère, est un conteneur d'éléments d'informations diverses sur l'appareil telles que le fabricant et le numéro de série. Le @boardname@ dispose de ce service.

## Caractéristiques

Les caractéristiques sont des éléments de données qui sont liés à un état interne en particulier de l'appareil ou peut-être certains états de l'environnement que l'appareil peut mesurer à l'aide de capteurs. Le niveau actuel de batterie est un exemple de donnée d'état interne, alors que la température ambiante pourrait être mesurée avec un capteur. Parfois les caractéristiques représentent des données de configuration, comme la fréquence à laquelle vous souhaitez mesurer quelque chose. Dans tous les cas, la façon dont un appareil présente de telles données aux autres appareils via le Bluetooth se fait en les rendant disponibles en tant que caractéristiques. Un exemple de caractéristique définie par le SIG Bluetooth est la chaîne numéro de série que vous trouverez dans le service d'information de l'appareil.

Les caractéristiques contiennent diverses parties. Elles ont un type, une valeur, des propriétés et des permissions.

Le type est quelque chose que nous avons déjà expliqué ci-dessus, une valeur UUID qui indique quel type particulier de caractéristique est un attribut. La valeur est la valeur associée à l'élément de données d'état.

Les propriétés définissent ce qu'un autre appareil peut faire avec les caractéristiques via Bluetooth en terme d'opérations diverses définies telles que LIRE, ECRIRE, ou NOTIFIER. Lire une caractéristique signifie transférer sa valeur actuelle depuis la table d'attributs à l'appareil connecté en Bluetooth. Ecrire permet à l'appareil connecté de modifier cette valeur dans la table d'état. Les notifications sont un type de message spécial qu'un appareil comme le @boardname@ peut envoyer à un appareil connecté à chaque fois que la valeur associée à une caractéristique change, ou peut-être à intervalle régulier, contrôlé par un minuteur. Toutes les caractéristiques ne supportent pas toutes les opérations. Les propriétés de la caractéristique vous disent quelles opérations sont prises en charge.

Parfois l'appareil aura été programmé pour répondre d'une certaine manière lorsqu'il traite une opération comme lire ou écrire une valeur de la table d'attribut, ainsi les opérations peuvent avoir comme résultat plus qu'un simple transfert de données sur la connexion. Peut-être que changer la valeur d'une caractéristique entraînera une modification de la fréquence d'échantillonnage de l'accéléromètre de l'appareil, par exemple.

Les permissions ont à voir avec la sécurité et décrivent de manière approfondie les conditions de sécurité qui doivent être rencontrées avant de permettre l'accès en lecture ou écriture à une caractéristique.

## Descripteurs

Les descripteurs contiennent des méta-données qui, soit augmentent les détails relatifs à la caractéristique à laquelle appartient le descripteur, soit permettent la configuration d'un comportement impliquant la caractéristique. Les messages de notification sont activés ou désactivés en utilisant un descripteur spécial appelé le descripteur de configuration des caractéristique du client par exemple.

## Profil

Un profil Bluetooth est une spécification qui rassemble toutes les informations nécessaires sur le comportement d'un appareil, la façon dont ses services peuvent être accédés, ses caractéristiques et descripteurs, ses règles de sécurité, limitations de concurrence, et ainsi de suite.

## Architecture Client/Serveur

Lorsqu'une application sur smartphone interagit avec un appareil tel que le @boardname@ via une connexion Bluetooth, nous avons une architecture client/serveur. L'application du téléphone est en général le client GATT et le @boardname@ est en général le serveur GATT. Ils communiquent en utilisant un protocole appelé le protocole d'attribut ou ATT. En tant que développeur de smartphone, vous travaillez avec des API et vous n'avez pas à vous soucier de la formulation des unités de données de protocole ATT et ainsi de suite.

![](https://cdn.makecode.com/blob/7fd212d04222a1d19e38f049f6345e16d22a8d39/static/bluetooth/services_and_GATT.png)

## Découverte de périphérique

Tout ce qui est décrit ci-dessus concerne les appareils qui sont connectés et qui communiquent en tant que client-serveur GATT. Mais il y a une étape qui précède tout ceci lorsque les deux appareils ne sont pas encore connectés. Comment se trouvent-ils et se connectent-ils ? La réponse à cette question est nommée "découverte de périphérique" sous la responsabilité d'une autre partie de l'architecture Bluetooth appelée le Profil d'Accès Générique (GAP).

Dans le GAP, un périphérique se rend public, émettant de petits paquets de données périodiquement. Ces paquets contiennent des informations sur l'appareil se rendant public. Les autres appareils cherchant un périphérique sur lequel se connecter accomplissent quelque chose appelé le balayage, en recevant et traitant les paquets publics et en filtrant ceux qui proviennent d'appareils d'un type sans intérêt. En général, l'utilisateur reçoit des informations sur les périphériques découverts et il sélectionne ensuite celui auquel il veut se connecter. L'appareil qui se rend public est appelé Périphérique Bluetooth alors que celui faisant le balayage est un Central Bluetooth. Le @boardname@ est un périphérique Bluetooth.

Le Bluetooth sur le @boardname@

La documentation complète sur le profil Bluetooth du @boardname@ telle qu'utilisé par cette application peut être trouvée sur le site web de la [documentation de l'Université de Lancaster](http://lancaster-university.github.io/microbit-docs/ble/profile/).

L'accéléromètre du @boardname@ (détecteur de mouvement), le magnétomètre (boussole numérique), les deux boutons en façade, l'affichage LED, les broches IO du connecteur edge, le bus de message interne et le capteur de température interne sont tous exposés comme Services de telle sorte que des applications peuvent exploiter les fonctionnalités de cet appareil. De plus :

* le service d'information de l'appareil défini par le SIG Bluetooth est inclus afin de permettre aux applications d'obtenir des informations comme les détails de la version du firmware via Bluetooth
* il existe un service de mise à jour du firmware de l'appareil (FDU) qui permet de flasher du nouveau code @boardname@ sur le périphérique via Bluetooth plutôt que par USB
* il y a un service UART qui permet d'échanger des données arbitraires avec le @boardname@ d'une façon qui ressemble à une communication série traditionnelle.

Tout ce que vous pouvez faire avec le @boardname@ en Bluetooth est accompli via des opérations lire, écrire, et notifier. Toutes les caractéristiques ne supportent pas ces trois opérations, veuillez consulter la documentation. Il y a souvent des caractéristiques dont le but est de vous permettre d'écrire des valeurs de configuration qui contrôlent d'autres comportements. Techniquement, on les appelle Points de Contrôle. Par exemple, vous pouvez préciser à quelle fréquence les données d'échantillonnage de l'accéléromètre seront transmises comme message de notification à votre application.

## Vous voulez en savoir plus ?

Le site web du Bluetooth SIG à l'adresse http://www.bluetooth.com est un bon endroit pour avoir plus d'information sur le Bluetooth en général. Vous y trouverez tous les profils SIG définis, les services, caractéristiques et descripteurs ainsi que les spécifications essentielles de la technologie Bluetooth.

C'est tout ! Amusez-vous avec le Bluetooth sur le @boardname@ !

Martin Woolley, Bluetooth SIG. Twitter: @bluetooth_mdw

### Vidéo

https://www.youtube.com/watch?v=aep_GVowKfs

## Voir Aussi

[About Bluetooth](/reference/bluetooth/about-bluetooth), [@boardname@ Bluetooth profile overview ](http://lancaster-university.github.io/microbit-docs/ble/profile/), [@boardname@ Bluetooth profile reference](http://lancaster-university.github.io/microbit-docs/resources/bluetooth/microbit-profile-V1.9-Level-2.pdf), [Bluetooth on @boardname@ resources](http://bluetooth-mdw.blogspot.co.uk/p/-microbit.html), [Bluetooth SIG](https://www.bluetooth.com)

```package
bluetooth
```