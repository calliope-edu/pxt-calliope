# LED-Matrix

```sim
    basic.showLeds(`
        # . # . #
        . # . # .
        # . # . #
        . # . # .
        # . # . #
        `);
```

Die Calliope mini LED-Matrix besteht aus 25 roten LED-Leuchten, die in einem 5x5 Raster angeordnet sind (5 LEDs quer und 5 LEDs nach unten). Auf der LED-Matrix oben haben wir mit den LEDs ein Schachbrettmuster erstellt.

## Welche LED?

Du verwendest `(x ,y)` Koordinaten, um eine bestimmte LED im Raster anzugeben; wobei `x` die horizontale Position ist (0,1,2,3, ) und `y` ist die vertikale Position (0, 1, 2, 3, 4).

Um die Koordinaten `x`, `y` zu ermitteln, positioniere den Calliope mini horizontal wie eine Kreditkarte (siehe Bild oben).

Hier sind die x-, y-Koordinaten für die LEDs im 5X5-Raster:

`(0,0)` `(1,0)` `(2,0)` `(3,0)` `(4,0)`

`(0,1)` `(1,1)` `(2,1)` `(3,1)` `(4,1)`

`(0,2)` `(1,2)` `(2,2)` `(3,2)` `(4,2)`

`(0,3)` `(1,3)` `(2,3)` `(3,3)` `(4,3)`

`(0,4)` `(1,4)` `(2,4)` `(3,4)` `(4,4)`

Die x, y Koordinaten für die LED in der Mitte des Gitters sind `(2,2)`. Ab `(0,0)` zähle über 2 Spalten und dann 2 Zeilen.

## Prüfe dein Verständnis

Welche LEDs sind im obigen Schachbrett-Muster eingeschaltet?

## Zeile, Spalte - 1

Da die Zeilen- und Spaltennummern bei 0 beginnen, ist dies ein einfacher Weg, um die (x,y) Koordinaten von der Zeile und der Spaltennummer mit 1 abzuziehen (wenn mit 1 gezählt wird). Mit anderen Worten, um die LED in der 4. Spalte 5. Zeile anzugeben, subtrahieren 1 von jeder Zahl, um die Koordinaten `(3,4)` zu erhalten.

## Schalte eine LED ein/aus

Verwende [Zeichne](/reference/led/plot) und [Lösche](/reference/led/unplot), um eine LED ein- oder auszuschalten

```blocks
led.plot(0,0);
led.plot(1,1);
basic.pause(1000);
led.unplot(0,0);
basic.pause(1000);
led.unplot(1,1);
```

## Ist eine LED ein-/ausgeschaltet?

Verwenden die [Punkt](/reference/led/point) Funktion, um herauszufinden, ob eine LED ein- oder ausgeschaltet ist.

```blocks
if(led.point(0,0)) {
}
```

## Bilder, Zeichenketten und Zahlen anzeigen

Anstatt wie oben einzelne LEDs ein- oder auszuschalten kannst du ein [Bild](/reference/images/image) direkt auf der LED-Matrix anzeigen oder Text und Zahlen auf der Matrix anzeigen, indem du die [Anzeigennummer](/reference/basic/show-number) und [Anzeigenfolge](/reference/basic/show-string) Funktionen verwendest.

## Der Anzeigepuffer

Die Calliope mini Laufzeit hält eine Darstellung des Zustands aller 25 LEDS im Speicher. Dieser Zustand wird als "Displaypuffer" bezeichnet und steuert welche LEDs aktiviert sind und welche ausgeschaltet sind. Die Zeichne-, Lösche- und Punktfunktionen greifen direkt auf den Anzeigepuffer zu. Auf der anderen Seite überschreiben die Funktionen, die ein Bild, eine Zahl oder eine Zeichenkette anzeigen, den Puffer vollständig. Um dies zu veranschaulichen, probiere zuerst diese Code-Sequenz

```blocks
basic.showString("d")
led.plot(0, 0)
```

Du siehst den Buchstaben "d" sowie die LED an der Position `0,0` leuchten. Versuche nun, die Reihenfolge der beiden obigen Anweisungen umzukehren:

```blocks
led.plot(0, 0)
basic.showString("d")
```

Die LED wird nicht an der Position `0,0` beleuchtet, da die `Zeichenkette` Funktion den gesamten Anzeigepuffer überschreibt.

## Pins: P3, P4, C6, C7, C9, C10

Diese Pins sind an die LED-Matrixanzeige gekoppelt über die auch die Umgebungslichterkennung erfolgt. Um die Display-Treiberfunktion zu deaktivieren (die die Licht-Erkennungsfunktion automatisch deaktiviert) rufe die DAL-Funktion [led.enable)](/reference/led/enable) auf.

Weitere Informationen unter http://tech.microbit.org/Hardware/edgeconnector_ds/.