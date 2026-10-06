# ERSTE SCHRITTE: DAS 5X5 LED RASTER

## Anleitung @unplugged

Neben der roten LED-Matrix verfügt der Calliope mini auch über einen integrierten Lautsprecher (oder ein Piezo-Lautsprecher, um genauer zu sein), mit dem du verschiedene Töne abspielen kannst. Außerdem beinhaltet der Calliope mini eine RGB-LED, mit der du eine Vielzahl unterschiedlicher Farben anzeigen kannst.

## Schritt 1 @fullscreen

### Die RGB-LED
Der weiße kleine Kasten unter der LED-Matrix ist die RGB-LED. Das funktioniert genau wie mit Wasserfarben. In dieser LED sind drei kleinere LEDs: eine rote, eine grüne und eine blaue. Wenn du eine Farbe bei deiner Programmierung auswählst, so wird diese automatisch aus den drei Grundfarben gemischt und auf dem Calliope mini angezeigt,

Im Grundlagen Menü findest du den Block "setze RGB-LED Farbe auf rot", damit kannst du eine vorgefertigte Farbe auswählen und

## Schritt 2 @fullscreen

### Helligkeitssensor
Das Umgebungslicht kann mit der LED-Matrix gemessen werden. Du kannst den Lichtsensor aktivieren, indem du den "Lichtstärke" Block aus dem Menü Eingabe auswählst und in den Block ||basic: zeige Zahl|| aus dem Grundlagen Menü integrierst. Mit diesem Block kannst du die Farbe ändern, die du anzeigen möchtest. Klicke einfach auf das rote Feld und wähle eine andere Farbe aus dem Menü. Um die Farbe wieder auszuschalten, kannst du den Block "eingebaute RGB-LED ausschalten" in deine Programmierung integrieren oder die Farbe Schwarz auswählen.

## Schritt 3 @fullscreen

### Der Lautsprecher
Du kannst individuelle Töne oder kurze Musikstücke abspielen lassen. Die nötigen Blöcke findest du im Musik Menü. Ziehe den Block "Note (Hz) für 1 Schlag" in die Programmierung und ändere die Tonhöhe, um zu sehen, wie sich der Ton verändert.

```blocks
basic.showLeds(`
    . # . # .
    # # # # #
    # # # # #
    . # # # .
    . . # . .`);
```