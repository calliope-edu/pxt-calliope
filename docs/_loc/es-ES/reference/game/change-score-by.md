# Change Score By

Add the amount you say to the score for the game.

```sig
game.addScore(1)
```

## Parameters

* a [number](/types/number) that means how much to add to the score. A negative number means to subtract from the score.

## Ejemplos

This program is a simple game. Press button `A` as much as possible. At the end of 10 seconds, the program will show your score.

```blocks
input.onButtonEvent(Button.A, input.buttonEventValue(ButtonEvent.Down), () => {
    game.addScore(1)
})
game.startCountdown(10000)
```

## Ver también

[score](/reference/game/score), [start countdown](/reference/game/start-countdown)