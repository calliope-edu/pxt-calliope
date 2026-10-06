# add Score

Füge mehr zum aktuellen Punktestand für das Spiel hinzu.

```sig
game.addScore(1)
```
### Parameter

* eine [Zahl](/types/number) die angibt wie viel der Punktzahl hinzugefügt werden soll. Eine negative Zahl bedeutet, von der Punktzahl abzuziehen.

### Beispiele

Dieses Programm ist ein einfaches Spiel. Drücke die Taste `A` so oft wie möglich um die Punktzahl zu erhöhen. Drücke `B` um die Punktzahl anzuzeigen und die Punktzahl zurückzusetzen.

```blocks
input.onButtonEvent(Button.B, input.buttonEventValue(ButtonEvent.Down), () => {
    basic.showNumber(game.score())
    game.setScore(0)
})
input.onButtonEvent(Button.A, input.buttonEventValue(ButtonEvent.Down), () => {
    game.addScore(1)
})
```

### Siehe auch

[Punktestand](/reference/game/score), [Punktestand festlegen](/reference/game/set-score), [Countdown starten](/reference/game/start-countdown)