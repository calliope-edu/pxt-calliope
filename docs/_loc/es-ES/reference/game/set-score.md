# Establecer puntuación

Establece la puntuación actual.

```sig
game.setScore(1)
```

## Parameters

* a [number](/types/number) that represents the new score.

## Ejemplos

This program is a simple game. Press button `A` as much as possible to increase the score. Press `B` to display the score and reset the score.

```blocks
input.onButtonEvent(Button.B, input.buttonEventClick(), () => {
    basic.showNumber(game.score())
    game.setScore(0)
})
input.onButtonEvent(Button.A, input.buttonEventClick(), () => {
    game.addScore(1)
})
```

## Ver también

[score](/reference/game/score), [add score](/reference/game/add-score), [start countdown](/reference/game/start-countdown)