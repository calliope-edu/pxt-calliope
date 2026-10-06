# Plot Frame

The plot frame function.

Display an [Image](/reference/images/image) on the @boardname@'s [LED screen](/device/screen)

## JavaScript

```sig
export function plotFrame(_this: micro_bit.Image, index: number)
```

## Paramètres

* index - [Number](/types/number); which frame of the image to display

## Difference from `plot image`

The `plot frame` function takes the index of the frame (if there are two frames, then the possible indices are 0 and 1), whereas `plot image` accepts an offset (if there are two frames, the offset would range between 0 and 9).

## Exemple

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

## Voir Aussi

[créer une image](/reference/images/create-image), [image](/reference/images/image), [afficher une image](/reference/images/show-image), [faire défiler une image](/reference/images/scroll-image)