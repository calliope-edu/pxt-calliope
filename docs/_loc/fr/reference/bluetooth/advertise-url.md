# Annoncer une Url

Annonce une URL via le protocole Eddystone en Bluetooth.

```sig
bluetooth.advertiseUrl("https://makecode.microbit.org/", 7, true);
```

### ~ reminder

#### Deprecated

This API is deprecated. The Eddystone beacon format is no longer supported, see [Google Beacon format (Deprecated)](https://developers.google.com/beacons/eddystone).

### ~

## ~indice

## Eddystone

Les balises Bluetooth sont utilisées pour indiquer la proximité d'un objet ou d'un endroit intéressant. Les balises utilisent les annonces Bluetooth pour émettre de petites quantités de données, qui peuvent être lues et traitées par quiconque à portée avec un appareil et un logiciel adéquat, typiquement un smartphone et une application.

Il existe différents formats de messages de balises, qui définissent la façon dont les paquets émis en Bluetooth sont utilisés comme conteneurs pour les données de la balise. iBeacon est le format de messages de balise d'Apple. Eddystone vient de Google.

En savoir plus à l'adresse https://lancaster-university.github.io/microbit-docs/ble/eddystone/ .

## ~

## Paramètres

* `url` - une [chaîne](/types/string) contenant l'URL à diffuser, au moins 17 caractères de long sans compter le protocole (ex : `https://`) qui sera encodé sur 1 octet.
* `power` - un [nombre](/types/number) représentant le niveau de puissance entre 0 (court) et 7 (portée maximum).
* `connectable` - un [booléen](/blocks/logic/boolean) indiquant si le @boardname@ doit ou non accepter les connexions.

## Exemple: Diffuser un code secret

```blocks
bluetooth.advertiseUrl("https://pxt.io?secret=42", 7, true);
```

## Voir Aussi

[stop-advertising](/reference/bluetooth/stop-advertising), [advertise-uid](/reference/bluetooth/advertise-uid)

```package
bluetooth
```