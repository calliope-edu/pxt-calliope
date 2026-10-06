# 33 4 Luz

```ghost
let brightness = input.lightLevel();
input.onButtonEvent(Button.B, input.buttonEventClick(), function () {
basic.showNumber(brightness)
})
```

## Tarea @showdialog

Escribe un programa que guarde el valor de luz medido en una variable cuando se apague la matriz de LEDs y luego muestre el valor guardado en la matriz de LEDs.

## Crear variable

Create a `||variables.variable||` and name it "brightness".

```
```

![](https://calliope.cc/tutorials/variable_licht.png)

## Guardar intensidad de luz @showdialog

If button A is clicked, save the measured light intensity in the variable "brightness".

## Define la entrada

Selecciona el bloque `||input.on button A is clicked|||` como entrada.

## Procesando: Medir y guardar la intensidad de la luz

El bloque `||input.light level|||` devuelve el valor de intensidad luminosa medido.
Utiliza el bloque `||variables.set light to||` para configurar el valor de la variable según la intensidad de luz medida.

## Mostrar intensidad de luz @showdialog

When button B is clicked, show the value of the variable "brightness".

## Define la entrada

Coloca otro bloque `|| input.on botón A ||` pulsado y cámbialo por `|| input.on botón B ||` pulsado.

![Botón B](https://calliope.cc/tutorials/kopf_a_b.png)

## Define la salida

Use the `|| basic.show number||` block and display the value of the variable`||variables.brightness||`.

## ¡Hecho! 👏

Pulsa en `|Descargar|` para transferir el programa a tu Calliope mini.

```template
//
```