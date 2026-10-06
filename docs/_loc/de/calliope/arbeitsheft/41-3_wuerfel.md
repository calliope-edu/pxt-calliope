# 41 3 Würfel

```ghost
input.onGesture(Gesture.Shake, function () {
basic.showNumber(randint(1, 6))
})
```

## Aufgabe @showdialog

Verwandele den Calliope mini in einen Würfel.
Wenn der Calliope Mini geschüttelt wird, erscheint eine zufällige Zahl auf der LED-Matrix.
![](https://calliope.cc/tutorials/dice_animation.gif)

## Eingabe definieren

Wähle den Block `||input.wenn geschüttelt||` als Eingabe.

## Ausgabe definieren

Benutze den Block `||basic.zeige Zahl||` um eine beliebige Zahl im ersten Schritt auszugeben.

## Zufall hinzufügen

Ersetze die Zahl durch den `||math.wähle eine zufällige Zahl von ... bis ...||` Block und setze den Zahlenbereich auf `1 bis 6`.

## Geschafft! 😍

Klicke auf `|Download|` um dein Programm auf deinen Calliope Mini zu übertragen.

```template
//
```