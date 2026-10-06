# While

Répétez le code tant qu'une `condition` [Booléenne](/blocks/logic/boolean) est vraie.

```block
while(true) {
}
```

La boucle while a une *condition* qui est une valeur [Booléenne](/blocks/logic/boolean) .

La condition est testée avant que tout code s'exécute. Ce qui signifie que si la condition est fausse avant la boucle, le code à l'intérieur de la boucle ne s'exécutera jamais.

##  #examples

## Exemple : ligne diagonale

L’exemple suivant utilise une boucle "tant que" pour tracer une ligne diagonale sur l’écran LED (points `0,0` ; `1,1` ; `2,2` ; `3,3` ; `4,4`).

```blocks
input.onButtonEvent(Button.A, input.buttonEventValue(ButtonEvent.Down), () => {
    let index = 4;
    while(index >= 0) {
        led.plot(index, index);
        index--;
    }
})
```