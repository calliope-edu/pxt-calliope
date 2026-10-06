# Countdown starten

Zählen Sie die Zeit von der Anzahl der Millisekunden an, die du angibst.

```sig
game.startCountdown(1000)
```

## Parameter

* `ms` is a [number](/types/number) that says how many milliseconds to count down (one second is 1000 milliseconds)

## Beispiele

Dieses Programm ist ein einfaches Spiel. Drücke den Knopf `A` so oft wie möglich. Am Ende von 10 Sekunden zeigt das Programm Ihre Punktzahl.

```blocks
input.onButtonEvent(Button.A, input.buttonEventClick(), () => {
    game.addScore(1)
})
game.startCountdown(10000)
```

## Siehe auch

[score](/reference/game/score), [add score](/reference/game/add-score)