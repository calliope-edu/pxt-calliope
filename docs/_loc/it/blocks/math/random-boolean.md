# random Boolean

Returns a pseudo-random boolean value that is either `true` or `false`.

```sig
Math.randomBoolean()
```

## Returns

* a pseudo-random [boolean](types/boolean) that is either `true` or `false`.

## Esempio

Fa sì che la tua @boardname@ lanci una moneta quando viene rilasciato lievemente. Fa mostrare ai LED 'testa' o 'croce' come risultato del lancio.

```blocks
input.onGesture(Gesture.FreeFall, () => {
    if (Math.randomBoolean()) {
        basic.showIcon(IconNames.Happy)
    } else {
        basic.showIcon(IconNames.Sword)
    }
})
```

## Guarda anche

[random](/reference/math/random)