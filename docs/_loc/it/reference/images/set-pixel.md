# Set Pixel

Imposta lo stato on/off del pixel in un'[immagine](/reference/images/image).

## JavaScript

```sig
let item: Image = null;
item.setPixel(0, 0, true)
```

## Parametri

* x - [Numero](/types/number); la *coordinata x* o posizione orizzontale di un pixel in un'[immagine](/reference/images/image)
* y - [Numero](/types/number); la *coordinata y* o posizione verticale di un pixel in un'[immagine](/reference/images/image)
* value -[Boolean](/blocks/logic/boolean); the on/off state of a pixel; `true` for on, `false` for off

## x, y coordinates?

Per scoprire le coordinate `x`, `y`, vedi [schermo LED](/device/screen).

## Esempio

L'esempio seguente crea un'immagine e la memorizza nella variabile `img`. The `set pixel` function sets the center pixel off, before `img` is shown using `show image`.

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

# # Vedi anche

[pixel](/reference/images/pixel), [show image](/reference/images/show-image), [image](/reference/images/image), [create image](/reference/images/create-image), [scroll image](/reference/images/scroll-image)