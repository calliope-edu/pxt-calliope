# Toccando

Find whether the sprite is touching another sprite you say.

Sprites are touching if they share the same LED.

```sig
game.createSprite(0, 2).isTouching(null);
```

## Parametri

* another **sprite** that might be touching the one you are checking.

## Returns

* `true` if the two sprites are touching.

## Esempio

Questo programma crea due sprite chiamati `materia` ed `antimateria`, e poi controlla se si stanno toccando.  Se si stanno toccando, c'è un'esplosione.

```blocks
let matter = game.createSprite(2, 2);
let antimatter = game.createSprite(2, 2);
if (matter.isTouching(antimatter)) {
    basic.pause(500);
    basic.clearScreen();
    basic.showString("BOOM!");
}
```

## Vedi anche

[crea sprite](/reference/game/create-sprite), [sta toccando il bordo](/reference/game/is-touching-edge), [se al bordo, rimbalza](/reference/game/if-on-edge-bounce)