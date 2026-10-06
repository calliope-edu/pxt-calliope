# Clear

Die Löschfunktion für Bilder.

Schaltet alle Pixel in einem [Image](/reference/images/image) aus.

## JavaScript

```sig
export function clear(img: micro_bit.Image)
```

## Parameter

* nichts

## Beispiel

Das folgende Beispiel schaltet die Pixel von `img` aus, wenn die A Taste gedrückt wird:

```blocks
let img = images.createImage(`
. . . . .
. # # # .
. # # # .
. # # # .
. . . . .
`)
img.showImage(0)
input.onButtonEvent(Button.A, input.buttonEventValue(ButtonEvent.Down), () => {
    img.clear()
    img.showImage(0)
})
```

## Siehe auch

[Bild](/reference/images/image), [Bild anzeigen](/reference/images/show-image), [Bild scrollen](/reference/images/scroll-image), [Bild erstellen](/reference/images/create-image)