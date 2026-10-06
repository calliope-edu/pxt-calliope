# Sur la base de Données Reçues

Run part of a program when the @boardname@ receives a [number](/types/number) or [string](/types/string) over radio.

```sig
radio.onDataReceived(() => { });
```

### ~ alert

#### API obsolète

Cette API est obsolète! Utilisez plutôt [on received number](/reference/radio/on-received-number).

### ~

```sig
radio.onDataReceived(() => { });
```

## Exemple

Ce programme envoie continuellement des chiffres indiquant à quelle vitesse le @boardname@ ralentit ou accélère. Il reçoit également des numéros pour la même chose provenant des @boardname@s à proximité. Il affiche ces chiffres sous forme de [graphique à barres](/reference/led/plot-bar-graph).

```blocks
basic.forever(() => {
    radio.sendNumber(input.acceleration(Dimension.X));
})
radio.onDataReceived(() => {
    led.plotBarGraph(radio.receiveNumber(), 1023);
})
```

## Voir Aussi

[sur numéro reçu](/reference/radio/on-received-number), [numéro envoyé](/reference/radio/send-number), [groupe défini](/reference/radio/set-group)

```package
funk
```