# eliminar

Delete a sprite from the game.

```sig
game.createSprite(0,0).delete()
```

## Ejemplo

This program makes a sprite and shows the number of its brightness on the screen. Then, it deletes the sprite.

```blocks
let ball = game.createSprite(0, 2);
basic.showNumber(ball.get(LedSpriteProperty.Brightness));
ball.delete();
```

## Ver también

[create sprite](/reference/game/create-sprite)