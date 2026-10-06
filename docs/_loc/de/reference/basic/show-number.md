# Zahl anzeigen

Zeigt eine Zahl auf der [LED-Anzeige](/device/screen) an. Diese verschiebt sich nach links, wenn sie größer als die Anzeige ist.

```sig
basic.showNumber(2)
```

## Parameter

* `value` ist eine [Zahl](/types/number). Wenn die Zahl nicht einstellig ist, wird sie auf dem Display gescrollt.
* `interval` ist eine optionale [Zahl](/types/number). Dies ist die Anzahl der Millisekunden, bevor der `value` jeweils um eine LED nach links verschoben wird. Größere Intervalle machen das Verschieben langsamer.

## Beispiele:

Um die Zahl 10 anzuzeigen:

```blocks
basic.showNumber(10)
```

So wird die in einer Variablen gespeicherte Zahl angezeigt:

```blocks
let x = 1
basic.showNumber(x)
```

## Beispiel: Zähle bis 5

In diesem Beispiel wird eine [für...](/blocks/loops/for) -Schleife verwendet, um die Zahlen `0` bis `5` auf der LED-Anzeige darzustellen:

```blocks
for (let i = 0; i < 6; i++) {
    basic.showNumber(i)
    basic.pause(200)
}
```

## Fortgeschritten

Wenn `Wert` NaN</code> (keine Zahl), `?` angezeigt wird.

## Andere show-Funktionen

Verwende [String anzeigen](/reference/basic/show-string), um einen [String](/types/string) mit Buchstaben auf dem Bildschirm anzeigen zu lassen.

## Siehe auch

[String anzeigen](/reference/basic/show-string), [Zahl](/types/number), [Mathe](/blocks/math)