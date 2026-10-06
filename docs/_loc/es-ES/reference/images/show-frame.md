# Show Frame

The show frame function.

Display an [Image](/reference/images/image) on the @boardname@'s [LED screen](/device/screen)

## JavaScript

```sig
export function showFrame(img: micro_bit.Image, frame: number)
```

## Parameters

* index - [Number](/types/number); which frame of the image to display

## Difference from `plot frame`

The `show frame` function is the same as [plot frame](/reference/images/plot-frame), but contains a built-in delay after the LED screen has been updated (whereas `plot frame` has no built-in delay)

## Ejemplo

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

## Ver también

[crear imagen](/reference/images/create-image), [imagen](/reference/images/image), [mostrar imagen](/reference/images/show-image), [desplazar imagen](/reference/images/scroll-image)