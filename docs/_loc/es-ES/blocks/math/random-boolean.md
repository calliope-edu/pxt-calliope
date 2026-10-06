# random Boolean

Devuelve un valor booleano al azar que puede ser `true` or `false` (verdadero o falso).

```sig
Math.randomBoolean()
```

## Devuelve

* a pseudo-random [boolean](types/boolean) that is either `true` or `false`.

## Ejemplo

Make your @boardname@ do a coin toss when it's dropped softly. Have the LEDs show 'heads' or 'tails' as the result of the toss.

```blocks
input.onGesture(Gesture.FreeFall, () => {
    if (Math.randomBoolean()) {
        basic.showIcon(IconNames.Happy)
    } else {
        basic.showIcon(IconNames.Sword)
    }
})
```

## Ver también

[random](/reference/math/random)