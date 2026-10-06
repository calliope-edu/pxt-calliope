# Leben hinzufügen

Erhöhe die Anzahl der verbleibenden Leben um eine bestimmte Anzahl.

```sig
game.addLife(0)
```

Die Anzahl der Leben im Spiel wird um die angegebene Anzahl der Leben erhöht.

## Parameter

* **life**: a [number](/types/number) to add to the life count.

## Beispiel #example

Füge `20` Leben zur aktuellen Lebensanzahl hinzu, wenn die Punktzahl des Spielers `10000` Punkte erreicht.

```blocks
let giveLives = true

if (game.score() > 9999) {
    if (giveLives) {
        game.addLife(20)
        giveLives = false
    }
}
```

## Siehe auch #seealso

[setze Anzahl Leben](/reference/game/set-life), [Leben entfernen](/reference/game/remove-life)