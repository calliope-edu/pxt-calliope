# 41 3 Dados

```ghost
input.onGesture(Gesture.Shake, function () {
basic.showNumber(randint(1, 6))
})
```

## Tarea @showdialog

Convierte el Calliope mini en un dado.
Cuando se agita el Calliope mini, aparece un número aleatorio en la matriz de LED.
![](https://calliope.cc/tutorials/dice_animation.gif)

## Define la entrada

Selecciona el bloque `||input.on shake|||` como entrada.

## Define la salida

Utiliza el bloque `||basic.show number||` para mostrar cualquier número en el primer paso.

## Añade aleatoriedad

Sustituye el número con el bloque `||math.pick random number||` y configura el rango de números de `1 a 6`.

## ¡Hecho! 😍

Pulsa en `|Descargar|` para transferir el programa a tu Calliope mini.

```template
//
```