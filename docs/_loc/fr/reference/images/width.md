# Largeur

La fonction de largeur.

Obtenez la largeur d'une [Image](/reference/images/image) en colonnes.

```sig
images.createImage().width();
```

## Valeur retournée

* [Number](/types/number) - the number of columns in a image. This function returns 5 if the image has 1 frame, 10 for 2 frames, 15 for 3 frames and so on. Divisez le nombre de colonnes par 5 pour savoir combien d'images contient une image (voir exemple ci-dessous).

The following example gets the width of `img` and stores it in the `w` variable:

## ~hide

```blocks
let img = images.createImage(`
. . # . . . . . . .
. # . # . . . # . .
. . # . . . . . . .
. # . # . . . # . .
. . # . . . . . . .
`)
```

## ~

```typescript-ignore
let w = img.width()
```

## Example: show each frame

The following example uses the `width` function with a [for](/blocks/loops/for) loop to show each image frame on the screen:

```typescript
let img2 = images.createImage(`
. . # . . . # # # # . # # # .
. # # . . . . . . # . . . # .
. . # . . . . . # . . . # . .
. . # . . . . # . . . . . # .
. . # . . . # # # # . # # # .
`)
for (let i = 0; i < img2.width() / 5; i++) {
    img2.showImage(i * 5)
    basic.pause(1000)
}
```

## Voir Aussi

[show image](/reference/images/show-image), [image](/reference/images/image), [create image](/reference/images/create-image), [scroll image](/reference/images/scroll-image)