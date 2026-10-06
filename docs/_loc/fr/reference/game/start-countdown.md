# Démarrer le compte à rebours

Start counting down time from the number of milliseconds you say.

```sig
game.startCountdown(1000)
```

## Paramètres

* `ms` is a [number](/types/number) that says how many milliseconds to count down (one second is 1000 milliseconds)

## Exemples

This program is a simple game. Press button `A` as much as possible. At the end of 10 seconds, the program will show your score.

```blocks
input.onButtonEvent(Button.A, input.buttonEventClick(), () => {
    game.addScore(1)
})
game.startCountdown(10000)
```

## Voir Aussi

[score](/reference/game/score), [add score](/reference/game/add-score)