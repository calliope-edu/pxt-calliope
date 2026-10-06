# Score

Trova il numero di punti segnati nella tua partita.

```sig
game.score()
```

## Esempio

This program adds one point to your score every time you press button `A`, and shows an animation. Then it waits 500 milliseconds (half a second) and shows your score.

```blocks
input.onButtonEvent(Button.A, input.buttonEventValue(ButtonEvent.Down), () => {
    game.addScore(1);
    basic.pause(500);
    basic.showNumber(game.score());
    });
```

## Guarda anche

[cambia punteggio per](/reference/game/score), [avvia conto alla rovescia](/reference/game/start-countdown)