# Setze Spielstand

Setzt den aktuellen Punktestand.

```sig
game.setScore(1)
```

## Parameter

* a [number](/types/number) that represents the new score.

## Beispiele

Dieses Programm ist ein einfaches Spiel. Drücke den Knopf `A` so oft wie möglich, um den Spielstand zu erhöhen. Drücke `B` um die Punktzahl anzuzeigen und den Spielstand zurückzusetzen.

```blocks
input.onButtonEvent(Button.B, input.buttonEventClick(), () => {
    basic.showNumber(game.score())
    game.setScore(0)
})
input.onButtonEvent(Button.A, input.buttonEventClick(), () => {
    game.addScore(1)
})
```

## Siehe auch

[score](/reference/game/score), [add score](/reference/game/add-score), [start countdown](/reference/game/start-countdown)