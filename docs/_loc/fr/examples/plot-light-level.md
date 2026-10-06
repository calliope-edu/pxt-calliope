# Plot Light level

Afficher le niveau de lumière actuel sous la forme d'un graphique à barres.

```blocks
basic.forever(() => {
    led.plotBarGraph(
        input.lightLevel(),
        255
    )
})
```