# Pralle vom Rand ab

Lässt einen [sprite](/reference/game/create-sprite) am Rand des [LED Bildschirms](/device/screen) abprallen.

```sig
game.createSprite(0, 2).ifOnEdgeBounce();
```

## Parameter

* ein **Sprite** der sich am Rand des LED-Bildschirms befinden könnte.

## Beispiel

Dieses Programm erzeugt einen Sprite am rechten Rand des Bildschirms mit einer Richtung von 90 Grad, und lässt ihn so aufprallen, dass er in Richtung von -90 Grad zurückprallt -- genau in die entgegengesetzte Richtung.

```blocks
let ball = game.createSprite(4, 2);
basic.showNumber(ball.get(LedSpriteProperty.Direction));
input.onButtonEvent(Button.B, input.buttonEventValue(ButtonEvent.Down), () => {
    ball.ifOnEdgeBounce();
    basic.showNumber(ball.get(LedSpriteProperty.Direction));
});
```

## Siehe auch

[create sprite](/reference/game/create-sprite), [is touching](/reference/game/is-touching), [is touching edge](/reference/game/is-touching-edge)