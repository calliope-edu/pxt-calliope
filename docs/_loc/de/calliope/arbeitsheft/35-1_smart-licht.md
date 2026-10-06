# 35 1 Smart-Licht

```ghost
basic.forever(function () {
if (input.soundLevel() > 20) {
    basic.showLeds(`
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        `)
    basic.pause(5000)
} else {
  basic.clearScreen()
}
})
```

## Aufgabe @showdialog

Schreibe ein Programm für eine Lampe, die eingeschaltet wird, wenn du in die Hände klatschst und nach 5 Sekunden wieder automatisch ausgeht 👏.

## Erstelle eine Wenn/dann Anweisung

Wähle eine `||logic.wenn dann ansonsten||` Abfrage aus den Logikblöcken und füge sie in die `|basic.dauerhaft||` Schleife ein. <br>
Das Klatschen wird über eine permanente Abfrage der gemessenen Lautstärkewerte erkannt.

## Bedingung erstellen

Definiere einen Schwellenwert, z.B. `20` für die Klatschlautstärke!
Ersetze den "wahr" Block in der Abfrage mit einem `||logic.Vergleich (=)||` Block um die gemessene `||input.Lautstärke||` mit dem Schwellenwert zu vergleichen.

## Licht anschalten

Verwende den Block `||basic.zeige LEDs||` und fülle die gesamte Matrix aus, um das Licht einzuschalten.
Füge dann einen `||basic.pausiere||` Block hinzu und setze diesen auf \`\`5000\` ms, sodass das Licht 5 Sekunden lang an bleibt.

## Licht ausschalten

Schalten das Licht wieder aus, wenn die Bedingung nicht gilt. Verwende den `||basic.Bildschirminhalt löschen||` Block unter `||basic.... mehr||`.<p>
Du kannst auch den `||basic.zeige LEDs||` -Block verwenden und die LEDMatrix löschen.

## Fertig! 👍

Klicke auf `|Herunterladen|`, um dein Programm auf deinen Calliope mini zu übertragen.