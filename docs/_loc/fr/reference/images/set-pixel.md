# Set Pixel

Set the on/off state of pixel in an [Image](/reference/images/image).

## JavaScript

```sig
let item: Image = null;
item.setPixel(0, 0, true)
```

## Paramètres

* x - [Number](/types/number); the *x coordinate* or horizontal position of a pixel in an [image](/reference/images/image)
* y - [Number](/types/number); the *y coordinate* or vertical position of a pixel in an [image](/reference/images/image)
* value -[Boolean](/blocks/logic/boolean); the on/off state of a pixel; `true` for on, `false` for off

## coordonnées x, y?

To figure out the `x`, `y` coordinates, see [LED screen](/device/screen).

## Exemple

The following example creates an image and stores it in the `img` variable. The `set pixel` function sets the center pixel off, before `img` is shown using `show image`.

```blocks
let img = images.createImage(`
. . # . .
. # . # .
. . # . .
. # . # .
. . # . .
`)
img.setPixel(2, 2, false)
img.showImage(0)
```

Voir aussi

[pixel](/reference/images/pixel), [show image](/reference/images/show-image), [image](/reference/images/image), [create image](/reference/images/create-image), [scroll image](/reference/images/scroll-image)