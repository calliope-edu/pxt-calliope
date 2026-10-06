# Frame zeichnen

Die Plotframefunktion.

Zeige ein [Bild](/reference/images/image) auf der [LED-Anzeige](/device/screen) des @boardname@ an

## JavaScript

```sig
export function plotFrame(_this: micro_bit.Image, index: number)
```

## Parameter

* index - [Zahl](/types/number); welcher Rahmen des Bildes angezeigt werden soll

## Unterschied zu `plot image`

Die `plot frame` Funktion nimmt den Index des Frames (wenn es zwei Frames gibt, dann sind die möglichen Indizes 0 und 1), während `plot image` einen Offset akzeptiert (wenn es zwei Frames gibt, würde der Offset zwischen 0 und 9 liegen).

## Beispiel

```blocks
let img = images.createImage(`
# . . . # # . . . #
. # . # . . # # # .
. . # . . . # # # .
. # . # . . # # # .
# . . . # # . . . #
`)
img.plotFrame(1)
```

## Siehe auch

[Bild erstellen](/reference/images/create-image), [Bild](/reference/images/image), [Bild anzeigen](/reference/images/show-image), [Bild scrollen](/reference/images/scroll-image)