# Beschleunigung anzeigen

Zeichne Beschleunigung in der `x` Dimension auf den LEDs.

```blocks
basic.forever(() => {
    led.plotBarGraph(
        input.acceleration(Dimension.X),
        1023
    )
})
```