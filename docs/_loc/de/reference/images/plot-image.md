# Plot Image

Die plot image Funktion.

Zeige ein [Image](/reference/images/image) auf der [LED-Anzeige](/device/screen) des @boardname@ an

## JavaScript

```sig
export function plotImage(_this: micro_bit.Image, xOffset: number)
```

## Parameter

* x offset - [Zahl](/types/number); der horizontale Startpunkt eines Bildes; verwende 0 für den ersten Rahmen des Bildes, 5 für den zweiten Rahmen des Bildes, 10 für den dritten Rahmen und so weiter.

## Unterschied zu `show image`

Die `Bild anzeigen` Funktion hat eine eingebaute Verzögerung von 400ms nach der Anzeige des Bildes, während `` keine eingebaute Verzögerung hat.

## Beispiel

```blocks
let img = images.createImage(`
# . . . # # . . . #
. # . # . . # # # .
. . # . . . # # # .
. # . # . . # # # .
# . . . # # . . . #
`)
img.plotImage(0)
```

## Siehe auch

[Bild erstellen](/reference/images/create-image), [Bild](/reference/images/image), [Bild anzeigen](/reference/images/show-image), [Bild scrollen](/reference/images/scroll-image)