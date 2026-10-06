# ERSTE SCHRITTE: EINGABEN

## Anleitung @unplugged

Bisher wurden alle programmierten Texte, Nummern und Bilder unmittelbar nach dem Laden auf die Calliope mini auf der LED-Matrix angezeigt. Wenn du jedoch lieber eine Aktion nach einer bestimmten Eingabe durchführen möchtest, musst du einen der Hauptblöcke aus dem Punkt Eingaben verwenden. In diesem Fall verwenden wir den "wenn Knopf A gedrückt" Block. Durch die Verwendung dieses Blocks wird der Calliope mini warten, bis die gewählte Bedingung erfüllt ist, bevor irgendetwas angezeigt wird.

## Schritt 1 @fullscreen

### Knöpfe
Der Calliope mini hat zwei Eingabetasten: Knopf A (in blau) und Knopf B (in rot). Wenn eine der Tasten gedrückt wird, wird der Stromkreis geschlossen. Mit dem "wenn Knopf A gedrückt" Block aus der Eingabe kann die Ausgabe angesprochen werden, sobald die Taste A gedrückt wurde.

## Schritt 2 @fullscren

### Geschüttelt
Du kannst die Position und Bewegung des Calliope mini abfragen und eine Aktion ausführen, sobald eine Änderung der Werte festgestellt wurde. Benutze den "wenn geschüttelt"-Block aus Eingabe. Füge einen "zeige Text Hi!"-Block aus dem Grundlagen Abschnitt hinzu und ändere den Inhalt der Zeichenkette. unser Text wird angezeigt, wenn der Calliope mini geschüttelt wird. Die Geste kann über das Dropdown-Menü geändert werden, um eine andere Bedingung auszuwählen.

## Schritt 3 @fullscren

### Pins
Der Calliope mini hat sechs goldene, abgerundete Ecken: -, +, 0 , 1, 2 und 3. Wenn du einen Finger auf die – Ecke und einen anderen Finger auf eine der nummerierten Ecken legst, fließt ein kleiner elektrischer Strom durch den Körper und zurück zum Calliope mini, wodurch der Stromkreislauf geschlossen wird.

Benutze den "wenn Pin Pin0 gedrückt" Block aus dem Bereich Eingabe. Verwende den "zeige Text Hi!"-Block aus dem Bereich Grundlagen. Der Text wird angezeigt, wenn Pin – und Pin 0 gleichzeitig gedrückt werden.

## Schritt 4 @fullscren

### Verschiedene Eingaben
Du kannst den Calliope mini so programmieren, um auf mehrere Eingaben zu reagieren. Es gibt zwei Möglichkeiten, dies zu tun: Du kannst voneinander getrennte Ereignisse, mit verschiedenen Aktionen, verwenden, die ausgeführt werden, nachdem diese Bedingung erfüllt ist. Du kannst aber auch eine "wenn..." oder "während..."-Bedingung (aus den Abschnitten Logik und Schleifen) verwenden und warten, bis die Eingaben erfüllt sind.

```blocks
basic.showLeds(`
    . # . # .
    # # # # #
    # # # # #
    . # # # .
    . . # . .`);
```