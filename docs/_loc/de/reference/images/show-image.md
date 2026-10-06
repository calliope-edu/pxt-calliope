# Zeige Bild

Zeigt ein [image](/reference/images/image) (Bild) auf der [LED-Matrix](/device/screen) des @boardname@ an. Nachdem der @boardname@ ein Bild zeigt, wird 400 Millisekunden pausiert (1000 Millisekunden sind eine Sekunde).

```sig
let item: Image = null;
item.showImage(0);
```

## Parameter

* ein [image](/reference/images/image) (Bild). Das ist normalerweise ein Quadrat mit fünf LEDs auf einer Seite, aber es kann auch größer sein. 
* eine [Zahl,](/types/number) die angibt, wie viele LEDs von der linken Seite des Bildes des @boardname@ gestartet werden soll. `0` bedeutet, dass der erste **Frame ** des Bildes gestartet wird, `5` bedeutet, am zweiten Frame zu starten, `10` bedeutet, am dritten zu starten, und so weiter.

## Beispiel: Flip-Flop-Pfeil

Dieses Programm erstellt ein großes Bild mit einem Frame von einem Pfeil nach oben, und einem Pfeil nach unten. Wenn du den Knopf `A` drückst, wird das Programm `zeige Bild` verwenden, um den Pfeil nach oben anzuzeigen. (Es startet `0` LEDs von links im großen Bild. Wenn du die Taste `B` drückst, wird das Programm `zeige Bild` verwenden, um den Pfeil anzuzeigen, der nach unten zeigt und der `5` LEDs von links startet.

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

[Bild](/reference/images/image), [Bild erstellen](/reference/images/create-image), [Großes Bild erstellen](/reference/images/create-big-image), [Bild scrollen](/reference/images/scroll-image)