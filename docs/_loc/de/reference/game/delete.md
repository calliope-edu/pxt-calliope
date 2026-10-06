# lösche...

Löscht einen Sprite aus dem Spiel.

```sig
game.createSprite(0,0).delete()
```

## Beispiel

Dieses Programm erzeugt einen Sprite und zeigt seine Helligkeit auf LED-Matrix an. Dann löscht es das Sprite.

```blocks
let ball = game.createSprite(0, 2);
basic.showNumber(ball.get(LedSpriteProperty.Brightness));
ball.delete();
```

## Siehe auch

[Sprite erstellen](/reference/game/create-sprite)