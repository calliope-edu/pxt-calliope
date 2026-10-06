# Erstelle großes Bild

Zeige ein großes [image](/reference/images/image) (Bild) auf der [LED-Anzeige](/device/screen) des @boardname@ an. Das große Bild besteht aus zwei Quadraten. Jedes der Quadrate ist fünf LEDs pro Seite groß, wie ein normales Bild.

```sig
images.createBigImage(`
    . . # . .   . . # . .
    . # # # .   . . # . .
    # . # . #   # . # . #
    . . # . .   . # # # .
    . . # . .   . . # . .
    `);
```

## Parameter

* `leds` ist eine [Zeichenkette ](/types/string) die bestimmt, welche LEDs auf dem Bildschirm an- und welche ausgeschaltet sein sollen.

## Beispiel: Flip-Flop-Pfeil

Dieses Programm erstellt ein großes Bild mit einem Bild von einem Pfeil nach oben, und einem Pfeil nach unten. Wenn du den Knopf `A` drückst, zeigt das Programm den Pfeil nach oben, der`0` LEDs von links im großen Bild startet. Wenn du die Taste `B`drückst, zeigt das Programm den Pfeil nach unten, der `5` LEDs von links startet.

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

## Siehe auch

[Bild](/reference/images/image), [Bild erstellen](/reference/images/create-image), [Bild anzeigen](/reference/images/show-image), [Bild scrollen](/reference/images/scroll-image)