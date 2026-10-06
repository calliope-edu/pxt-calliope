# elimina

Cancella uno sprite dal gioco.

```sig
game.createSprite(0,0).delete()
```

## Esempio

This program makes a sprite and shows the number of its brightness on the screen. Poi, elimina lo sprite.

```blocks
let ball = game.createSprite(0, 2);
basic.showNumber(ball.get(LedSpriteProperty.Brightness));
ball.delete();
```

## Vedi anche

[create sprite](/reference/game/create-sprite)