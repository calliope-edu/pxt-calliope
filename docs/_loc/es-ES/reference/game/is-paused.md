# is Paused

Find out if the game is paused or not.

```sig
game.isPaused()
```

## Devuelve

* a [boolean](/types/boolean) value that is `true` if the game is paused or `false` if not.

## Ejemplo

Resume the game if it's paused and button **B** is pressed.

```blocks
input.onButtonEvent(Button.B, input.buttonEventValue(ButtonEvent.Down), function () {
    if (game.isPaused()) {
        game.resume()
    }
})
```

## Ver también

[is running](/reference/game/is-running), [is game over](/reference/game/is-game-over)