# Bei Geste

Testet ob gerade eine Bewegung erkannt wird.

```sig
input.isGesture(Gesture.Shake)
```

## Parameter

* `Geste` bedeutet, wie du den @boardname@ hälst oder bewegst. Dies kann unter anderem `geschüttelt`, `nach vorne neigen`, `nach hinten neigen`, `Neigung links`, `Neigung rechts`, `freier Fall`, `3g`, `6g` oder `8g` sein.

## Beispiel: Zufallszahl

Dieses Programm zeigt eine Zahl von `2` bis `9` an, wenn du den Calliope mini schüttelst.

```blocks
forever(function() {
    if (input.isGesture(Gesture.Shake)) {
        let x = randint(2, 9)
        basic.showNumber(x)
    }
})
```

## Siehe auch

[bei Geste](/reference/input/on-gesture)