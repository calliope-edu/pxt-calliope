# Gioco

Crea giochi con Folletti. Mantieni il punteggio e controlla il gameplay.

## ~ hint

Una volta avviato il motore di gioco, renderizzerà gli sprite allo schermo e sovrascriverà potenzialmente ogni tipo di animazione che stai provando a mostrare. Usando [pausa gioco](/reference/game/pause) e [riprendi gioco](/reference/game/resume) per disabilitare ed abilitare il ciclo di rendering del gioco.

## ~

## Sprite

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

## Scoring

```cards
game.addScore(1);
game.score();
game.setScore(0);
```

## Vita

```cards
game.setLife(0)
game.addLife(0)
game.removeLife(0)
```

## Controllo del gioco

```cards
game.startCountdown(10000);
game.gameOver();
game.pause();
game.resume();
game.isGameOver()
game.isRunning();
game.isPaused();
```

## Vedi anche

[crea folletto](/reference/game/create-sprite), [muovi](/reference/game/move), [gira](/reference/game/turn), [seAlLimiteSalta](/reference/game/if-on-edge-bounce), [ottieni](/reference/game/get), [imposta](/reference/game/set), [modifica](/reference/game/change), [sta toccando](/reference/game/is-touching) [sta toccando limite](/reference/game/is-touching-edge), [aggiungi punteggio](/reference/game/add-score), [punteggio](/reference/game/score), [imposta punteggio](/reference/game/set-score), [imposta vita](/reference/game/set-life), [aggiungi vita](/reference/game/add-life), [rimuovi vita](/reference/game/remove-life), [avvia conto alla rovescia](/reference/game/start-countdown), [game over](/reference/game/game-over), [pausa](/reference/game/pause), [riprendi](/reference/game/resume), [è game over](/reference/game/is-game-over,) [sta correndo](/reference/game/is-running), [in pausa](/reference/game/is-paused)