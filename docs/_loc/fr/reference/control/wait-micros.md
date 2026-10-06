# WaitMicros

Bloque la fibre actuelle pendant un total de microsecondes donné.

```sig
control.waitMicros(4)
```

## Exemple

Ce programme envoie une HAUTE impulsion de 10 microsecondes à travers la broche `P0`.

```blocks
// s'assure que la broche soit faible pour envoyer un signal clair
pins.digitalWritePin(DigitalPin.P0, 0)
control.waitMicros(2)
// définit la broche à 1 et attend 10 microsecondes
pins.digitalWritePin(DigitalPin.P0, 1)
control.waitMicros(10)
// termine l'impulsion
pins.digitalWritePin(DigitalPin.P0, 0)
```

### ~indice

Cette fonction n'est pas supportée par le simulateur.

### ~

## Voir Aussi

[pause](/reference/basic/pause)