# Scroll Image

Scroll (slide) an [image](/reference/images/image) (picture) from one side to the other of the [LED screen](/device/screen).

```sig
let item: Image = null;
item.scrollImage(5, 200);
```

## Paramètres

* a [number](/types/number) that means how many LEDs to scroll at a time from right to left. You must use a positive number like `2`. If you use `5`, the image will scroll one **frame** at a time. (A frame is a part of the image. It is a square with five LEDs on a side). This is useful for **animation**.

* a [number](/types/number) that means how many milliseconds to wait before scrolling the amount that `offset` says. (1000 millisecondes correspondent à une seconde.) Plus ce nombre est grand, plus l'image défilera lentement.

## Exemple

Ce programme fait défiler une image de deux flèches, cinq LED à la fois, avec une pause de 200 millisecondes entre chaque défilement. Because each frame is five LEDs wide, that means this program will look like it's animating one arrow flipping and flopping. Of course, you can use any two frames you want instead.

```blocks
let arrows = images.createBigImage(`
    . . # . .   . . # . .
    . # # # .   . . # . .
    # . # . #   # . # . #
    . . # . .   . # # # .
    . . # . .   . . # . .
    `);
basic.forever(() => {
    arrows.scrollImage(5, 200);
}); 
```

## Voir Aussi

[afficher une image](/reference/images/show-image), [image](/reference/images/image), [créer une image](/reference/images/create-image)