# Grafico Intensità Luce

Show the current light level as a bar graph.

```blocks
basic.forever(() => {
    led.plotBarGraph(
        input.lightLevel(),
        255
    )
})
```