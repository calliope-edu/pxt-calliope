# Crear imagen

Make an [image](/reference/images/image) (picture) for the @boardname@ [LED screen](/device/screen).

```sig
images.createImage(`
. . # . .
. # # # .
# # # # #
. # # # .
. . # . .
`)
```

## Parameters

* `leds` is a [string](/types/string) that says which LEDs on the screen should be on and which should be off.

## Example: Flip-flopping arrow

If you press button `A`, this program will make a picture of an arrow and show it on the LED screen. If you press button `B`, the program will show a picture of the arrow upside-down.

```blocks
input.onButtonEvent(Button.A, input.buttonEventClick(), () => {
    images.createImage(`
        . . # . .
        . # # # .
        # . # . #
        . . # . .
        . . # . .
        `).showImage(0)
});
input.onButtonEvent(Button.B, input.buttonEventClick(), () => {
    images.createImage(`
        . . # . .
        . . # . .
        # . # . #
        . # # # .
        . . # . .
        `).showImage(0)
})
```

## Ver también

[imagen](/reference/images/image), [crear imagen grande](/reference/images/create-big-image), [mostrar imagen](/reference/images/show-image), [desplazar imagen](/reference/images/scroll-image)