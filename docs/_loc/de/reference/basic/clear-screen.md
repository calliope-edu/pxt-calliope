# LED-Anzeige löschen

Schaltet alle LEDs auf der [LED-Matrix](/device/screen) aus.

```sig
basic.clearScreen()
```

## Beispiel: Verschwindendes Herz

Der folgende Code zeigt ein Herz auf der LED-Matrix und schaltet dann alle LEDs aus.

```blocks
basic.showLeds(`
. # . # . 
# # # # # 
# # # # # 
. # # # . 
. . # . . 
`)
basic.clearScreen()
```

## Siehe auch

[setze Helligkeit](/reference/led/set-brightness), [LED aus](/reference/led/unplot), [LED an](/reference/led/plot), [Bild](/reference/images/image)