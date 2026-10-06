# Text anzeigen

Zeigt eine Zeichenkette auf der [LED-Matrix](/device/screen) an. Diese verschiebt sich nach links, wenn sie größer als der Bildschirm ist.

```sig
basic.showString("hi!")
```

## Parameter

* `text` ist ein [String](/types/string). Er kann Buchstaben, Zahlen und Sonderzeichen enthalten.
* `interval` ist eine optionale [Zahl](/types/number). Dies ist die Anzahl der Millisekunden, bevor der [String](/types/string) jeweils um eine LED nach links verschoben wird. Größere Intervalle machen das Verschieben langsamer.

## Beispiele:

So zeigst du das Wort **Hallo** an:

```blocks
basic.showString("Hallo")
```

Um zu zeigen, was in einer [String](/types/string)-Variablen gespeichert ist:

```blocks
let s = "Hi"
basic.showString(s)
```

## Andere show-Funktionen

Verwende [Zahl anzeigen](/reference/basic/show-number), um eine Zahl auf dem [LED-Bildschirm](/device/screen) anzeigen zu lassen.

## Siehe auch

[String](/types/string), [Zahl anzeigen](/reference/basic/show-number)