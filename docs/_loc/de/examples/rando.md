# Rando

Erstellt eine zufällige Koordinate und zeigt sie auf dem LED-Bildschirm an.

```blocks
basic.forever(() => {
    led.toggle(randint(0, 4), randint(0, 4))
})
```