# Pour

Exécutez une partie du programme le nombre de fois que vous indiquez via une variable d'index.

```block
for(let i = 0; i <= 4; ++i) {
    let j = i;
}
```

##  #examples

## Exemple : Compter jusqu'à 4

Ce programme va montrer les numéros 0, 1, 2, 3 et 4 l’un après l’autre sur l’écran LED.

```blocks
input.onButtonEvent(Button.A, input.buttonEventValue(ButtonEvent.Down), () => {
    for(let i = 0; i < 5; ++i) {
        basic.showNumber(i)
    }
})
```