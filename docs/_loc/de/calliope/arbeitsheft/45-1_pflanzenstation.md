# 45 1 Pflanzenstation

```ghost
input.onButtonEvent(Button.A, input.buttonEventClick(), function () {
    if (input.lightLevel() > 50) {
        basic.showIcon(IconNames.Yes)
    } else {
        basic.showLeds(`
            # . # . #
            . # # # .
            # # # # #
            . # # # .
            # . # . #
            `)
    }
})
input.onButtonEvent(Button.B, input.buttonEventClick(), function () {
    basic.showNumber(input.temperature())
})
basic.forever(function () {
if (grove.measureMoistureAnalog(AnalogPin.C16, MoistureMode.Original, MoistureOutput.Number) < 300) {
      basic.setLedColor(0x00ff00)
  } else {
      basic.setLedColor(0xff0000)
  }
})
```

## Pflanzenstation @showdialog

Programmiere eine Pflanzenstation, die dir hilft, die Pflanzen im Klassenzimmer bestmöglich zu versorgen. Pflanzen brauchen **Wasser**, **Sonnenlicht** und die richtige
**Temperatur** spielt ebenfalls eine wichtige Rolle.

## Temperatur messen @showdialog

**Temperatur** - Wenn Knopf B gedrückt wird, wird die Temperatur angezeigt.

## Temperatur messen

Um die Temperatur anzuzeigen, verwende den Block `||input.wenn Knopf A geklickt||`. Ändere die Schaltfläche, indem du auf das Dropdown-Menü von `||input.wenn Knopf A geklickt||` klickst und `Knopf B` auswählst.

## Temperatur messen

Zeige die Temperatur an, indem Du den Eingabeblock `||input.Temperatur||` in den Block `||basic.Zahl anzeigen||` einfügst.

## Helligkeit messen @showdialog

- **Helligkeit** - Wenn Knopf A gedrückt wird, kannst Du anzeigen, ob genügend Licht zur Verfügung steht.
  Wenn es zu dunkel ist, lasse eine Sonne auf der LED-Matrix erscheinen. Wenn es hell genug ist, erscheint ein Häkchen.

## Helligkeit messen

Füge einen weiteren `||input.wenn Knopf A geklickt||` Block hinzu, um die gemessenen Helligkeitswerte auszugeben. Wähle eine `||logic.wenn/dann||` Abfrage, um die gemessenen Lichtwerte mit dem Grenzwert im nächsten Schritt zu vergleichen.

## Messwerte vergleichen

Füge die Bedingung `||input.Lichtstärkel||` > 50 hinzu, indem du einen `||logic.logischen Vergleich||` auswählst und den `||input.Lichtstärke||` mit der Zahl `50` vergleichst.

## Ausgabe definieren

Wenn es zu dunkel ist, lasse eine Sonne auf der LED-Matrix erscheinen. Wenn es hell genug ist, erscheint ein Häkchen. Verwende den Block `||basic.zeige Text||` um die Antwort auf der LED-Matrix anzuzeigen.

## Bodenfeuchtigkeit messen @showdialog

Überprüfe dauerhaft: Wenn der Boden zu trocken ist, dann lasse die RGB LED rot leuchten, ansonsten lasse die RGB LED grün leuchten. Verwenden Sie den Feuchtigkeitssensor und schließe ihn an den rechten Grove-Anschluss A1 an.

## Bodenfeuchtigkeit messen

Platziere eine `||logic.wenn/dann||` Abfrage in die `||basic.dauerhaft||` Schleife.

## Bodenfeuchtigkeit messen

Verwende den Block `||grove.Feuchtigkeit (analog)||` um die Bodenfeuchtigkeit zu bestimmen.
**Hinweis:** Die `||grove.Grove Erweiterung||` ist bereits in das Tutorial integriert. Du musst sie zuerst im Editor hinzufügen.

## Messwerte vergleichen

Füge einen `||logic.logischen Vergleich||` zur `||logic.wenn/dann||` Abfrage hinzu, der überprüft, ob die `||grove.Feuchtigkeit (analog)||` > 300 ist.

## Ausgabe definieren

Wenn der Boden feucht ist, wird die Farbe auf grün gesetzt. Wenn es trocken ist, ist die Farbe rot. Platziere den Block `||basic.setze LED auf||` und wähle die Farbe an den entsprechenden Stellen im `||logic.wenn/dann||` Zweig.

## Fertig! 🎉

Klicke auf `|Download|` um dein Programm auf deinen Calliope mini zu übertragen.

```package
grove=github:calliope-edu/pxt-grove
```