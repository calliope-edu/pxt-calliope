# Set Score

Imposta il punteggio attuale.

```sig
game.setScore(1)
```

## Parametri

* a [number](/types/number) that represents the new score.

## Esempi

Questo programma è un gioco semplice. Premi il pulsante `A` il più possibile per aumentare il punteggio. Premi `B` per mostrare il punteggio e ripristinarlo.

```blocks
input.onButtonEvent(Button.B, input.buttonEventClick(), () => {
    basic.showNumber(game.score())
    game.setScore(0)
})
input.onButtonEvent(Button.A, input.buttonEventClick(), () => {
    game.addScore(1)
})
```

## Guarda anche

[punteggio](/reference/game/score), [aggiungi punteggio](/reference/game/add-score), [avvia conto alla rovescia](/reference/game/start-countdown)