# In Text umwandeln

Ändere den Wert eines [Typs](/types) in einen Text [String](/types/string).

```sig
convertToText(123)
```

## Parameter

* **Wert**: ein Wert von [Typ](/types) , der in einen [String](/types/string) konvertiert wird.

## Rückgabewert

* eine [Zeichenkette](/types/string) die eine Textdarstellung von **Wert** ist.

## Beispiel #example

Konvertiere einen booleschen und einen Zahlenwert in Strings und schließe diese in einen Satz ein.

```blocks
let myBoolean = false
let myNumber = 0

myBoolean = true
myNumber = 123

let myString = "It is " + convertToText(myBoolean) + " that " + convertToText(myNumber) + " is now a string!"
```

## Siehe auch #seealso

[parse int](/reference/text/parse-int), [parse float](/reference/text/parse-float)