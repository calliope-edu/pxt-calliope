# Arrêter les annonces

Arrête d'annoncer l'URL via le protocole Eddystone sur Bluetooth.

## ~indice

## Eddystone

Les balises Bluetooth sont utilisées pour indiquer la proximité d'un objet ou d'un endroit intéressant. Les balises utilisent les annonces Bluetooth pour émettre de petites quantités de données, qui peuvent être lues et traitées par quiconque à portée avec un appareil et un logiciel adéquat, typiquement un smartphone et une application.

Il existe différents formats de messages de balises, qui définissent la façon dont les paquets émis en Bluetooth sont utilisés comme conteneurs pour les données de la balise. iBeacon est le format de messages de balise d'Apple. Eddystone vient de Google.

En savoir plus à l'adresse https://lancaster-university.github.io/microbit-docs/ble/eddystone/ .

## ~

```sig
bluetooth.stopAdvertising();
```

## Exemple: arrêter les annonces lorsque le bouton est pressé

```blocks
input.onButtonEvent(Button.A, input.buttonEventValue(ButtonEvent.Down), () => {
    bluetooth.stopAdvertising();
})
```

## Voir Aussi

[advertise-url](/reference/bluetooth/advertise-url)

```package
bluetooth
```