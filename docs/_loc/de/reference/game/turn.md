# Drehen

Drehen den Sprite im angegebenen Winkel in eine bestimmte Richtung.

```sig
game.createSprite(0, 2).turn(Direction.Right, 45);
```

## Parameter

* **direction**: a choice whether the sprite should turn **left** or **right**
* **degrees**: a [number](/types/number) degrees of angle that the sprite should turn. A straight left or right turn is 90 degrees.

## Beispiel

Dieses Programm startet einen Sprite in der Mitte des Bildschirms. Als nächstes dreht sich der Sprite in die untere rechte Ecke. Am Ende werden zwei LEDs an die Ecke verschoben.

```blocks
let item = game.createSprite(2, 2);
item.turn(Direction.Right, 45);
item.move(2);
```

## Siehe auch

[move](/reference/game/move), [create sprite](/reference/game/create-sprite)