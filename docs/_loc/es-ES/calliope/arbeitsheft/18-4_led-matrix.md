# 18.4-5 Lanzamiento de cohete

```ghost
basic.showNumber(3, 500)
basic.showNumber(2, 500)
basic.showNumber(1, 500)
basic.showNumber(0, 500)
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

Lanza un cohete sobre la matriz LED. Tienes que pensar en fotogramas individuales como un animador profesional.

## Crear símbolo

Utiliza el bloque `||basic.show LEDs||` para mostrar un cohete.

## Crear animación

Crea fotogramas individuales de la animación. Duplica el bloque `||basic.show LEDs|||` y mueve las filas de píxeles de abajo a arriba, una fila cada vez.

## Cuenta atrás

Muestra una cuenta atrás de 3-2-1-0 antes de la animación del cohete. Utiliza el bloque `||basic.show number||`.

## ¡Hecho! 👍

Pulsa en `|Descargar|` para transferir el programa a tu Calliope mini.

```template
//
```