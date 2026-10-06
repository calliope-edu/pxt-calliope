# Operatori booleani

Un Booleano ha uno di due valori possibili: `true` o `false`. Gli operatori Booleani (logici) (*and*, *or*, *not*) prendono l'ingresso Booleano e fanno un altro valore Booleano. Gli operatori di comparazione su altri tipi ([numeri](/types/number), [stringhe](/types/string)) creano valori Booleani.

Questi blocchi rappresentano i valori Booleani `true` e `false`, che possono inserirsi ovunque sia previsto un valore Booleano:

```block
let on = true;
```

The next three blocks represent the three Boolean (logic) operators:

```block
let and = true && false;
let or = true || false;
let not = !true;
```

The next six blocks represent comparison operators that yield a Boolean value. Most comparisons you will do involve [numbers](/types/number):

```block
let equality = 42 == 42;
let inequality = 42 != 42;
let lowerThan = 42 < 0;
let greaterThan = 42 > 0;
let lowerOrEqualThan =42 <= 0;
let greaterOrEqualThan = 42 >= 0;
```

Boolean values and operators are often used with an [if](/blocks/logic/if) or [while](/blocks/loops/while) statement to determine which code will execute next. For example:

```block
let a = 5
let b = 87

if (a < b) {
    a += 1
}

while (a < b) {
    a += 1
}
```

## Funzioni che ritornano un Booleano

Some functions return a Boolean value, which you can store in a Boolean variable. Ad esempio, il seguente codice ottiene lo stato on/off del punto `(1, 2)` e lo memorizza nella variabile Booleana denominata `in`. Quindi il codice cancella lo schermo se `on` è `vero`:

## Operatori Booleani

Boolean operators take Boolean inputs and evaluate to a Boolean output:

## Congiunzione: `A and B`

`A and B` evaluates to `true` if-and-only-if both A and B are true:

```block
let off = false && false;
let off2 = false && true;
let off3 = true && false;
let on = true && true;
```

## Disgiunzione: `A or B`

`A or B` evaluates to `true` if either `A` is true or `B` is true, or if both `A` and `B` are true:

```block
let off = false || false;
let on = false || true;
let on2 = true || false;
let on3 = true || true;
```

## Negazione: `not A`

`not A` evaluates to the opposite (negation) of A:

```block
let on = !false;
let off = !true;
```

##  #examples

## Example: `AND` operator

This example turns on LED `3 , 3`, if LEDs `1 , 1` and `2 , 2` are both on:

```blocks
if (led.point(1,1) && led.point(2,2)) {
   led.plot(3,3)
}
```

## Example: Comparisons of numbers and strings

When you compare two Numbers, you get a Boolean value, such as the comparison `x < 5` in the code below:

```blocks
input.onButtonEvent(Button.A, input.buttonEventValue(ButtonEvent.Down), () => {
    let x = randint(0, 5)
    if(x < 5) {
    basic.showString("low");
    } else {
    basic.showString("high");
    }
})
```

See the documentation on [Numbers](/types/number) for more information on comparing two Numbers.