# Change Score By

Aggiungi l'importo che dici al punteggio per il gioco.

```sig
game.addScore(1)
```

## Parametri

* a [number](/types/number) that means how much to add to the score. A negative number means to subtract from the score.

## Esempi

Questo programma è un gioco semplice. Premi il pulsante `A` il più possibile. Alla fine di 10 secondi, il programma mostrerà il tuo punteggio.

```blocks
input.onButtonEvent(Button.A, input.buttonEventValue(ButtonEvent.Down), () => {
    game.addScore(1)
})
game.startCountdown(10000)
```

## Guarda anche

[punteggio](/reference/game/score), [avvia conto alla rovescia](/reference/game/start-countdown)