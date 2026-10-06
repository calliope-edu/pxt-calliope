# Zeige Frame

Die show frame Funktion.

Zeige ein [Image](/reference/images/image) (Bild) auf der [LED-Matrix](/device/screen) des @boardname@ an

## JavaScript

```sig
export function showFrame(img: micro_bit.Image, frame: number)
```

## Parameter

* Index - [Zahl](/types/number); welcher Frame des anzuzeigenden Bildes

## Unterschied zu `Zeichne Frame`

Die `show Frame` Funktion ist die gleiche wie [Zeichne-Frame](/reference/images/plot-frame), aber enthält eine eingebaute Verzögerung, nachdem die LED-Matrix aktualisiert wurde (während `Zeichne-Frame` keine eingebaute Verzögerung hat)

## Beispiel

```blocks
let img = images.createImage(`
# . . . # # . . . #
. # . # . . # # # .
. . # . . . # # # .
. # . # . . # # # .
# . . . # # . . . #
`)
img.showFrame(1)
```

## Siehe auch

[Bild erstellen](/reference/images/create-image), [Bild](/reference/images/image), [Bild anzeigen](/reference/images/show-image), [Bild scrollen](/reference/images/scroll-image)