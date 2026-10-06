# Score

Find the number of points scored in your game.

```sig
game.score()
```

## Exemple

This program adds one point to your score every time you press button `A`, and shows an animation. Then it waits 500 milliseconds (half a second) and shows your score.

```blocks
input.onButtonEvent(Button.A, input.buttonEventValue(ButtonEvent.Down), () => {
    game.addScore(1);
    basic.pause(500);
    basic.showNumber(game.score());
    });
```

## Voir Aussi

[modifier le score par](/reference/game/score), [démarrer le compte à rebours](/reference/game/start-countdown)