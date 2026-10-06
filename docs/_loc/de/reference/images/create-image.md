# Erstelle Bild

Erstellt ein [image](/reference/images/image) (Bild) für die [LED-Matrix](/device/screen) des @boardname@.

```sig
images.createImage(`
. . # . .
. # # # .
# # # # #
. # # # .
. . # . .
`)
```

## Parameter

* `leds` ist eine [Zeichenkette ](/types/string) die bestimmt, welche LEDs auf dem Bildschirm an- und welche ausgeschaltet sein sollen.

## Beispiel: Flip-Flop-Pfeil

Wenn du Knopf `A` drückst, wird dieses Programm ein Bild von einem Pfeil erstellen und es auf dem LED-Bildschirm anzeigen. Wenn du Knopf `B` drückst, zeigt das Programm ein Bild des Pfeil nach unten.

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

## Siehe auch

[Bild](/reference/images/image), [Großes Bild erstellen](/reference/images/create-big-image), [Bild anzeigen](/reference/images/show-image), [Bild scrollen](/reference/images/scroll-image)