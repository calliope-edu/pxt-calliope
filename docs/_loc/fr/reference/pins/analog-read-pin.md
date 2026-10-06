# Analog Read Pin

Read an **analog** signal (`0` through `1023`) from the [pin](/device/pins) you say.

```sig
pins.analogReadPin(AnalogPin.P0)
```

## Paramètres

* **nom** : il s'agit d'[chaîne de caractères](/types/string) suivie du nom de la broche que vous avez indiquée (soit`P0` à`P4`, soit `P10`).

## Valeur retournée

* a [number](/types/number) from `0` through `1023`

## Exemple

This program reads pin `P1` and shows the number on the LED screen.

```blocks
basic.forever(function() {
    let value = pins.analogReadPin(AnalogPin.P1)
    basic.showNumber(value)
})
```

### ~indice

If you are using **analog read pin** with another @boardname@ running **analog write pin**, then things can get tricky. Rappelez-vous que le @boardname@ qui exécute **régler une broche analogique** écrit des 0 et des 1 à une fréquence très élevée pour obtenir une moyenne de la valeur souhaitée. Sadly, if you try to read that average from another @boardname@, then the @boardname@ will either read 0 or 1023. You could try to read a higher number of values (e.g. a million) in a loop, then computer then average. Alternatively, you can plug in a capacitor in-between the two @boardname@s.

### ~

## Voir Aussi

[@boardname@ pins](/device/pins), [on pin pressed](/reference/input/on-pin-pressed), [analog write pin](/reference/pins/analog-write-pin), [digital read pin](/reference/pins/digital-read-pin), [digital write pin](/reference/pins/digital-write-pin)