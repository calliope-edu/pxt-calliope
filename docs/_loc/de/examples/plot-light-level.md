# Helligkeit anzeigen

Zeige die aktuelle Umgebungshelligkeit als Balkendiagramm an.

```blocks
basic.forever(() => {
    led.plotBarGraph(
        input.lightLevel(),
        255
    )
})
```