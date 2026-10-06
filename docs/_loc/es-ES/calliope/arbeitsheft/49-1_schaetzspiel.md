# 49 1 Juego de estimación

```ghost
let distance = 0
input.onButtonEvent(Button.A, input.buttonEventValue(ButtonEvent.Click), function () {
    distance = Math.round(grove.measureInCentimeters(DigitalPin.C16))
})
input.onButtonEvent(Button.B, input.buttonEventValue(ButtonEvent.Click), function () {
    basic.showNumber(distance)
})
basic.forever(function () {
    basic.showLeds(`
        . # # . .
        . . . # .
        . . # . .
        . . . . .
        . . # . .
        `)
})
```

```package
grove=github:calliope-edu/pxt-grove
```

## Juego de estimación @showdialog

Programa un juego de estimación que mide la distancia entre dos objetos. El
Calliope mini mide la distancia... en secreto. Tú calculas la distancia y el Calliope mini resuelve y muestra la distancia medida.

## Tarea @showdialog

Pulsa el botón A para medir la distancia y guardarla en una variable. Pulsa el botón B para mostrar el valor guardado de la variable en la pantalla.

## Botones Añadir eventos

Inserta el bloque `||input.on button A is clicked||` dos veces y cambia el botón a `B` para un bloque. Consejo: Puedes duplicar el bloque pulsando el botón derecho del ratón.

## Define variables

To save the distance when the button is pressed and retrieve it later, create a `||variable.variable||` and name it _distance_.

```
```

![image/variable](image/variable)

## Guarda distancia

Utiliza el bloque `||grove.ultrasonic|||` para determinar la distancia.
**Nota:** En el tutorial, la `||grove.Grove extension||` ya está integrada. Primero debes añadirla en el editor.

Cuando se pulsa el botón `||input.A||`, guarda el valor medido en el bloque `||variable.set distance to||` de la variable `distancia`.

## Guardar valor

Ahora recupera el valor guardado de la variable `||variables.distance||` y muéstralo en la pantalla cuando se pulse el botón B. Para hacer esto, utiliza el bloque `||basic.show number|||` e insértalo junto con la variable en el bloque `||input.on button B is clicked|||`.

## Probando

¡Prueba tu programa! Observarás que los valores del sensor ultrasónico son bastante largos. Los valores son muy precisos y todavía no se han redondeado.
`||Math.round||` el valor del sensor ultrasónico, que guardas en la variable `||variables.set distance to||`.

## Muestra el signo de interrogación

Por último, que aparezca permanentemente una '?' en la matriz de LED. Dibuja una ? con el bloque `||basic.show leds||`.

## ¡Hecho! 👏

Pulsa en `|Descargar|`, prueba tu programa en el Calliope mini e ¡intenta calcular la distancia correctamente!