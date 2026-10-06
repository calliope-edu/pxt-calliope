# Width (Weite)

Die width Funktion.

Abrufen der Breite eines [Bildes](/reference/images/image) in Spalten.

```sig
images.createImage().width();
```

## Rückgabewert

* [Zahl](/types/number) - die Anzahl der Spalten in einem Bild. Diese Funktion gibt 5 zurück, wenn das Bild 1 Frame, 10 für 2 Frames, 15 für 3 Frames usw. hat. Teile die Anzahl der Spalten durch 5 um herauszufinden, wie viele Bilder ein Bild hat (siehe Beispiel unten).

Das folgende Beispiel ruft die Breite von `img` ab und speichert sie in der `w` Variable:

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

## Beispiel: Jedes Frame anzeigen

Das folgende Beispiel verwendet die `width` Funktion mit einer [for](/blocks/loops/for) Schleife, um jeden Frame auf dem Bildschirm anzuzeigen:

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

## Siehe auch

[Bild](/reference/images/show-image), [Bild](/reference/images/image), [Bild erstellen](/reference/images/create-image), [Bild scrollen](/reference/images/scroll-image)