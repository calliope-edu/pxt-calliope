# Número

An number value.

### @parent blocks/language

A *Number* is a numeric value that is an integer or a rational number. Numbers are stored in multiple bytes in *floating point* format. Esto es para que los números con una porción fraccionaria puedan tener cálculos precisos realizados con ellos.

Some examples of different types of number values:

| Número   | Tipo de valor                          |
| -------- | -------------------------------------- |
| 67       | entero positivo                        |
| -345     | entero negativo                        |
| 0        | cero                                   |
| 19.43    | coma flotante                          |
| -45.245  | coma flotante negativa                 |
| 0.4567   | coma flotante fraccional               |
| 8.23e+21 | coma flotante con notación exponencial |

### Declare a number variable

Puedes [asignar](/blocks/variables/assign) un número a una variable:

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

### Arithmetic operators

The following arithmetic operators work on numbers and return a [Number](/types/number):

* addition: `1 + 3`
* subtraction: `1 - 3`
* multiplication: `3 * 2`
* integer division: `7 / 3`
* modulo is available through the [math library](/blocks/math)

### Relational operators

The following relational operators work on numbers and return a [Boolean](/blocks/logic/boolean):

* equality: `(3 + 1) = 4`
* inequality: `3 != 4`
* less or equal than: `3 <= 4`
* less than: `3 < 4`
* greater or equal than : `4 >= 3`
* greater than: `4 > 3`

## Show number #print

The [show number](/reference/basic/show-number) function displays a number on the [LED screen](/device/screen). For example, this code displays the number 42:

```block
basic.showNumber(42);
```