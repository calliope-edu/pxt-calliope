# 33 4 Licht

```ghost
let brightness = input.lightLevel();
input.onButtonEvent(Button.B, input.buttonEventClick(), function () {
basic.showNumber(brightness)
})
```

## Aufgabe @showdialog

Schreibe ein Programm, das den gemessenen Lichtwert in einer Variable speichert, wenn die LED-Matrix ausgeschaltet ist und dann den gespeicherten Wert auf der LED-Matrix anzeigt.

## Variable erstellen

Erstelle eine `||variables.Variable||` und nenne sie „Licht“.

```
```

![](https://calliope.cc/tutorials/variable_licht.png)

## Lichtintensität speichern @showdialog

Wenn Knopf A geklickt wird, speichere die gemessene Lichtintensität in der Variable "Licht".

## Eingabe definieren

Wähle den Block `||input.Wenn Knopf A geklickt||` als Eingabe.

## Verarbeitung: Messen und Speichern der Lichtintensität

Der `||input.Lichtstärke||` Block gibt den gemessenen Lichtintensitätswert aus.
Benutze den `||variables.setze Licht auf||` Block, um den Wert der Variable auf die gemessene Lichtintensität zu setzen.

## Lichtintensität speichern @showdialog

Wenn der Knopf B geklickt wird, wird der Wert der Variablen "Licht" angezeigt.

## Eingabe definieren

Platziere einen weiteren Block `||input.Wenn Knopf A geklickt||` und ändere diesen in `||input.Wenn Knopf B geklickt||`.

![Button B](https://calliope.cc/tutorials/kopf_a_b.png)

## Ausgabe definieren

Verwende den `||basic.zeige Zahl||` Block und zeige den Wert der Variablen `||variables.Licht||`.

## Geschafft! 👏

Klicke auf `|Herunterladen|`, um dein Programm auf deinen Calliope mini zu übertragen.

```template
//
```