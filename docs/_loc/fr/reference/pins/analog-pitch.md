# Analog Pitch

Envoie un signal de modulation de largeur d'impulsions (signal PWM) à la broche `P0`.

```sig
pins.analogPitch(440, 300)
```

Le signal PWM est envoyé à la broche de tonalité actuelle. Vous devez premièrement définir la broche de tonalité actuelle ; pour cela utilisez [analog set pitch pin](/reference/pins/analog-set-pitch-pin).

## Paramètres

* **fréquence** : il s'agit d'une [valeur numérique](/types/number) représentant la fréquence du signal PWM au niveau de la broche de tonalité.
* **ms** : il s'agit notamment d'une [valeur numérique](/types/number) correspondant à la durée du signal à hauteur de broche, mesurée en millisecondes.

## Exemple

Régler la broche de tonalité sur `P1` et envoyer une tonalité de 440 Hz pendant la durée d'une seconde.

```blocks
pins.analogSetPitchPin(AnalogPin.P0)
let frequency1 = 440
let duration = 1000
pins.analogSetPitchPin(AnalogPin.P1)
pins.analogPitch(frequency1, duration)
```

## Some common notes

* 440 = A4 on piano
* see [piano key frequencies ](https://en.wikipedia.org/wiki/Piano_key_frequencies) for more information

## Voir Aussi

[@boardname@ pins](/device/pins), [analog set period](/reference/pins/analog-set-period), [analog set pitch pin](/reference/pins/analog-set-pitch-pin)