# Is Deleted

Scopri se lo sprite viene eliminato dal motore di gioco o no.

```sig
game.createSprite(0,0).isDeleted()
```

## Returns

* un valore [booleano](/types/boolean) che è `true` se lo sprite viene eliminato dal motore di gioco o `false` se no.

## Esempio

This game has 5 sprites initially. After 1 second, the third sprite is deleted and all remaining sprites are moved by 1.

```blocks
let sprites: game.LedSprite[] = []
for (let i = 0; i <= 4; i++) {
    sprites.push(game.createSprite(0, i))
}
basic.pause(1000)
sprites[2].delete()
for (let sprite of sprites) {
    if (!(sprite.isDeleted())) {
        sprite.move(1)
    }
}
```

## Vedi anche

[delete sprite](/reference/game/delete)