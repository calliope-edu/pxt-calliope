# out of bounds

The behavior of functions whose parameter values are out of bounds.

Many of the @boardname@ functions have parameters. If a parameter is an unexpected value, the parameter is considered *out of bounds*.

Per esempio, la funzione [plot](/reference/led/plot) ha due parametri:

## syntax

```sig
led.plot(0,0)
```

## parametri

* x - the *x coordinate* or horizontal position (0, 1, 2, 3, 4)
* y - the *y coordinate* or vertical position (0, 1, 2, 3, 4)

## out of bounds

ecco un esempio di codice con un parametro fuori limite (i parametri *x* e *y* sono al di fuori dell'intervallo previsto di 0-4):

```blocks
led.plot(9, -21)
```

## what happens?

Typically, when a parameter supplied to a function is out of bounds that function does nothing (as if the function never executed). So, in the above case, the LED screen will not change.

## return value

If you call the `point` function with an out of bounds parameter, the function returns `false`:

```blocks
let on = led.point(5, -5)
```