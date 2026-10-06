# Analog Set Pitch Pin

Specify which [pin](/device/pins) (P0, P1, P2) is used to generate tones.

```sig
pins.analogSetPitchPin(AnalogPin.P0)
```

## Paramètres

* `name` - [String](/types/string); the pin name ("P0", "P1", or "P2")

## Exemple

Régler la broche en hauteur sur `P0` et envoyer une tonalité de 440 Hz pendant la durée d'une seconde.

```blocks
pins.analogSetPitchPin(AnalogPin.P0)
let frequency = 440
let duration = 1000
pins.analogPitch(frequency, duration)
```

## Some common notes

* 440 = A4 on piano
* see [piano key frequencies ](https://en.wikipedia.org/wiki/Piano_key_frequencies) for more information

## Voir Aussi

[@boardname@ broches](/device/pins), [définir la période analogique](/reference/pins/analog-set-period), [tonalité analogique](/reference/pins/analog-pitch), [régler le niveau de sortie de la source sonore](/reference/pins/set-audio-pin)