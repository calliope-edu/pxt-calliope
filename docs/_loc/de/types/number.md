# Number

An number value.

### @parent blocks/language

A *Number* is a numeric value that is an integer or a rational number. Numbers are stored in multiple bytes in *floating point* format. This is so that numbers with a fractional portion can have precise calculations performed on them.

Some examples of different types of number values:

| Number   | Type of value                         |
| -------- | ------------------------------------- |
| 67       | positive integer                      |
| -345     | negative integer                      |
| 0        | zero                                  |
| 19.43    | floating point                        |
| -45.245  | negative floating point               |
| 0.4567   | fractional floating point             |
| 8.23e+21 | floating point with exponent notation |

### Declare a number variable

You can [assign](/blocks/variables/assign) a number to a variable:

####  #declareexample

```block
let num = 42;
basic.showNumber(num);
```

### #functionreturnexample

Zum Beispiel holt der folgende Code die Helligkeit des Displays (unter Verwendung der [Helligkeitsfunktion](/reference/led/brightness)) und speichert den Wert in einer Variablen namens `brightness`:

```block
let helligkeit = led.brightness()
```

### Arithmetic operators

The following arithmetic operators work on numbers and return a [Number](/types/number):

* Addition: `1 + 3`
* Subtraktion: `1 - 3`
* Multiplikation: `3 * 2`
* Ganzzahl-Division: `7 / 3`
* Modulo ist über die [math-Bibliothek](/blocks/math) verfügbar

### Relational operators

Die folgenden Vergleichsoperatoren arbeiten mit Zahlen und geben einen [Boolean](/blocks/logic/boolean) zurück:

* Gleichheit: `(3 + 1) = 4`
* Ungleichheit: `3! = 4`
* Kleiner oder gleich: `3 <= 4`
* Kleiner als: `3 < 4`
* Größer oder gleich: `4 >= 3`
* Größer als: `4 > 3`

## Zeige Zahl #print

Verwende [zeige Zahl](/reference/basic/show-number), um eine Zahl auf der [LED-Matrix](/device/screen) anzuzeigen. Zum Beispiel zeigt dieser Code die Zahl 42:

```block
basic.showNumber(42);
```