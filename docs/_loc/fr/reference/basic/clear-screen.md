# Effacer l'écran

Eteint toutes les lumières LED de l'[écran LED](/device/screen).

```sig
basic.clearScreen()
```

## Exemple: Coeur qui s'éteint

L'exemple suivant affiche un cœur sur l'écran puis éteint toutes les lumières LED.

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

## Voir Aussi

[set brightness](/reference/led/set-brightness), [unplot](/reference/led/unplot), [plot](/reference/led/plot), [Image](/reference/images/image)