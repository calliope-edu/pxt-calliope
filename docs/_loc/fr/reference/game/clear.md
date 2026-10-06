# Clear

The clear function for images.

Turn off all the pixels in an [Image](/reference/images/image).

## JavaScript

```sig
export function clear(img: micro_bit.Image)
```

## Paramètres

* aucun

## Exemple

The following example turns off the pixels of `img` when the A input button is pressed:

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

## Voir Aussi

[Image](/reference/images/image), [afficher une image](/reference/images/show-image), [faire défiler une image](/reference/images/scroll-image), [créer une image](/reference/images/create-image)