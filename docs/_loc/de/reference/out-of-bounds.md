# außerhalb der Grenzen (Out-of-Bounds)

Das Verhalten von Funktionen, deren Parameterwerte außerhalb der Grenzen liegen.

Viele der @boardname@-Funktionen haben Parameter. Wenn ein Parameter einen unerwarteten Wert hat, wird der Parameter als *außerhalb der Grenzen* betrachtet.

Die [plot](/reference/led/plot)-Funktion verfügt z. b. über zwei Parameter:

## Syntax

```sig
led.plot(0,0)
```

## Parameter

* x - die *x-Koordinate* oder die horizontale Position (0, 1, 2, 3, 4)
* y - die *y-Koordinate* oder die vertikale Position (0, 1, 2, 3, 4)

## außerhalb der Grenzen (Out-of-Bounds)

Hier ist ein Beispiel für Code mit einem Out-of-Bounds-Parameter (die Parameter *x* und *y* sind außerhalb des erwarteten Bereichs von 0-4):

```blocks
led.plot(9, -21)
```

## Was geschieht nun?

Normalerweise, wenn ein Parameter, der an eine Funktion geliefert wird, außerhalb der Grenzen liegt, tut diese Funktion nichts (als ob die Funktion nie ausgeführt würde). Im obigen Fall ändert sich die LED-Anzeige also nicht.

## Rückgabewert

Wenn die Funktion `point` mit einem Out-of-Bounds-Parameter aufgerufen wird, gibt die Funktion `false` zurück:

```blocks
let on = led.point(5, -5)
```