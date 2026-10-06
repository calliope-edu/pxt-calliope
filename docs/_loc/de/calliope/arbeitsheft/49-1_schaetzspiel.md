# 49 1 Schätzspiel

```ghost
let Entfernung = 0
input.onButtonEvent(Button.A, input.buttonEventValue(ButtonEvent.Click), function () {
    Entfernung = Math.round(grove.measureInCentimeters(DigitalPin.C16))
})
input.onButtonEvent(Button.B, input.buttonEventValue(ButtonEvent.Click), function () {
    basic.showNumber(Entfernung)
})
basic.forever(function () {
    basic.showLeds(`
        . # # . .
        . . . # .
        . . # . .
        . . . . .
        . . # . .
        `)
})
```

```package
grove=github:calliope-edu/pxt-grove
```

## Schätzspiel @showdialog

Programmiere ein Schätzspiel, das den Abstand zwischen zwei Objekten misst. Das
Calliope mini misst die Distanz - im Geheimen. Du schätzt die Distanz und der Calliope mini löst und zeigt die gemessene Distanz an.

## Aufgabe @showdialog

Drücke Knopf A, um die Entfernung zu messen und sie in einer Variable zu speichern. Drücke Knopf B, um den gespeicherten Wert der Variablen auf dem Display anzuzeigen.

## Tastenereignisse hinzufügen

Füge den Block `||input.wenn Knopf A geklickt||` zweimal ein und ändere bei einem Block den Knopf in `B`. Tipp: Du kannst den Block duplizieren, indem Du mit der rechten Maustaste klickst.

## Variable definieren

Um den Abstand beim Drücken der Taste zu speichern und später wieder aufzurufen, erstellen eine `||Variable.Variable||` und nenne Sie _Entfernung_.

```
```

![image/variable](image/variable)

## Entfernung speichern

Verwende den Block `||grove.Ultraschallsensor (in cm)||` um die Entfernung zu bestimmen.
**Hinweis:** Im Tutorial ist die `||grove.Grove Erweiterung||` bereits integriert. Im Editor musst du sie zuerst hinzufügen.

Wenn Knopf `||input.A||` geklickt wird, speichere den Messwert mit dem `||variable.setze Entfernung auf||` Block der Variablen `Enfernung`.

## Wert speichern

Rufe nun den gespeicherten Wert der Variablen `||variables.Entfernung||` ab und zeige sie auf dem Display an, wenn Knopf B gedrückt wird. Benutze dazu den Block `||basic.zeige Zahl||` und füge ihn zusammen mit der Variablen in den Block `||input.wenn Knopf B geklickt||` ein.

## Testen

Teste dein Programm! Du wirst feststellen, dass die Werte des Ultraschallsensors recht lang sind. Die Werte sind sehr präzise und noch nicht gerundet.
Du musst den Wert des Ultraschallsensors, den du in der Variable `||variables.setze Entfernung auf||` gespeichert hast `||Math.runden||`.

## Fragezeichen anzeigen

Lasse zum Schluss dauerhaft ein "?" auf der LED-Matrix erscheinen. Zeichne ein ? mit dem Block `||basic.show leds||`.

## Fertig! 👏

Klicken Sie auf `|Download|`, teste Dein Programm mit dem Calliope mini und versuche die Entfernung richtig zu schätzen!