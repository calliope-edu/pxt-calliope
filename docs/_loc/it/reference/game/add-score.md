# add Score

Add more to the current score for the game.

```sig
game.addScore(1)
```
### Parametri

* un [numero](/types/number) che significa quanto aggiungere al punteggio. Un numero negativo significa sottrarre dal punteggio.

### Esempi

Questo programma è un gioco semplice. Premi il pulsante `A` il più possibile per aumentare il punteggio. Premi `B` per mostrare il punteggio e resettarlo.

```blocks
input.onButtonEvent(Button.B, input.buttonEventValue(ButtonEvent.Down), () => {
    basic.showNumber(game.score())
    game.setScore(0)
})
input.onButtonEvent(Button.A, input.buttonEventValue(ButtonEvent.Down), () => {
    game.addScore(1)
})
```

### Guarda anche

[score](/reference/game/score), [set score](/reference/game/set-score), [start countdown](/reference/game/start-countdown)