# Bild

Ein Bild für die @boardname@ LED-Matrix.

## @parent blocks/language

Ein *Bild* ist eine Matrix von Pixeln, die auf dem [LED-Bildschirm](/device/screen) angezeigt werden soll

## Block Editor: LEDs anzeigen

Um ein Bild anzuzeigen:

* Klicke auf `Grundlagen`, `zeige LEDs`, und tippen auf die LEDs

```blocks
basic.showLeds(`
    . . . . .
    . # . # .
    . . . . .
    # . . . #
    . # # # .
    `)
```

## Erstelle ein Bild

Um ein Bild zu erstellen, das du später ändern kannst, sieh dir die Funktion [Bild erstellen](/reference/images/create-image) an.

1. Klicken Sie auf die Kategorie **Bilder** links (unter Fortgeschritten).

2. Ziehe den **zeige Bild** Block in deinen Code.

3. Ziehe und lasse den **erstelle Bild** oder **erstelle großes Bild** Block auf den **zeige Bild** Block fallen, damit sie sich verbinden.

4. Erstelle ein Bild auf dem **erstelle Bild** Block indem du auf die Quadrate klickst.

## Bildfunktionen

* [erstelle Bild](/reference/images/create-image): Erstelle ein Bild aus einer Reihe von An/Aus-LED-Zuständen
* [Bildschirminhalt löschen](/reference/basic/clear-screen): Schalte alle Pixel in einem Bild aus
* [Punkt](/reference/images/pixel): den Status eines Pixels in einem Bild erhalten
* [Zeige LEDs](/reference/basic/show-leds): Zeige ein Einzelbild-Bild auf dem LED-Bildschirm
* [zeige Bild](/reference/images/show-image): ein Bild auf dem Bildschirm anzeigen
* [scrolle Bild](/reference/images/scroll-image): Scrollt ein Bild auf dem Bildschirm

## Siehe auch

[Show LEDs](/reference/basic/show-leds), [create image](/reference/images/create-image), [show image](/reference/images/show-image), [LED screen](/device/screen)