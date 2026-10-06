# Ändere Spielstand um

Fügt den angegebenen Betrag zum Spielstand hinzu.

```sig
game.addScore(1)
```

## Parameter

* eine [Zahl](/types/number), die angibt, wie viel zum Punktestand hinzugefügt werden soll. Eine negative Zahl bedeutet, vom Punktestand abzuziehen.

## Beispiele

Dieses Programm ist ein einfaches Spiel. Drücke den Knopf `A` so oft wie möglich. Am Ende von 10 Sekunden zeigt das Programm deine Punktzahl.

```blocks
input.onButtonEvent(Button.A, input.buttonEventValue(ButtonEvent.Down), () => {
    game.addScore(1)
})
game.startCountdown(10000)
```

## Siehe auch

[score](/reference/game/score), [start countdown](/reference/game/start-countdown)