# 38 1b Termómetro

```ghost
basic.forever(function () {
  if (input.temperature() > 30) {
      basic.showLeds(`
          # # # # #
          # # # # #
          # # # # #
          # # # # #
          # # # # #
          `)
      basic.setLedColor(0xff0000)
  } else if (input.temperature() < 20) {
      basic.showLeds(`
          . . . . .
          . . . . .
          . . . . .
          . . . . .
          . . . . .
          `)
      basic.setLedColor(0x007fff)
  } else {
      basic.showLeds(`
          # . # . #
          . # . # .
          # . # . #
          . # . # .
          # . # . #
          `)
      basic.setLedColor(0x00ff00)
  }
})
```

## Tarea @showdialog

Escribe un programa para un termómetro que emita una señal "sin calentamiento" cuando se supere una temperatura de 30°C.🍦

- Si la **temperatura medida > 30°C**, muestra un símbolo de hielo en la matriz LED y cambia el LED RGB a 'rojo'.
- Si la **temperatura medida es < 20°C**, apaga la matriz de LEDs y enciende el LED RGB en `azul`.
- En **todos los demás casos**, enciende la mitad de la matriz de LEDs y el LED RGB en `verde`.

## Crear consulta

Selecciona una consulta `||logic.if then else|||` de los bloques lógicos e insértala en el bucle `||basic.forever|||`.
Pulsa sobre el **+** de la consulta para añadir otra condición.

## Crear condiciones (caliente)

Reemplaza el primer bloque "cierto" de la consulta por un bloque `||logic.compare (=)||` para comparar la temperatura medida `||input.temperature|` con el valor umbral más alto.
Cambia el operador a **>**.

## Crear condiciones (frío)

Reemplaza el segundo bloque "cierto" de la consulta por un bloque `||logic.compare (=)||` para comparar la temperatura medida `||input.temperature|` con el valor umbral más bajo.
Cambia el operador a **<**.

## Define la salida

Completa tu programa añadiendo la salida a través de la matriz LED y el LED RGB para los diferentes casos.
Utiliza los bloques `||basic.show leds||` y `||basic.set LED to||`.

## ¡Hecho! 👍

Pulsa en `|Descargar|` para transferir el programa a tu Calliope mini.