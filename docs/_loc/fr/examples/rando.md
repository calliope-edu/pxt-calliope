# Rando

Générez une coordonnée aléatoire et affichez-la sur l'écran LED.

```blocks
basic.forever(() => {
    led.toggle(randint(0, 4), randint(0, 4))
})
```