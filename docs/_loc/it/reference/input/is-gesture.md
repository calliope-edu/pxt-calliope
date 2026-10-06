# Is Gesture

Verifica se si sta eseguendo un certo gesto.

```sig
input.isGesture(Gesture.Shake)
```

## Parametri

* `gesture` means the way you hold or move the @boardname@. This can be `shake`, `tilt forward`, `tilt backward`, `screen up`, `screen down`, `tilt left`, `tilt right`, `free fall`, `3g`, or `6g`.

## Example: random number

This program shows a number from `2` to `9` when you shake the @boardname@.

```blocks
forever(function() {
    if (input.isGesture(Gesture.Shake)) {
        let x = randint(2, 9)
        basic.showNumber(x)
    }
})
```

## Guarda anche

[on gesture](/reference/input/on-gesture)