# Créer une grande image

Make a big [image](/reference/images/image) (picture) for the @boardname@ [LED screen](/device/screen). The big image made of two squares. Each of the squares is five LEDs on a side, like a regular image.

```sig
images.createBigImage(`
    . . # . .   . . # . .
    . # # # .   . . # . .
    # . # . #   # . # . #
    . . # . .   . # # # .
    . . # . .   . . # . .
    `);
```

## Paramètres

* `leds` is a [string](/types/string) that says which LEDs on the screen should be on and which should be off.

## Example: Flip-flopping arrow

This program makes a big image with a picture of an arrow pointing up, and an arrow pointing down. If you press button `A`, the program will show the arrow pointing up, which starts `0` LEDs from the left in the big image. If you press button `B`, the program will show the arrow pointing down, which starts `5` LEDs from the left.

```blocks
let arrows = images.createBigImage(`
    . . # . .   . . # . .
    . # # # .   . . # . .
    # . # . #   # . # . #
    . . # . .   . # # # .
    . . # . .   . . # . .
    `);
input.onButtonEvent(Button.A, input.buttonEventClick(), () => {
    arrows.showImage(0);
});
input.onButtonEvent(Button.B, input.buttonEventClick(), () => {
    arrows.showImage(5);
});
```

## Voir Aussi

[image](/reference/images/image), [créer une image](/reference/images/create-image), [afficher une image](/reference/images/show-image), [faire défiler une image](/reference/images/scroll-image)