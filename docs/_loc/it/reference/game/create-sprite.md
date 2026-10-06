# Create Sprite

Create a new LED sprite pointing to the right.

A sprite is like a little LED creature you can tell what to do. You can tell it to move, turn, and check whether it has bumped into another sprite.

```sig
game.createSprite(2, 2);
```

## Parametri

* `x`: The left-to-right place on the LED screen where the sprite will start out.
* `y`: The top-to-bottom place on the LED screen where the sprite will start out.

`0` and `4` mean the edges of the screen, and `2` means in the middle.

## Returns

* un nuovo **LedSprite** alla posizione che indichi.

## ~ hint

Una volta avviato il motore di gioco, renderizzerà gli sprite allo schermo e sovrascriverà potenzialmente ogni tipo di animazione che stai provando a mostrare. Usando [pausa gioco](/reference/game/pause) e [riprendi gioco](/reference/game/resume) per disabilitare ed abilitare il ciclo di rendering del gioco.

## ~

## Esempio

This program starts a sprite in the middle of the screen. Next, the sprite turns toward the lower-right corner. Finally, it moves two LEDs away to the corner.

```blocks
let item = game.createSprite(2, 2);
item.turn(Direction.Right, 45);
item.move(2);
```

## Vedi anche

[muovi](/reference/game/move), [gira](/reference/game/turn), [sta-toccando](/reference/game/is-touching)