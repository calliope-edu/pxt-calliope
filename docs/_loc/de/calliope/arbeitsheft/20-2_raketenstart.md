# 20 2_Raketenstart

```ghost
basic.showNumber(3)
basic.pause(100)
basic.showNumber(2)
basic.pause(100)
basic.showNumber(1)
basic.pause(100)
basic.showNumber(0)
basic.pause(100)
basic.showLeds(`
 . . # . .
 . # # # .
 . # # # .
 . . # . .
 . # . # .
 `)
basic.showLeds(`
 . # # # .
 . # # # .
 . . # . .
 . # . # .
 . . . . .
 `)
basic.showLeds(`
 . # # # .
 . . # . .
 . # . # .
 . . . . .
 . . . . .
 `)
basic.showLeds(`
 . . # . .
 . # . # .
 . . . . .
 . . . . .
 . . . . .
 `)
basic.showLeds(`
 . # . # .
 . . . . .
 . . . . .
 . . . . .
 . . . . .
 `)
basic.showLeds(`
 . . . . .
 . . . . .
 . . . . .
 . . . . .
 . . . . .
 `)
```

## Aufgabe @showdialog

Verwende eine Variable, um die Geschwindigkeit deiner Animation zu bestimmen und bequem anzupassen, anstatt immer wieder in jedem Pause-Block die Geschwindigkeit zu ändern.

## Variable erstellen

Erstelle eine `||variables.Variable||` und benenne sie „Tempo“.

```
```

![](https://calliope.cc/tutorials/variable_tempo.png)

## Variable einfügen

Verwende den Block `||variables.setze Tempo auf||`, um die Variable Tempo auf den Wert `100` zu setzen. Achtung: Platziere den Block vor deinem Countdown!

## Ersetzen

Ersetze die Werte in den Pause-Blöcken durch die Variable `||variables.Tempo||`.

## Countdown verlangsamen

Verlangsame deinen Countdown, indem du den Wert der Variable `||variables.Tempo||` auf `500` setzt.

## Geschafft! 🎉

Klicke auf `|Herunterladen|`, um dein Programm auf deinen Calliope mini zu übertragen.

```template
basic.showNumber(3)
basic.pause(100)
basic.showNumber(2)
basic.pause(100)
basic.showNumber(1)
basic.pause(100)
basic.showNumber(0)
basic.pause(100)
basic.showLeds(`
 . . # . .
 . # # # .
 . # # # .
 . . # . .
 . # . # .
 `)
basic.showLeds(`
 . # # # .
 . # # # .
 . . # . .
 . # . # .
 . . . . .
 `)
basic.showLeds(`
 . # # # .
 . . # . .
 . # . # .
 . . . . .
 . . . . .
 `)
basic.showLeds(`
 . . # . .
 . # . # .
 . . . . .
 . . . . .
 . . . . .
 `)
basic.showLeds(`
 . # . # .
 . . . . .
 . . . . .
 . . . . .
 . . . . .
 `)
basic.showLeds(`
 . . . . .
 . . . . .
 . . . . .
 . . . . .
 . . . . .
 `)
```

```blocks
let x = 0
```