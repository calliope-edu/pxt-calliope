# Pixelwerte setzen

Setze den Ein-/Ausschalt-Status eines Pixels in einem [Image](/reference/images/image).

## JavaScript

```sig
let item: Image = null;
item.setPixel(0, 0, true)
```

## Parameter

* x - [Zahl](/types/number); die *x-Koordinate* oder horizontale Position eines Pixels in einem [Bild](/reference/images/image)
* y - [Zahl](/types/number); die *y-Koordinate* oder vertikale Position eines Pixels in einem [Bild](/reference/images/image)
* value -[Boolean](/blocks/logic/boolean); der On/Off-Status eines Pixels; `true` für an, `falsch` für ausgeschaltet

## x, y Koordinaten?

Weitere Informationen dazu, wie die LEDs mit `x` und `y` Koordinaten nummeriert sind, siehe [LED-Bildschirm](/device/screen).

## Beispiel

Das folgende Beispiel erzeugt ein Bild und speichert es in der `img` Variable. Die `Set-Pixel-Funktion` schaltet das Mittelpixel ab, bevor `img` mit `show image` angezeigt wird.

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

## Siehe auch

[pixel](/reference/images/pixel), [show image](/reference/images/show-image), [image](/reference/images/image), [create image](/reference/images/create-image), [scroll image](/reference/images/scroll-image)