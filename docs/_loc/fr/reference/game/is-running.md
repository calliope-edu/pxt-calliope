# is Running

Find out if the game is currently running or not.

```sig
game.isRunning()
```

## Valeur retournée

* a [boolean](/types/boolean) value that is `true` if the game is running or `false` if not.

## Exemple

If the game is currently running, end the game if button **B** is pressed.

```blocks
input.onButtonEvent(Button.B, input.buttonEventClick(), function () {
    if (game.isRunning()) {
        game.gameOver()
    }
})
```

## Voir Aussi

[is paused](/reference/game/is-paused), [is game over](/reference/game/is-game-over)