# Spielstand

Gibt die Anzahl der Punkte, die in deinem Spiel erzielt wurden aus.

```sig
game.score()
```

## Beispiel

Dieses Programm fügt bei jedem Drücken der Taste `A` einen Punkt zu deiner Punktzahl hinzu und zeigt eine Animation an. Dann wartet es 500 Millisekunden (eine halbe Sekunde) und zeigt deine Punktzahl.

```blocks
input.onButtonEvent(Button.A, input.buttonEventValue(ButtonEvent.Down), () => {
    game.addScore(1);
    basic.pause(500);
    basic.showNumber(game.score());
    });
```

## Siehe auch

[change score by](/reference/game/score), [start countdown](/reference/game/start-countdown)