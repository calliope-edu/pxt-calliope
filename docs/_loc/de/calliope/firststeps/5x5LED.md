# ERSTE SCHRITTE: DIE 5X5 LED-MATRIX

## Anleitung @unplugged

Der Calliope mini enthält unter anderem 25 rote LEDs, die einzeln ein- und ausgeschaltet werden können. Wenn du zum Beispiel deinen Namen anzeigen möchtest kannst du einzelne LEDs so programmieren, dass sie die Buchstaben deines Namens nacheinander anzeigen. Da dies ziemlich komplex wäre, kannst du auch den Text in ein Textfeld eintragen und der Calliope mini lässt die notwendigen LEDs in der richtigen Reihenfolge leuchten.

## Schritt 1 @fullscreen


### EINEN TEXT ANZEIGEN
Um die Ausgabe der LED-Matrix anzuzeigen, wählst du den Block zeige Text aus dem Grundlagen Menü. Ziehe nun diesen Block und füge ihn an den Start-Block im Hauptbildschirm an. Der Text, der in den Hochkommas enthalten ist, wird nun beim Start des Programms auf dem Calliope mini angezeigt.

```blocks
basic.showString("hi!")
```

## Schritt 2 @fullscreen

### ANZEIGEN VON ZAHLEN
Wenn du lieber eine Zahl anstelle von Text anzeigen möchtest, ersetze den Textblock im Hauptbildschirm durch den Block zeige Zahl aus dem Grundlagen Menü.

```blocks
basic.showNumber(0)
```

## Schritt 3 @fullscreen

### ANZEIGEN VON BILDERN
Um einen Herz, einen Smiley oder sogar eine Ente auf deinem Calliope mini zu zeigen wähle den "Zeige Symbol"-Baustein aus dem "Basic Menü" und wähle ein beliebiges Bilde aus, indem du einfach auf das Bild im Block klickst.

```blocks
basic.showIcon(IconNames.Heart)
```

## Schritt 4 @fullscreen

Du kannst auch deine eigenen Bilder erstellen: Wähle einfach diesen Block aus dem Grundlagen Menü aus und klicke in die Kästchen, um dein eigenes Bild zu erstellen.

```blocks
basic.showLeds(`
    . . . . .
    . . . . .
    . . . . .
    . . . . .
    . . . . .
    `)
```

## Schritt 4 @fullscreen

Wenn du keine Pause zwischen 2 Bildern festlegst, zeigt der Calliope mini das erste Bild null Sekunden lang, also gar nicht. Den pausiere(ms) Block findest du im Grundlagen Menü.

```blocks
basic.showIcon(IconNames.Heart)
basic.pause(100)
basic.showIcon(IconNames.Yes)
```