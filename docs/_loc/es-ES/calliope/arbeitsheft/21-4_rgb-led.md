# 21 4 RGB-LED

```ghost
let Tempo = 100
basic.setLedColor(0xff0000)
basic.pause(Tempo)
basic.setLedColor(0xff8000)
basic.pause(Tempo)
basic.setLedColor(0xffff00)
basic.pause(Tempo)
basic.setLedColor(0x00ff00)
basic.pause(Tempo)
basic.setLedColor(0x00ffff)
basic.pause(Tempo)
basic.setLedColor(0x007fff)
basic.pause(Tempo)
basic.setLedColor(0xb09eff)
```

## Tarea @showdialog

Programa un arco iris. Utiliza los siguientes colores:
rojo, naranja, amarillo, verde, turquesa, azul, morado.

## Crear variable

Crea una `||variables.variable||` y nómbrala "Tempo".

```
```

![](https://calliope.cc/tutorials/variable_tempo.png)

## Configurar tempo

Utiliza el bloque `||variables.set tempo to||` de la categoría `||variables.variables||` para configurar la variable Tempo con el valor `100`. Coloca el bloque al principio en la `||basic.Start function|||`.

## RGB LED

Utiliza el bloque `||basic.set color to||` y arrástralo hasta la función `||basic.on start|||`. Configura el bloque para que el LED RGB se ilumine en rojo.

## Reemplaza el valor de pausa

Añade un bloque `||basic.pause||` y sustituye el valor de pausa con el bloque `||variables.tempo||`.

## Arcoíris

Por cada color adicional, añade un bloque `||basic.set LED to||` y un bloque `||basic.pause||`.

## ¡Hecho! ✨

Pulsa en `|Descargar|` para transferir el programa a tu Calliope mini.

```template
//
```