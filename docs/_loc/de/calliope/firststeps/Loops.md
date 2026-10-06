# ERSTE SCHRITTE: SCHLEIFEN

## Anleitung @unplugged

Wie du vielleicht bei früheren Übungen bemerkt hast, wurde das Programm nur einmal von Calliope mini ausgeführt. Um dies zu ändern, können Schleifen verwendet werden. Verwende eine unendliche Schleife, sodass der Text unendlich oft über die LED-Matrix des Calliope mini läuft.

## Schritt 1 @fullscreen

### Endlosschleife
Der einfachste Weg ist, einen dauerhaft Block aus dem Grundlagen-Bereich zu verwenden. Alles innerhalb des Bereichs wird permanent wiederholt.

## Schritt 2 @fullscren

Natürlich kannst du auch angeben, wie oft etwas wiederholt werden soll:

### wiederholen Block
Benutze den "beim Start" Block oder jeden anderen Block, der normalerweise einen einmaligen Durchlauf startet. Nimm den "4-mal wiederholen"-Block aus dem Schleifen Bereich und setze die gewünschte Zahl in das Zahlenfeld ein. Was auch immer die Aufgabe innerhalb dieses Blocks ist, wird für die Anzahl der eingegebenen Zahl ausgeführt.

```blocks
basic.showLeds(`
    . # . # .
    # # # # #
    # # # # #
    . # # # .
    . . # . .`);
```