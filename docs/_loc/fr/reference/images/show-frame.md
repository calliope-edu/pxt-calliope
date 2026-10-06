# Show Frame

The show frame function.

Display an [Image](/reference/images/image) on the @boardname@'s [LED screen](/device/screen)

## JavaScript

```sig
export function showFrame(img: micro_bit.Image, frame: number)
```

## Paramètres

* index - [Number](/types/number); which frame of the image to display

## Difference from `plot frame`

The `show frame` function is the same as [plot frame](/reference/images/plot-frame), but contains a built-in delay after the LED screen has been updated (whereas `plot frame` has no built-in delay)

## Exemple

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

## Voir Aussi

[créer une image](/reference/images/create-image), [image](/reference/images/image), [afficher une image](/reference/images/show-image), [faire défiler une image](/reference/images/scroll-image)