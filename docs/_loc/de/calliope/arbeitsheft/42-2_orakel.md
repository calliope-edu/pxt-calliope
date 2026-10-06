# 42 2 Orakel

```ghost
let zufall = 0
input.onGesture(Gesture.Shake, function () {
   zufall = randint(0, 2)
   if (zufall == 1) {
      basic.showString("Ja")
   }
   if (zufall == 2) {
      basic.showString("Nein")
   }
   if (zufall == 3) {
      basic.showString("Vielleicht")
   }
});
```

## Aufgabe @showdialog

Werden wir das nächste Feldhockey-Turnier gewinnen, ist Flynn in mich verliebt oder darf ich heute Abend am Computer spielen? <br>
Baue dein eigenes **Calliope Mini-Orakel** und lass dir die Antworten geben.
Du programmierst und bestimmst die Antworten!

## Eingabe definieren

Wähle den Block `||input.wenn geschüttelt||` als Eingabe.

## Zufallsvariable erstellen

Erstelle eine `||variables.Variable||`und nenne sie „Zufall“.

```
```

![](https://calliope.cc/tutorials/variable_zufall.png)

## Generieren und Speichern einer Zufallszahl

Verwende den `||math.wähle eine zufällige Zahl von ... bis ... ||` Block, um eine zufällige Zahl zwischen 1 und 3 zu ermitteln.
Speichere diese in der Variablen `||variables.Zufall||` mit dem `||variables.setze Variable auf||` Block.

## Abfragebedingungen

Abfrage der zufälligen Zahl mit einer `||logic.wenn / dann||` Anweisung. Verwende den Block `||logic.Vergleich (=)||` um den Wert der Variablen `||variables.Zufall||` mit den möglichen Zahlen zu vergleichen. Du benötigst eine Abfrage für jede mögliche Zahl.<p>
**Tipp:** Du kannst auch einen Mehrfachzweig verwenden, wenn du auf das **+** in der Abfrage klickst und ihn erweiterst.

## Ausgabe definieren

Jeder möglichen Zahl ist eine Antwort zugeordnet. Die zufällige Zahl bestimmt die Antwort. Verwende den Block `||basic.zeige Text||` um die Antwort auf der LED-Matrix anzuzeigen.

## Erledigt! 😍

Klicke auf `|Download|` um dein Programm auf deinen Calliope Mini zu übertragen.

```template
//
```