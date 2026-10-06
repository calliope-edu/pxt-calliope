# Toccando il Bordo

Find whether the sprite is touching the edge of the [LED screen](/device/screen).

Sprites are touching the edge if they overlap with an LED on the edge of the screen.

```sig
game.createSprite(0, 2).isTouchingEdge();
```

## Parametri

* a **sprite** that might be touching the edge of the screen.

## Returns

* `true` if the sprite is touching the edge of the screen.

## Esempio

Questo programma crea uno sprite nel centro del bordo sinistro dello schermo LED. Poi dice `BORDO!` se è al bordo (ovvero dove è) e `SALVO!` se non è al bordo.

```blocks
let item = game.createSprite(0, 2);
if (item.isTouchingEdge()) {
    basic.showString("EDGY!");
} else {
    basic.showString("SAFE!");
}
```

## Vedi anche

[crea sprite](/reference/game/create-sprite), [sta toccando](/reference/game/is-touching), [se al bordo, rimbalza](/reference/game/if-on-edge-bounce)