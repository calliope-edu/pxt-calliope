# Afficher l'image

Show an [image](/reference/images/image) (picture) on the [LED screen](/device/screen). After the @boardname@ shows an image, it will pause for 400 milliseconds (1000 milliseconds is one second).

```sig
let item: Image = null;
item.showImage(0);
```

## Paramètres

* an [image](/reference/images/image) (picture). It is usually a square with five LEDs on a side, but it might be wider. 
* a [number](/types/number) that says how many LEDs from the left of the picture the @boardname@ should start. `0` means start at the first **frame** of the picture, `5` means start at the second frame, `10` means start at the third, and so on.

## Example: Flip-flopping arrow

This program makes a big image with a frame of an arrow pointing up, and a frame of an arrow pointing down. Si vous appuyez sur le bouton `A`, le programme utilisera `Afficher l'image` pour afficher la flèche pointant vers le haut. (Il démarre `0` LED à partir de la gauche sur la grande image.) Si vous appuyez sur le bouton `B`, le programme utilisera `Afficher l'image` pour afficher la flèche pointant vers le bas, ce qui démarre `5` LED à partir de la gauche.

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

[image](/reference/images/image), [créer une image](/reference/images/create-image), [agrandir une image](/reference/images/create-big-image), [faire défiler une image](/reference/images/scroll-image)