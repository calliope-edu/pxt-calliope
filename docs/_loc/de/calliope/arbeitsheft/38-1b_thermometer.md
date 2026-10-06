# 38 1b Thermometer

```ghost
basic.forever(function () {
  if (input.temperature() > 30) {
      basic.showLeds(`
          # # # # #
          # # # # #
          # # # # #
          # # # # #
          # # # # #
          `)
      basic.setLedColor(0xff0000)
  } else if (input.temperature() < 20) {
      basic.showLeds(`
          . . . . .
          . . . . .
          . . . . .
          . . . . .
          . . . . .
          `)
      basic.setLedColor(0x007fff)
  } else {
      basic.showLeds(`
          # . # . #
          . # . # .
          # . # . #
          . # . # .
          # . # . #
          `)
      basic.setLedColor(0x00ff00)
  }
})
```

## Aufgabe @showdialog

Schreibe ein Programm für ein Thermometer, das ein Signal für Hitzefrei ausgibt, wenn eine Temperatur von 30°C überschritten wird.🍦

- Wenn die gemessene **Temperatur > 30°C** ist, zeige ein Eissymbol auf der LED-Matrix und schalte die RGB-LED auf "rot".
- Wenn die gemessene **Temperatur < 20°C** ist, schalte die LED-Matrix aus und die RGB-LED auf "blau".
- In **allen anderen Fällen**, schalten die Hälfte der LED-Matrix ein und die RGB-LED auf "grün".

## Abfrage erstellen

Wähle eine `||logic.wenn dann ansonsten||` Abfrage aus den Logikblöcken und füge sie in die `||basic.dauerhaft||` Schleife ein.
Klicken Sie auf das **+** der Abfrage, um eine weitere Bedingung hinzuzufügen.

## Bedingungen erstellen (warm)

Ersetze den ersten "wahr" Block in der Abfrage mit einem `||logic.Vergleich (=)||` Block um die gemessene `||input.Temperatur||` mit dem höchsten Schwellenwert zu vergleichen.
Ändere den Operator auf **>**.

## Bedingungen erstellen (kalt)

Ersetze den zweiten "wahr" Block in der Abfrage mit einem `||logic.Vergleich(=)||` Block um die gemessene `||input.Temperatur|` mit dem niedrigsten Schwellenwert zu vergleichen.
Ändere den Operator auf **<**.

## Ausgabe definieren

Vervollständige dein Programm durch Hinzufügen der Ausgabe über die LED-Matrix und die RGB-LED für die verschiedenen Fälle.
Verwende die Blöcke `||basic.zeige LEDs||` und `||basic.setze Farbe auf||`.

## Erledigt! 👍

Klicke auf `|Download|` um dein Programm auf deinen Calliope Mini zu übertragen.