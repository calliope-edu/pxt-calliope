# Spiel beendet

Beende das Spiel und zeige den Spielstand.

```sig
game.gameOver();
```

## Beispiel

Dieses Programm bittet dich, einen Knopf auszuwählen. Wenn du `A` drückst, sagt das Programm `Gewonnen!`. Wenn du `B` drückst, wird eine Animation angezeigt und das Spiel beendet.

```blocks
basic.showString("WAEHLE EINEN KNOPF");
input.onButtonEvent(Button.A, input.buttonEventValue(ButtonEvent.Down), () => {
    basic.showString("DU HAST GEWONNEN!!");
});
input.onButtonEvent(Button.B, input.buttonEventValue(ButtonEvent.Down), () => {
    game.gameOver();
});
```

## Siehe auch

[score](/reference/game/score), [add score](/reference/game/add-score), [start countdown](/reference/game/start-countdown)