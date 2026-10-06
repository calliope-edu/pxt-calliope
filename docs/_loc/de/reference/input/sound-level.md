# Lautstärkepegel

Finde heraus, wie hoch der Schallpegel ist, der vom Mikrofon gehört wird.

```sig
input.soundLevel()
```

## Rückgabewert

* eine `-Zahl` zwischen `0` (niedriger Ton) und `255` (lauter Ton) zeigt an, wie laut die Töne sind, die das Mikrofon hört.

## Beispiel

Zeige ein Schachbrettsymbol an, während der Lautstärkepegel größer als `100` ist.

```blocks
basic.forever(function () {
    if (input.soundLevel() > 100) {
        basic.showIcon(IconNames.Chessboard)
    } else {
        basic.clearScreen()
    }
})
```

## Siehe auch


```package
Mikrofon
```