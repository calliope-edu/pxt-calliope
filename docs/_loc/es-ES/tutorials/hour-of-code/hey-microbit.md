# ¡Hola, @boardname@!

## Paso 1

Bienvenido, ¡vamos a programar el @boardname@! Coloca el bloque `||basic:mostrar cadena||` en la ranura `|basic:al iniciar||`. Cambia el texto `"Hola"` por tu nombre. ¿Lo has visto desplazarse en el simulador?.

```blocks
basic.showString("My Name")
```

## Paso 2

Bueno, te diste cuenta de que el texto se detuvo. Coloca el bloque `||basic:mostrar cadena||` en un bloque `||input:al pulsar el botón||` para desplazar tu nombre cada vez que se pulse el botón **A**.

```block
input.onButtonEvent(Button.A, input.buttonEventValue(ButtonEvent.Click), () => {
    basic.showString("My Name")
});
```

## Paso 3

Bien, intentemos hablar con el @boardname@ utilizando un botón. Cambia el texto en `||basic:mostrar cadena||` para hacer la pregunta "¿Cómo estás?". Añade otro `||basic:mostrar cadena||` con "....." para mostrar que el @boardname@ está pensando.

```block
input.onButtonEvent(Button.A, input.buttonEventValue(ButtonEvent.Click), () => {
    basic.showString("How are you?")
    basic.showString(".....");
})
```

## Paso 4

Ahora, ¡haz que el @boardname@ dé una respuesta con una carita sonriente! Busca el bloque `||basic:mostrar leds||` y dibuja una cara sonriente en el bloque pulsando sobre los leds. Pulsa el botón **A** en el simulador y verás cómo el @boardname@ responde a tu pregunta.

```block
input.onButtonEvent(Button.A, input.buttonEventValue(ButtonEvent.Click), () => {
    basic.showString("How are you?")
    basic.showString(".....");
    basic.showLeds(`
    # # . # #
    # # . # #
    . . . . .
    # . . . #
    . # # # .
    `)
})
```

## Paso 5

Bien, vamos a preguntarle al @boardname@ cómo se siente en este momento, pero por un método diferente. Podemos utilizar el gesto de agitar para hacer la pregunta. Vete a por un bloque `||input:al agitar||`. Coge tu bloque `||basic:mostrar leds||` de antes y ponlo en el `||input:al agitar||`.

```block
input.onGesture(Gesture.Shake, () => {
    basic.showLeds(`
    # # . # #
    # # . # #
    . . . . .
    # . . . #
    . # # # .
    `)
})
```

## Paso 6

Queremos que el @boardname@ cambie sus sensaciones en diferentes momentos. Tendrá dos estados de ánimo, alegre y triste. Vete a **Lógica** y coge un `||logic:if then else||`. Ponlo en la ranura `||input:al agitar||` y mueve la ranura `||basic: mostrar leds||` a la ranura `|logic:if then||`.

```block
input.onGesture(Gesture.Shake, () => {
    if (true) {
        basic.showLeds(`
            # # . # #
            # # . # #
            . . . . .
            # . . . #
            . # # # .
            `)
    } else {

    }
})
```

## Paso 7

Duplica el bloque `||basic:mostrar leds||` (pulsa el botón derecho del ratón y selecciona Duplicar). Pon el nuevo en la parte `||logic:else||` del `|logic:if then else||`. Esta vez, conviértelo en una cara con el ceño fruncido.

```block
input.onGesture(Gesture.Shake, () => {
    if (true) {
        basic.showLeds(`
            # # . # #
            # # . # #
            . . . . .
            # . . . #
            . # # # .
            `)
    } else {
        basic.showLeds(`
            # # . # #
            # # . # #
            . . . . .
            . # # # .
            # . . . #
            `)
    }
})
```

## Paso 8

Prueba su estado de ánimo cambiando la condición en el `||logic:if||` de `cierto` a `falso` y, a continuación, pulsa el punto **SHAKE** en el simulador.

## Paso 9

Entonces, para que el @boardname@ sea más voluble, démosle un estado de ánimo aleatorio. Encuentra el bloque `||math:elige aleatoriamente verdadero o falso||` en **Matemáticas**. Sácalo y úsalo en la condición `||logic:if||` en lugar del valor `cierto`.

```block
input.onGesture(Gesture.Shake, () => {
    if (Math.randomBoolean()) {
        basic.showLeds(`
            # # . # #
            # # . # #
            . . . . .
            # . . . #
            . # # # .
            `)
    } else {
        basic.showLeds(`
            # # . # #
            # # . # #
            . . . . .
            . # # # .
            # . . . #
            `)
    }
})
```

## Paso 10

Ahora, pulsa el punto **SHAKE** unas cuantas veces para ver cómo se siente el @boardname@. Hmm, ¡a veces su humor es diferente!

## Paso 11

¡Impresionante trabajo! Has completado tu actividad Microsoft MakeCode. Si tienes un @boardname@ para usar, pulsa el botón `|Descargar|` y prueba tu código en la placa.