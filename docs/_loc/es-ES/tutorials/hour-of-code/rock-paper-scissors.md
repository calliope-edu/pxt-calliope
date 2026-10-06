# Piedra, Papel o Tijeras

## Paso 1

Queremos que el @boardname@ elija piedra, papel o tijeras al agitarlo. Coloca un bloque `||input:al agitar||` para que cuando agites el @boardname@, se ejecute parte de un programa.

```blocks
input.onGesture(Gesture.Shake, () => {

})
```

## Paso 2

Añade una variable `herramienta` para almacenar un número aleatorio calculado con `||math:elección aleatoria||`.

Cuando agitas el @boardname@, debería escoger un número aleatorio de `0` a `2` y almacenarlo en la variable `herramienta`. (Esta variable se llama `herramienta` porque piedra, papel y tijeras son las herramientas que utilizas para retar a tus amigos)

```blocks
let tool = 0;
input.onGesture(Gesture.Shake, () => {
    tool = randint(0, 3)
})
```

En un paso posterior, cada uno de los números posibles (`0`, `1` o `2`) se empareja con su propia imagen. La imagen se muestra en los LED cuando se elige su número.

## Paso 3

Coloca un bloque `si` debajo de `||math:elección aleatoria||` y comprueba si `herramienta` es igual a `0`.

```blocks
let tool = 0;
input.onGesture(Gesture.Shake, () => {
    let tool = randint(0, 3)
    if (tool == 0) {
    }
})
```

## Paso 4

En el bloque `si`, coloca un bloque `||basic:mostrar leds||` que muestre una imagen de un trozo de papel.

```blocks
let tool = 0;
input.onGesture(Gesture.Shake, () => {
    let tool = randint(0, 3)
    if (tool == 0) {
        basic.showLeds(`
            # # # # #
            # . . . #
            # . . . #
            # . . . #
            # # # # #
            `)
    }
})
```

## Paso 5

Añade un bloque `else if` al bloque `if` y comprueba si`herramienta` es igual a `1`.

Pulsa sobre el **(+)** en la parte inferior del bloque `if` para añadir una sección `else if`.

```blocks
let tool = 0;
input.onGesture(Gesture.Shake, () => {
    let tool = randint(0, 3)
    if (tool == 0) {
        basic.showLeds(`
            # # # # #
            # . . . #
            # . . . #
            # . . . #
            # # # # #
            `)
    } else if (tool == 1) {
    }
})
```

## Paso 6

Coloca un bloque `||basic:mostrar leds||` debajo del else if y dibuja una imagen de **roca** en la pantalla.

```blocks
let tool = 0;
input.onGesture(Gesture.Shake, () => {
    let tool = randint(0, 3)
    if (tool == 0) {
        basic.showLeds(`
            # # # # #
            # . . . #
            # . . . #
            # . . . #
            # # # # #
            `)
    } else if (tool == 1) {
        basic.showLeds(`
            . . . . .
            . # # # .
            . # # # .
            . # # # .
            . . . . .
            `)
    }
})
```

## Paso 7

Añade un bloque `||basic:mostrar leds||` con una imagen de unas tijeras a la parte `else`.

No es necesario comprobar si `herramienta` es `2` porque `2` es el único número que queda fuera de `0`, `1` y `2`. Por eso puedes usar un `else` en lugar de un `else if`.

```blocks
let tool = 0;
input.onGesture(Gesture.Shake, () => {
    let tool = randint(0, 3)
    if (tool == 0) {
        basic.showLeds(`
            # # # # #
            # . . . #
            # . . . #
            # . . . #
            # # # # #
            `)
    } else if (tool == 1) {
        basic.showLeds(`
            . . . . .
            . # # # .
            . # # # .
            . # # # .
            . . . . .
            `)
    } else {
        basic.showLeds(`
            # # . . #
            # # . # .
            . . # . .
            # # . # .
            # # . . #
            `)
    }
})

```

## Paso 8

¡Tu juego está listo! ¡Reúne a tus amigos y jugar a Piedra, Papel o Tijeras!