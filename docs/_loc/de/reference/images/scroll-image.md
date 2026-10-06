# Scrolle Bild

Scrollt (gleitet) ein [image](/reference/images/image) (Bild) von einer Seite zur anderen Seite des [LED-Bildschirms](/device/screen).

```sig
let item: Image = null;
item.scrollImage(5, 200);
```

## Parameter

* eine [Zahl,](/types/number) die angibt, wie viele LEDs gleichzeitig, von rechts nach links oder von links nach rechts gescrollt werden sollen. Du musst eine positive Zahl wie `2` verwenden. Wenn du `5` oder `-5` verwendest, wird das Bild direkt einen **Frame** scrollen. Ein Frame oder Rahmen ist ein Teil des Bildes. Es ist ein Quadrat mit fünf LEDs auf der Seite. Das ist nützlich für **Animationen**.

* eine [Zahl,](/types/number) die angibt, wie viele Millisekunden gewartet werden soll, bevor der von `Offset` vorgegebene Betrag gescrollt wird. (1000 Millisekunden sind eine Sekunde.) Je größer diese Zahl gewählt wird, desto langsamer wird das Bild scrollen.

## Beispiel

Dieses Programm scrollt ein Bild von zwei Pfeilen fünf LEDs gleichzeitig, mit einer Pause von 200 Millisekunden zwischen jedem Mal wenn es scrollt. Da jeder Frame fünf LEDs breit ist, sieht dieses Programm so aus, als ob es nur einen Pfeil drehen und und ein Kippen animieren. Natürlich kannst du stattdessen zwei beliebige Frames verwenden.

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

## Siehe auch

[Bild anzeigen](/reference/images/show-image), [Bild](/reference/images/image), [Bild erstellen](/reference/images/create-image)