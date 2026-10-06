# 35 1 Luz inteligente

```ghost
basic.forever(function () {
if (input.soundLevel() > 20) {
    basic.showLeds(`
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        `)
    basic.pause(5000)
} else {
  basic.clearScreen()
}
})
```

## Tarea @showdialog

Escribe un programa para una lámpara que se enciende dando palmadas y se vuelve a apagar automáticamente a los 5 segundos 👏.

## Crear una sentencia if/else

Selecciona una consulta `||logic.if then else|||` de los bloques lógicos e insértala en el bucle `||basic.forever|||`. <br>
La palmada se reconoce mediante una consulta permanente de los valores de volumen medidos.

## Crear condición

Define un valor umbral, por ejemplo `20` ¡para el volumen de tu palmada!
Replace the "true" block in the query with a `||logic.compare (=)||` block to compare the measured `||input.sound level||` with the threshold value.

## Encender la luz

Utiliza el bloque `||basic.show leds||` y rellena toda la matriz para encender la luz.
Luego añade un bloque `||basic.pause||` y ponlo a `5000` ms para que la luz permanezca encendida durante 5 segundos.

## Apagar la luz

Vuelve a apagar la luz si la condición no se cumple. Utiliza el bloque ``||basic.clear screen|||` debajo de ``||basic.... more||`.<p>
También puedes usar el bloque `||basic.show LEDs||\`\` y borrar la matriz.

## ¡Hecho! 👍

Pulsa en `|Descargar|` para transferir el programa a tu Calliope mini.