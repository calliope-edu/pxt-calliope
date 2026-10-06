# Se Sul Bordo, Rimbalza

Fa saltare via uno [sprite](/reference/game/create-sprite) al limite dello [schermo LED](/device/screen).

```sig
game.createSprite(0, 2).ifOnEdgeBounce();
```

## Parametri

* a **sprite** that might be on the edge of the LED screen.

## Esempio

This program makes a sprite on the right edge of the screen with a direction of 90 degrees, and bounces it so it has a direction of -90 degrees -- exactly the opposite direction.

```blocks
let ball = game.createSprite(4, 2);
basic.showNumber(ball.get(LedSpriteProperty.Direction));
input.onButtonEvent(Button.B, input.buttonEventValue(ButtonEvent.Down), () => {
    ball.ifOnEdgeBounce();
    basic.showNumber(ball.get(LedSpriteProperty.Direction));
});
```

## Vedi anche

[crea sprite](/reference/game/create-sprite) [sta toccando](/reference/game/is-touching), [sta toccando il limite](/reference/game/is-touching-edge)