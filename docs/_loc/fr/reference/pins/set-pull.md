# Tester la Force de Traction

Configure la traction électrique du Pin ayant été défini.

Plusieurs Pins @boardname@ peuvent être configurés comme des résistances*pull-ups*. Par exemple, des résistances pull-up peuvent contribuer à faire en sorte qu'il y ait des surtensions du Pin (3,3 volts, ou `1` lors de la définition de la [ broche numérique en entrée](/reference/pins/digital-read-pin)). Si l'extrémité du Pin est reliée à `P0` (tension supérieure) et que l'autre extrémité est reliée à `GND` (0 volt), alors la valeur mesurée du Pin en position `P0` donnera 0 volts lorsque vous appuierez sur le bouton, le logiciel @boardname@ sera alors en mesure de détecter le courant résiduel sur le bouton.

```sig
pins.setPull(DigitalPin.C9, PinPullMode.PullDown);
```

Les résistances de rappel de pull-up et pull-down se situent aux alentours des 13kOhm.

## Paramètres

* `name`: The @boardname@ hardware pin to configure (`P0`-`P20`)
* `pull` : Il s'agit de la force de traction qui doit être exercée sur la broche (**de base**, **maximale**, ou **aucune**)

## Exemple

L'exemple suivant offre une résistance de la broche `P0` **up** élevée à la traction.

```blocks
pins.setPull(DigitalPin.P0, PinPullMode.PullUp);
```

## Voir Aussi

[@boardname@ | mbed](https://developer.mbed.org/platforms/Microbit/)