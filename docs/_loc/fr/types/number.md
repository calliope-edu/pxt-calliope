# Nombres

An number value.

### @parent blocks/language

A *Number* is a numeric value that is an integer or a rational number. Numbers are stored in multiple bytes in *floating point* format. This is so that numbers with a fractional portion can have precise calculations performed on them.

Some examples of different types of number values:

| Nombres  | Type of value                         |
| -------- | ------------------------------------- |
| 67       | positive integer                      |
| -345     | negative integer                      |
| 0        | zero                                  |
| 19.43    | floating point                        |
| -45.245  | negative floating point               |
| 0.4567   | fractional floating point             |
| 8.23e+21 | floating point with exponent notation |

### Déclarer une variable de numérique

You can [assign](/blocks/variables/assign) a number to a variable:

####  #declareexample

```block
let num = 42;
basic.showNumber(42);
```

### #functionreturnexample

For example the following code gets the display brightness (using the [brightness function](/reference/led/brightness)) and stores the value in a variable named `brightness`:

```block
let brightness = led.brightness()
```

### Opérateurs arithmétiques

The following arithmetic operators work on numbers and return a [Number](/types/number):

* addition: `1 + 3`
* soustraction: `1 -3`
* multiplication: `3 * 2`
* division entière: `7 / 3`
* modulo est disponible via la [bibliothèque mathématique](/blocks/math)

### Opérateurs relationnels

Les opérateurs relationnels suivants travaillent sur des nombres et renvoient un [booléen](/blocks/logic/boolean):

* egalité: `(3 + 1) = 4`
* inégalité: `3 != 4`
* inférieur ou égal à: `3 <= 4`
* inférieur à: `3 < 4`
* supérieur ou égal à: `4 >= 3`
* supérieur à: `4 > 3`

## Show number #print

The [show number](/reference/basic/show-number) function displays a number on the [LED screen](/device/screen). For example, this code displays the number 42:

```block
basic.showNumber(42);
```