# erzeuge Sprite

Erzeugt einen neuen LED-Sprite, der nach rechts zeigt.

Ein Sprite ist wie eine kleine LED-Kreatur, der du sagen kannst, was sie tun soll. Du kannst ihr sagen, dass sie sich bewegen und drehen und prüfen soll, ob sie auf einen anderen Sprite geworfen wurde.

```sig
game.createSprite(2, 2);
```

## Parameter

* `x`: Die Stelle von links nach rechts auf der LED-Matrix, an der der Sprite startet.
* `y`: Die Stelle von oben nach unten auf LED-Matrix, an welcher der Sprite startet.

`0` und `4` bedeuten die Ränder des Bildschirms und `2` die Mitte.

## Rückgabewert

* ein neuer **LedSprite** an der Stelle, die du definierst.

## ~ hint

Sobald die Game-Engine gestartet ist, wird sie die Sprites auf der LED-Matrix rendern und möglicherweise jede Art von Animation, die du zu zeigen versuchst, außer Kraft setzen. Mit [pausieren](/reference/game/pause) und [fortsetzen](/reference/game/resume) kann die Spielwiedergabe deaktiviert und aktiviert werden.

## ~

## Beispiel

Dieses Programm startet einen Sprite in der Mitte der LED-Matrix. Als nächstes dreht sich der Sprite in die untere rechte Ecke. Am Ende werden zwei LEDs an die Ecke verschoben.

```blocks
let item = game.createSprite(2, 2);
item.turn(Direction.Right, 45);
item.move(2);
```

## Siehe auch

[move](/reference/game/move), [turn](/reference/game/turn), [is-touching](/reference/game/is-touching)