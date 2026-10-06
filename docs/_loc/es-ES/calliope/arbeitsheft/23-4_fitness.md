# 23 4_Fitness

```ghost
let tempo = 1000
basic.setLedColor(0xff0000)
basic.pause(tempo)
for (let index = 0; index < 2; index++) {
 basic.setLedColor(0x007fff)
 basic.pause(tempo)
 basic.turnRgbLedOff()
 basic.pause(100)
}
```

## Tarea @showdialog

¡Crea un programa de fitness! Define 5 colores y asigna un ejercicio de fitness a cada color: por ejemplo, sentadillas, saltos elásticos, saltos de tijera, etc.
Observa las siguientes directrices para tu programa de fitness:

- 10 ejercicios
- 3 saltos de tijera seguidos
- 2 sentadillas
- Termina con un salto elástico

## Define los ejercicios

Inserta un bloque `||basic.set LED to||` y `||basic.pause||` para cada uno de los 10 ejercicios.

## Repeticiones

Optimiza tu programa reconociendo las repeticiones y utilizando bucles de repetición en lugar de asignar el mismo comando varias veces seguidas.
Utiliza el bloque `||loops.repeat x times|||` y configura la repetición deseada.

## Optimiza las repeticiones

Si se repite un color, es necesaria una pausa visible entre las fases.
Utiliza el bloque `||basic.turn built-in LED off||` para apagar el LED RGB.
Puedes encontrarlo bajo `||basic.basics||` `||basic....more||`.
Añade un bloque `||basic.pause||` para definir la duración de la pausa.
Completa tu programa.

## Uso de variables @showdialog

Utiliza una variable para definir la velocidad de tu animación y ajustarla fácilmente.

## Create variable tempo

Create a `||variables.variable||` and name it "tempo".

```
```

![](https://calliope.cc/tutorials/variable_neu.png)

## Configura el valor de tempo

Utiliza el bloque `||variables.set tempo to||` para configurar la variable `||variables.tempo||` con el valor `1000`.

## Uso de la variable Tempo

Sustituye los valores de los bloques de pausa con la variable `||variables.tempo||`.

## ¡Hecho! 🎉

Pulsa en `|Descargar|` para transferir el programa a tu Calliope mini.