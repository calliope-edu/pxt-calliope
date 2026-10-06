# Pixel

Erhalte den Status eines Pixels in einem [Image](/reference/images/image) (Bild).

## JavaScript

```sig
let item: Image = null;
item.pixel(0, 0)
```

## Parameter

* x - [Zahl](/types/number); die *x-Koordinate* oder horizontale Position eines Pixels in einem [Bild](/reference/images/image)
* y - [Zahl](/types/number); die *y-Koordinate* oder vertikale Position eines Pixels in einem [Bild](/reference/images/image)

## x, y Koordinaten?

Weitere Informationen dazu, wie die LEDs mit `x` und `y` Koordinaten nummeriert sind, siehe [LED-Bildschirm](/device/screen).

## Rückgabewert

* [Boolean](/blocks/logic/boolean) - `wahr` für an und `false` für aus

## Beispiel

Dieses Beispiel ruft den Status von Pixel `0, 0` in der `img` Variable ab:

```blocks
let img = images.createImage(`
. . # . . . . . . .
. # . # . . . # . .
. . # . . . . . . .
. # . # . . . # . .. . # . . . . . . .
`)
let state = img.pixel(0, 0)
```

## Siehe auch

[set pixel](/reference/images/set-pixel), [show image](/reference/images/show-image), [image](/reference/images/image), [create image](/reference/images/create-image), [scroll image](/reference/images/scroll-image)