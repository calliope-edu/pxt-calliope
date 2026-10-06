# Spiel

Spiele mit Sprites erstellen. Punktestand merken und Spielsteuerung kontrollieren.

## ~ hint

Sobald die Spiel-Engine gestartet ist, wird sie die Sprites auf dem Bildschirm rendern und möglicherweise jede Art von Animation, die du zu zeigen versuchst, überschreiben. Verwende [Spiel pausieren](/reference/game/pause) und [Spiel fortsetzen](/reference/game/resume), um die Spiel-Render-Schleife zu deaktivieren und zu aktivieren.

## ~

## Sprites

```cards
game.createSprite(0,0);
game.createSprite(0,0).delete();
game.createSprite(0,0).move(0);
game.createSprite(0,0).turn(Direction.Left,0);
game.createSprite(0,0).ifOnEdgeBounce();
game.createSprite(0,0).get(LedSpriteProperty.X);
game.createSprite(0,0).set(LedSpriteProperty.X, 0);
game.createSprite(0,0).change(LedSpriteProperty.X, 0);
game.createSprite(0,0).isTouching(null);
game.createSprite(0,0).isTouchingEdge();
```

## Punktestand

```cards
game.addScore(1);
game.score();
game.setScore(0);
```

## Leben

```cards
game.setLife(0)
game.addLife(0)
game.removeLife(0)
```

## Spielsteuerung

```cards
game.startCountdown(10000);
game.gameOver();
game.pause();
game.resume();
game.isGameOver()
game.isRunning();
game.isPaused();
```

## Siehe auch

[create sprite](/reference/game/create-sprite), [move](/reference/game/move), [turn](/reference/game/turn), [ifOnEdgeBounce](/reference/game/if-on-edge-bounce), [get](/reference/game/get), [set](/reference/game/set), [change](/reference/game/change), [is touching](/reference/game/is-touching) [is touching edge](/reference/game/is-touching-edge), [add score](/reference/game/add-score), [score](/reference/game/score), [set score](/reference/game/set-score), [set life](/reference/game/set-life), [add life](/reference/game/add-life), [remove life](/reference/game/remove-life), [start countdown](/reference/game/start-countdown), [game over](/reference/game/game-over), [pause](/reference/game/pause), [resume](/reference/game/resume), [is game over](/reference/game/is-game-over,) [is running](/reference/game/is-running), [is paused](/reference/game/is-paused)