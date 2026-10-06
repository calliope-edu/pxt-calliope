# Répéter

Exécute une partie du programme le nombre de fois spécifié.

```block
for(let i = 0; i < 4; ++i) {
}
```

##  #examples

## Exemple: Cœur clignotant

Faire clignoter l’icône `cœur` sur l'écran `4` fois.

```blocks
for (let i = 0; i < 4; i++) {
    basic.showIcon(IconNames.Heart)
    basic.pause(300)
    basic.clearScreen()
    basic.pause(300)
}
```