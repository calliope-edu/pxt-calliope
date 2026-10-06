# 50 2 contador de personas

```ghost
input.onButtonEvent(Button.A, input.buttonEventClick(), function () {
    basic.showNumber(Personenzähler)
})
input.onButtonEvent(Button.AB, input.buttonEventClick(), function () {
    Personenzähler = 0
})
let Personenzähler = 0
Personenzähler = 0
let komplett = 20
basic.forever(function () {
    if (grove.measureInCentimeters(DigitalPin.C16) < 10) {
        Personenzähler += 1
    }
    if (Personenzähler < komplett) {
        basic.setLedColor(0xff0000)
    } else {
        basic.setLedColor(0x00ff00)
    }
})
```

```package
grove=github:calliope-edu/pxt-grove
```

## Tarea @showdialog

¿Está completa la clase?
Utiliza el sensor ultrasónico para comprobar si todos los alumnos han vuelto a la clase. Programa un contador de personas para que cuente el número de personas que entran en la clase.

## Define variables

Crea dos variables al principio. Una variable `||variables.peoplecounter||` para el número de personas contadas y una variable `||variables.complete||`.

```
```

![image/variable](image/variable)

## Define variables

Configura la variable `||variables.personcounter||` a 0 al principio y la variable `||variables.complete||` con el número de compañeros, por ejemplo 20.

## Paso 3

Mide la distancia de forma permanente. En cuanto una persona pase por delante del sensor ultrasónico y la distancia sea inferior al valor 10, aumenta en 1 el contador de personas. Inserta una derivación `||logic.if/then|||` en el bucle `||basic.forever||`.

## Valor de comparación

Utiliza un bloque `||logic.logical comparison||` en el que el valor del `||grove.ultrasonic sensor||` es comparado con el valor límite, por ejemplo `10` cm.
**Nota:** En este tutorial, el sensor ultrasónico ya está añadido y lo puedes encontrar bajo los bloques `||grove.grove|||`.

## Incrementar variable

Incrementa la variable `||variables.personcounter||` en 1 si el valor del sensor ultrasónico es inferior a 10, por ejemplo.

## Evaluación de valores

Si el contador de personas es inferior al número máximo de alumnos de la clase, el LED se ilumina en rojo, en caso contrario, en verde. Esta vez, inserta otra derivación `||logic.if/then/else||` en el bucle `||basic.forever|||`. Comprueba si la variable `||variables.personcounter||` es menor que la variable `||variables.complete||`.

## Define la salida

Si el contador de personas es menor que la variable "completo", entonces `||basic.set the LED color||` cambia a **rojo**. De lo contrario a **verde**.

## Extensión: Reiniciar

Añade la opción de reiniciar al contador de personas a través de `||input.A+B clicked||` para que el `||variables.peoplecounter|||` se pueda reiniciar y volver a arrancar desde `0`.

## Variable de pantalla

Por último, cuando se pulsa `||input.button A||`, la matriz de LED muestra cuántas personas se han contado ya.
Consejo: Utiliza la variable `||variables.peoplecounter|||`

## ¡Eso es! ✨

Pulsa en `|Descargar|` para transferir tu programa a tu Calliope mini y probar el contador de personas.