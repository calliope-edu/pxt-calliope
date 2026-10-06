# Sprite bewegen

Verschiebt den Sprite um die angegebene Anzahl der LEDs.

```sig
game.createSprite(0, 2).move(1);
```

## Parameter

* **leds**: a [number](/types/number) that means how many LEDs the sprite should move.

## Beispiel

Dieses Programm startet einen Sprite in der Mitte des Bildschirms. Als nächstes dreht sich der Sprite in die untere rechte Ecke. Am Ende werden zwei LEDs an die Ecke verschoben.

```blocks
let item = game.createSprite(2, 2);
item.turn(Direction.Right, 45);
item.move(2);
```

## Siehe auch

[turn](/reference/game/turn), [create sprite](/reference/game/create-sprite)