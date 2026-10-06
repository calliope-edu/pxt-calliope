# Inizia Conto alla rovescia

Start counting down time from the number of milliseconds you say.

```sig
game.startCountdown(1000)
```

## Parametri

* `ms` is a [number](/types/number) that says how many milliseconds to count down (one second is 1000 milliseconds)

## Esempi

Questo programma è un gioco semplice. Premi il pulsante `A` il più possibile. Alla fine di 10 secondi, il programma mostrerà il tuo punteggio.

```blocks
input.onButtonEvent(Button.A, input.buttonEventClick(), () => {
    game.addScore(1)
})
game.startCountdown(10000)
```

## Guarda anche

[punteggio](/reference/game/score), [aggiungi punteggio](/reference/game/add-score)