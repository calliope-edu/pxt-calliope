# Wiederhole

Führe einen Teil des Programms so viele Male aus, wie du sagst.

```block
for(let i = 0; i < 4; ++i) {
}
```

##  #examples

## Beispiel: Blinkendes Herz

Das `Herz`-Symbol auf dem Bildschirm `4` mal blinken lassen.

```blocks
for (let i = 0; i < 4; i++) {
    basic.showIcon(IconNames.Heart)
    basic.pause(300)
    basic.clearScreen()
    basic.pause(300)
}
```