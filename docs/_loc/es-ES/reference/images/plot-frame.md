# Plot Frame

The plot frame function.

Display an [Image](/reference/images/image) on the @boardname@'s [LED screen](/device/screen)

## JavaScript

```sig
export function plotFrame(_this: micro_bit.Image, index: number)
```

## Parameters

* index - [Number](/types/number); which frame of the image to display

## Difference from `plot image`

The `plot frame` function takes the index of the frame (if there are two frames, then the possible indices are 0 and 1), whereas `plot image` accepts an offset (if there are two frames, the offset would range between 0 and 9).

## Ejemplo

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

## Ver también

[crear imagen](/reference/images/create-image), [imagen](/reference/images/image), [mostrar imagen](/reference/images/show-image), [desplazar limagen](/reference/images/scroll-image)