# out of bounds

The behavior of functions whose parameter values are out of bounds.

De nombreuses fonctions @boardname@ possèdent des paramètres. Si un paramètre a une valeur inattendue, il est considéré comme *hors limites*.

Par exemple, la fonction [plot](/reference/led/plot) a deux paramètres:

## syntaxe

```sig
led.plot(0,0)
```

## paramètres

* x - the *x coordinate* or horizontal position (0, 1, 2, 3, 4)
* y - the *y coordinate* or vertical position (0, 1, 2, 3, 4)

## out of bounds

voici un exemple de code avec un paramètre hors limites (les paramètres *x* et *y* sont en dehors de la plage attendue de 0 à 4) :

```blocks
led.plot(9, -21)
```

## que se passe-t-il ?

Typically, when a parameter supplied to a function is out of bounds that function does nothing (as if the function never executed). So, in the above case, the LED screen will not change.

## return value

If you call the `point` function with an out of bounds parameter, the function returns `false`:

```blocks
let on = led.point(5, -5)
```