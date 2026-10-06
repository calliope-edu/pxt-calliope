# Move

Move the sprite the number of LEDs you say.

```sig
game.createSprite(0, 2).move(1);
```

## Paramètres

* **leds**: a [number](/types/number) that means how many LEDs the sprite should move.

## Exemple

This program starts a sprite in the middle of the screen. Next, the sprite turns toward the lower-right corner. Finally, it moves two LEDs away to the corner.

```blocks
let item = game.createSprite(2, 2);
item.turn(Direction.Right, 45);
item.move(2);
```

## Voir Aussi

[turn](/reference/game/turn), [create sprite](/reference/game/create-sprite)