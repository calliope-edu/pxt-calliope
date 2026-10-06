# Pixel

Ottiene lo stato di un pixel in un'[Immagine](/reference/images/image).

## JavaScript

```sig
let item: Image = null;
item.pixel(0, 0)
```

## Parametri

* x - [Numero](/types/number); la *coordinata x* o posizione orizzontale di un pixel in un'[immagine](/reference/images/image)
* y - [Numero](/types/number); la *coordinata y* o posizione verticale di un pixel in un'[immagine](/reference/images/image)

## x, y coordinates?

Per scoprire le coordinate `x`, `y`, vedi [schermo LED](/device/screen).

## Returns

* [Boolean](/blocks/logic/boolean) - `true` for on and `false` for off

## Esempio

Questo esempio ottiene lo stato del pixel `0, 0` nella variabile `img`:

```blocks
let img = images.createImage(`
. . # . . . . . . .
. # . # . . . # . .
. . # . . . . . . .
. # . # . . . # . .. . # . . . . . . .
`)
let state = img.pixel(0, 0)
```

## Vedi anche

[imposta pixel](/reference/images/set-pixel), [mostra immagine](/reference/images/show-image), [immagine](/reference/images/image), [crea immagine](/reference/images/create-image), [scorri immagine](/reference/images/scroll-image)