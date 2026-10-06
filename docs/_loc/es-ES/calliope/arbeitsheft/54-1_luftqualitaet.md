# 54_Calidad del aire

```ghost
let temperatur = 0
function Temperatur_messen () {
    temperatur = SCD40.get_temperature(SCD40.SCD40_T_UNIT.C)
    if (temperatur > 30) {
        music.playTone(262, music.beat(BeatFraction.Whole))
    } else if (temperatur < 18) {
        music.playTone(262, music.beat(BeatFraction.Whole))
    } else {
        music.rest(music.beat(BeatFraction.Whole))
    }
}
basic.forever(function () {
    Temperatur_messen()
    basic.pause(60000)
})
```

## Tarea @showdialog

El aire que te rodea juega un papel importante en tu bienestar.
Programa una pantalla que te informe cuando hace demasiado calor, la humedad es demasiado alta o demasiado baja
y cuando es necesario airearla nuevamente.

## Mide la temperatura @showdialog

Comienza a medir la temperatura y utiliza el altavoz para el aviso de temperatura.
Haz sonar un tono de advertencia si la temperatura es demasiado fría o demasiado caliente.

## Mide la temperatura

Se requiere una rama `||logic.if/then/else||` de los bloques `||logic.logic||` para que se pueda reproducir un sonido si la temperatura supera los 30 °C, por ejemplo. Para poder medir y comparar la temperatura de forma permanente, inserta la rama en el bucle `||basic.forever||`.

## Compara el valor medido

Inserta una `||logic.logical comparison||`, con la que compararás la temperatura `||SCD40.temperature||` medida del sensor de CO2 con un valor límite. Si la temperatura es > 30, por ejemplo, se reproduce un tono `||music.warning tone||`.

## Añade una rama

Pulsa sobre `||logic.+|||` en la sentencia condicional `||logic.conditional|||` para añadir otra condición y que también suene un tono de aviso si hace demasiado frío y la temperatura del `||SCD40.temperature||` cae por debajo de 18 grados, por ejemplo.

## Define la salida

Añade una sección `||logic.else||` a `||music.Pause|||` para que no se reproduzca ningún sonido de aviso si la temperatura no es ni demasiado cálida ni demasiado fría.

## Mide el contenido de CO2 @showdialog

¡Genial, has realizado la medición de la temperatura! 👍 El semáforo de CO2 funciona de forma muy similar. En lugar de la temperatura, ahora se mide el contenido de CO2 y, en lugar de reproducir sonidos, se enciende el LED RGB.

## Medición de la concentración de CO2

El contenido de CO2 en el aire se muestra en ppm (partes por millón). Cualquier valor por debajo de 1000 ppm es inofensivo.

## Compara el valor medido

Crea una segunda derivación `||logic.logical|||` y compara el `||SCD40 medido. CO2||` con los valores límite. Si el valor es superior a 2000, deja que el `||basic.RGB-LED||` se ilumine en rojo. Si está por debajo de 1000, se ilumina en verde. Si el valor está en medio, se ilumina en amarillo.

## Mide la humedad @showdialog

El siguiente paso es medir la humedad. Utiliza la matriz de LED para visualizar la humedad. La sensación de confort oscila entre el 30% y el 70%.
Rellena las barras de la matriz LED con el porcentaje de humedad.

## Añade condiciones @showdialog

Inserta una tercera derivación `||logic.if/then|||` en el bucle `||basic.forever||`.
Pulsa sobre `||logic.+|||` para insertar las cinco condiciones y crear una derivación múltiple.

\*En una derivación múltiple, las condiciones se comprueban de arriba abajo. En cuanto una es verdadera, se ejecuta el bloque de código de la condición correspondiente y se ignoran las siguientes. Por lo tanto, el orden de las condiciones es importante.

## Compara el valor medido

Lee la `||SCD40.humidity|||` y compárala con las condiciones.

< 30 %, la matriz de LED debe estar vacía
< 40 %, una barra llena
< 50 %, dos barras llenas, etc.

> 70 %, se enciende toda la matriz de LED

## Define la salida

Utiliza el bloque `||basic.show LEDs||` para rellenar las barras de la matriz de LEDs.

## Define el intervalo de tiempo

¡Excelente! Ya casi lo has hecho. Añade un `||basic.pause|||` al bucle continuo para que los valores de los sensores se actualicen en un intervalo de tiempo específico.
Pulsa en `|Descargar|` para transferir el programa a tu Calliope mini.

## Crea funciones @showdialog

Para que el programa sea más claro, crea tres `||function.functions||` para la medición: temperatura, contenido de CO2 y humedad.

! [funciones] (https://calliope.cc/tutorials/funktion_erstellen.png)

## Crea variables

Guarda también el valor del sensor una vez en una `||variables.variable||` para que no se lea varias veces. Crea una variable para el valor respectivo del sensor: temperatura, humedad y contenido de CO2 e impleméntala en las funciones.

## Llama a funciones

Por último, pero no menos importante, la función `||function.functions|||` debe ser llamada en el bucle `||basic.forever|||` para que la medición del sensor tenga lugar.

## ¡Hecho! 👏

Pulsa en `|Descargar|` para transferir el programa a tu Calliope mini.

```package
co2sensor=github:calliope-edu/co2-sensor-scd40
```