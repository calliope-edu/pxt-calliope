# 23 4_Fitness

```ghost
let tempo = 1000
basic.setLedColor(0xff0000)
basic.pause(tempo)
for (let index = 0; index < 2; index++) {
 basic.setLedColor(0x007fff)
 basic.pause(tempo)
 basic.turnRgbLedOff()
 basic.pause(100)
}
```

## Aufgabe @showdialog

Erstelle ein Fitnessprogramm! Definiere 5 Farben und ordne jeder Farbe eine Fitnessübung zu - zum Beispiel Kniebeugen, Strecksprung, Hampelmann etc.
Beachte bei deinem Fitnessprogramm folgende Vorgaben:

- 10 Übungen
- 3x Hampelmann hintereinander
- 2x Kniebeugen
- Abschluss mit einem Strecksprung

## Übungen definieren

Füge für jede der 10 Übungen einen `||basic.setze Farbe auf||` und `||basic.pausiere||` Block ein.

## Wiederholungen

Optimiere dein Programm, indem du Wiederholungen erkennst und Wiederholungsschleifen verwendest, anstatt den gleichen Befehl mehrmals hintereinander abzubilden.
Verwenden den `||loops.x-mal wiederholen||` Block und stelle die gewünschte Wiederholung ein.

## Wiederholungen optimieren

Wird eine Farbe wiederholt, benötigst du eine sichtbare Pause zwischen den Phasen.
Verwende den `||basic.eingebaute RGB-LEDs ausschalten||` Block, um die RGB-LED auszuschalten.
Du findest ihn unter `||basic.Grundlagen||` `||basic....mehr||`.
Füge einen `||basic.pausiere||` Block hinzufügen, um die Dauer der Pause zu definieren.
Vervollständige dein Programm.

## Variablen verwenden @showdialog

Verwende eine Variable, um die Geschwindigkeit deiner Animation zu bestimmen und bequem anzupassen.

## Variable Tempo erstellen

Erstelle eine `||variables.Variable||`und benenne sie „Tempo“.

```
```

![](https://calliope.cc/tutorials/variable_neu.png)

## Tempo Wert einstellen

Verwende den Block `||variables.setze Tempo auf||`, um die Variable `||variables.Tempo||` auf den Wert `1000` zu setzen.

## Variable Tempo verwenden

Ersetze die Werte in den Pause-Blöcken durch die Variable `||variables.Tempo||`.

## Geschafft! 🎉

Klicke auf `|Herunterladen|`, um dein Programm auf deinen Calliope mini zu übertragen.