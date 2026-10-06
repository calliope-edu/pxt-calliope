# Analog Set Period

Veuillez configurer la période de modulation de largeur d'impulsion (PWM) sur la broche analogique [](/device/pins) spécifiée. Veuillez définir la broche spécifiée sur une valeur de tension analogique avant d'appeler la fonction.

```sig
pins.analogSetPeriod(AnalogPin.P0, 20000)
```

## Paramètres

* **nom** : il s'agit d'une [chaîne de caractères](/types/string) qui vous permet de spécifier la broche à configurer (`P0` à `P4`, ou `P10`)
* **micros** : il s'agit d'une [valeur numérique](/types/number) définissant la période analogique, en microsecondes.

## Exemple

The following code first sets `P0` to analog with **analog write pin**, and then sets the PWM period of `P0` to 20,000 microseconds.

```blocks
pins.analogWritePin(AnalogPin.P0, 512)
pins.analogSetPeriod(AnalogPin.P0, 20000)
```

## Voir Aussi

[@boardname@ pins](/device/pins), [on pin pressed](/reference/input/on-pin-pressed), [analog read pin](/reference/pins/analog-read-pin), [analog write pin](/reference/pins/analog-write-pin), [digital read pin](/reference/pins/digital-read-pin), [digital write pin](/reference/pins/digital-write-pin)