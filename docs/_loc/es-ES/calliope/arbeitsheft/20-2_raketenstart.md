# 20 2_Lanzamiento del cohete

```ghost
basic.showNumber(3)
basic.pause(100)
basic.showNumber(2)
basic.pause(100)
basic.showNumber(1)
basic.pause(100)
basic.showNumber(0)
basic.pause(100)
basic.showLeds(`
 . . # . .
 . # # # .
 . # # # .
 . . # . .
 . # . # .
 `)
basic.showLeds(`
 . # # # .
 . # # # .
 . . # . .
 . # . # .
 . . . . .
 `)
basic.showLeds(`
 . # # # .
 . . # . .
 . # . # .
 . . . . .
 . . . . .
 `)
basic.showLeds(`
 . . # . .
 . # . # .
 . . . . .
 . . . . .
 . . . . .
 `)
basic.showLeds(`
 . # . # .
 . . . . .
 . . . . .
 . . . . .
 . . . . .
 `)
basic.showLeds(`
 . . . . .
 . . . . .
 . . . . .
 . . . . .
 . . . . .
 `)
```

## Tarea @showdialog

Utiliza una variable para determinar la velocidad de tu animación y ajústala convenientemente en lugar de cambiar la velocidad una y otra vez en cada bloque de pausa.

## Crear variable

Crea una `||variables.variable||` y nómbrala "Tempo".

```
```

![](https://calliope.cc/tutorials/variable_tempo.png)

## Insertar variable

Utiliza el bloque `||variables.set tempo to||` para configurar la variable Tempo con el valor `100`. Atención: ¡Coloca el bloque antes de la cuenta atrás!

## Reemplazar

Reemplaza los valores de los bloques de pausa con la variable `||variables.tempo|||`.

## Ralentiza la cuenta atrás

Ralentiza la cuenta atrás configurando el valor de la variable `||variables.tempo||` a \`500\`\`.

## ¡Hecho! 🎉

Pulsa en `|Descargar|` para transferir el programa a tu Calliope mini.

```template
basic.showNumber(3)
basic.pause(100)
basic.showNumber(2)
basic.pause(100)
basic.showNumber(1)
basic.pause(100)
basic.showNumber(0)
basic.pause(100)
basic.showLeds(`
 . . # . .
 . # # # .
 . # # # .
 . . # . .
 . # . # .
 `)
basic.showLeds(`
 . # # # .
 . # # # .
 . . # . .
 . # . # .
 . . . . .
 `)
basic.showLeds(`
 . # # # .
 . . # . .
 . # . # .
 . . . . .
 . . . . .
 `)
basic.showLeds(`
 . . # . .
 . # . # .
 . . . . .
 . . . . .
 . . . . .
 `)
basic.showLeds(`
 . # . # .
 . . . . .
 . . . . .
 . . . . .
 . . . . .
 `)
basic.showLeds(`
 . . . . .
 . . . . .
 . . . . .
 . . . . .
 . . . . .
 `)
```

```blocks
let x = 0
```