# spiele Melodie

Spiele eine kurze Melodie von Noten komponiert in einer Zeichenkette.

```sig
music.playMelody("", 120);
```

Die Melodie ist eine kurze Reihe von Noten komponiert in einer Zeichenkette. Die Melodie wird mit einem Tempo gespielt, der von dem zu bestimmendem **Tempo** Attribut gesetzt wird. Die Melodie Zeichenkette enthält eine Reihe von Noten, die wie folgt formatiert sind:

`"E B C5 A B G A F "`

Die Melodie wird im `||music:play melody||` Block als Noten-Symbol angezeigt, die auch im Melodie Editor erscheint.

```block
music.playMelody("E B C5 A B G A F ", 120);
```

Die Melodien werden am häufigsten im Melodie Editor erstellt, so dass gültige Noten ausgewählt werden und die richtige Melodie Länge gesetzt ist.

## Parameter

* **Melodie**: eine [Zeichenkette](/types/string), die die Noten der Melodie enthält.
* **Tempo**:  eine [Zahl](/types/number), die die Geschwindigkeit, mit der die Melodie gespielt werden soll, in Schlägen pro Minute angibt.

## Beispiel #example

Spiele die `Mystery` Melodie dauerhaft.

```blocks
basic.forever(function () {
    music.playMelody("E F G F E G B C5 ", 120)
})
```

## Siehe auch #seealso

[Setze Tempo](/reference/music/set-tempo), [Wiedergabe](/reference/music/play), [Wiedergabe bis fertig](/reference/music/play-until-done)