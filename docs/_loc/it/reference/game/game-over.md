# Game Over

Finisce il gioco e mostra il punteggio.

```sig
game.gameOver();
```

## Esempio

Questo programma ti chiede di scegliere un pulsante. Se premi il pulsante `A`, il programma dice `HAI VINTO!`. Se premi il pulsante `B`, mostra un'animazione e conclude il gioco.

```blocks
basic.showString("PICK A BUTTON");
input.onButtonEvent(Button.A, input.buttonEventValue(ButtonEvent.Down), () => {
    basic.showString("YOU WIN!");
});
input.onButtonEvent(Button.B, input.buttonEventValue(ButtonEvent.Down), () => {
    game.gameOver();
});
```

## Guarda anche

[punteggio](/reference/game/score), [aggiungi punteggio](/reference/game/add-score), [avvia conto alla rovescia](/reference/game/start-countdown)