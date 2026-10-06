# Bilder

Erstellen, anzeigen und Scrollen von Bildern auf der LED-Anzeige.

```cards
images.createImage(`
. . . . .
. . . . .
. . # . .
. . . . .
. . . . .
`);
images.createBigImage(`
. . . . .
. . . . .
. . # . .
. . . . .
. . . . .
`);
images.createImage(``).showImage(0);
images.createImage(``).scrollImage(0,0);
images.iconImage(IconNames.Heart)
```

## Siehe auch

[createImage](/reference/images/create-image), [createBigImage](/reference/images/create-big-image), [showImage](/reference/images/show-image), [scrollImage](/reference/images/scroll-image), [iconImage](/reference/images/icon-image), [pixel](/reference/images/pixel), [set-pixel](/reference/images/set-pixel)