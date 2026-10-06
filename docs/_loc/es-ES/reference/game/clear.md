# Borrar

The clear function for images.

Turn off all the pixels in an [Image](/reference/images/image).

## JavaScript

```sig
export function clear(img: micro_bit.Image)
```

## Parameters

* ninguno

## Ejemplo

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

## Ver también

[Imagen](/reference/images/image), [mostrar imagen](/reference/images/show-image), [desplazar imagen](/reference/images/scroll-image), [crear imagen](/reference/images/create-image)