# Tampon de diffusion UID

Annonce un UID via le protocole Eddystone en Bluetooth.

```sig
bluetooth.advertiseUidBuffer(pins.createBuffer(16), 7, true);
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

* `bufer` - un tampon de 16 octets contenant l'espace de nom (les premiers 10 octets) et l'instance (les 6 derniers octets).
* `power` - un [nombre](/types/number) représentant le niveau de puissance entre 0 (court) et 7 (portée maximum).
* `connectable` - un [booléen](/blocks/logic/boolean) indiquant si le @boardname@ doit ou non accepter les connexions.


## Voir Aussi

[stop-advertising](/reference/bluetooth/stop-advertising), [advertise-uid](/reference/bluetooth/advertise-uid)

```package
bluetooth
```