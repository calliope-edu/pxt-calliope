# Boolescher Zufallswert

Gibt einen pseudozufälligen booleschen Wert zurück, der entweder `true` oder `false` ist.

```sig
Math.randomBoolean()
```

## Rückgabewert

* ein pseudozufälliger [boolean](types/boolean)-Wert, der entweder `true` oder `false` ist.

## Beispiel

Mach mit deinem @boardname@ einen Münzwurf, wenn er sanft fallen gelassen wird. Lass die LEDs 'Kopf' oder 'Zahl' als Ergebnis des Wurfes anzeigen.

```blocks
input.onGesture(Gesture.FreeFall, () => {
    if (Math.randomBoolean()) {
        basic.showIcon(IconNames.Happy)
    } else {
        basic.showIcon(IconNames.Sword)
    }
})
```

## Siehe auch

[random](/reference/math/random)