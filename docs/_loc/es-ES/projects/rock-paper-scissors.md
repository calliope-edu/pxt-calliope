# Piedra, Papel o Tijeras

## {Introduction @unplugged}

![Animación del juego Piedra, Papel o Tijeras](https://cdn.makecode.com/blob/4bac740b4763c09e83c06687e7159c237bbc7150/static/calliope/tutorials/07_stone_paper_scissors_animation.gif)

Convierte tu Calliope mini en un juego de **Piedra, Papel o Tijeras** ¡al que podrás jugar con tus amigos!

## {Step 1}

Primero tenemos que crear una variable para saber si tenemos Piedra, Papel o Tijeras en la mano. Una variable es un contenedor para almacenar valores. Pulsa en la categoría `||variables:Variables||` de la Caja de Herramientas. Pulsa el botón **Crear una variable**. Ponle a tu nueva variable el nombre "mano" y haz clic en Ok.


## {Step 2}

Pulsa en la categoría `||variables:Variables||` en la Caja de Herramientas de nuevo. Notarás que han aparecido algunos bloques nuevos. Arrastra un bloque `||variables:configurar mano||` dentro del bloque `||input:al agitar||`. Empezaremos nuestro juego de Piedra, Papel o Tijeras cuando agitemos 👋 nuestro Calliope mini.

```blocks
let hand = 0;
input.onGesture(Gesture.Shake, function() {
    hand = 0
})
```

## {Step 3}

Pulsa en la categoría `||math:Matemáticas||` en la Caja de Herramientas. Arrastra un bloque `||math:elegir aleatorio||` y suéltalo dentro del bloque `||variables:configurar mano||` reemplazando el número 0. Ahora, cuando agitemos nuestro Calliope mini, la manecilla variable contendrá un número aleatorio entre 1 y 3.

```blocks
let hand = 0;
input.onGesture(Gesture.Shake, function() {
    hand = randint(1, 3)
})
```

## {Step 4}

Pulsa en la categoría `||logic:Lógica||` de la Caja de Herramientas. Arrastra el bloque `||logic:si es cierto entonces sino||` al espacio de trabajo y suéltalo dentro del bloque `||input:al agitar||` debajo del bloque `||variables:configurar mano||`.

```blocks
let hand = 0;
input.onGesture(Gesture.Shake, function() {
    hand = randint(1, 3)
    if (true) {

    } else {

    }
})
```

## {Step 5}

Desde la categoría `||logic:Lógica||`, arrastra un bloque de comparación `||logic:0 = 0||` y suéltalo en el bloque `||logic:si es cierto entonces si no||` sustituyendo a **verdadero**.

```blocks
let hand = 0;
input.onGesture(Gesture.Shake, function() {
    hand = randint(1, 3)
    if (0 == 0) {

    } else {

    }
})
```

## {Step 6}

Pulsa en la categoría `||variables:Variables||` de la Caja de Herramientas. Arrastra un bloque `||variables:mano||` y suéltalo en el bloque de comparación `|logic:0 = 0||` reemplazando el primer **0**.  Pulsa sobre el segundo 0 del bloque de comparación y cámbialo a **1**.

```blocks
let hand = 0;
input.onGesture(Gesture.Shake, function() {
    hand = randint(1, 3)
    if (hand == 1) {

    } else {

    }
})
```

## {Step 7}

Pulsa en la categoría `||basic:Básico||` en la Caja de Herramientas. Arrastra un bloque `||basic:mostrar icono||` y suéltalo debajo de `||logic:si mano = 1 entonces||`. En el bloque `||basic:mostrar icono||`, pulsa sobre el icono del Corazón y en su lugar selecciona el pequeño icono cuadrado que representa una 💎 Roca.

```blocks
let hand = 0;
input.onGesture(Gesture.Shake, function() {
    hand = randint(1, 3)
    if (hand == 1) {
        basic.showIcon(IconNames.SmallSquare)
    } else {

    }
})
```

## {Step 8}

En la parte inferior del bloque `||logic:if then else||`, pulsa sobre el signo más **'+'**. Esto ampliará el código para incluir una cláusula `||logic:sino si||`.

```blocks
let mano = 0;
input.onGesture(Gesture.Shake, function() {
    mano = randint(1, 3)
    if (mano == 1) {
        basic.showIcon(IconNames.SmallSquare)
    } else if (false) {

    } else {

    }
})
```

## {Step 9}

Desde la categoría `||logic:Lógica||`, arrastra un bloque de comparación `||logic:0 = 0||` y suéltalo en el espacio abierto junto a la cláusula `||logic:sino si||`.

```blocks
let hand = 0;
input.onGesture(Gesture.Shake, function() {
    hand = randint(1, 3)
    if (hand == 1) {
        basic.showIcon(IconNames.SmallSquare)
    } else if (0 == 0) {

    } else {

    }
})
```

## {Step 10}

Desde la categoría `||variables:Variables||`, arrastra un bloque `||variables:mano||` y suéltalo en el bloque de comparación `|logic:0 = 0||` sustituyendo al primer **0**.  Pulsa sobre el segundo 0 del bloque de comparación y cámbialo a **2**.

```blocks
let hand = 0;
input.onGesture(Gesture.Shake, function() {
    hand = randint(1, 3)
    if (hand == 1) {
        basic.showIcon(IconNames.SmallSquare)
    } else if (hand == 2) {

    } else {

    }
})
```

## {Step 11}

De la categoría `||basic:Básico||`, arrastra un bloque `||basic:mostrar icono||` y suéltalo debajo de `||logic:sino si mano = 2 entonces||`. En el bloque `||basic:mostrar icono||`, pulsa sobre el icono Corazón y en su lugar selecciona el icono cuadrado grande para representar 📃 Papel.

```blocks
let hand = 0;
input.onGesture(Gesture.Shake, function() {
    hand = randint(1, 3)
    if (hand == 1) {
        basic.showIcon(IconNames.SmallSquare)
    } else if (hand == 2) {
        basic.showIcon(IconNames.Square)
    } else {

    }
})
```

## {Step 12}

Now let's deal with the last condition - if our hand variable isn't holding a 1 (Rock) or a 2 (Paper), then it must be 3 (✂️ Scissors)! Desde la categoría `||basic:Básico||`, arrastra otro bloque `||basic: mostrar icono||` y suéltalo en el último hueco bajo la categoría `||logic:si no||`.  En el bloque `||basic:mostrar icono||`, pulsa en el icono de Corazón y selecciona el icono de Tijeras.

```blocks
let hand = 0;
input.onGesture(Gesture.Shake, function() {
    hand = randint(1, 3)
    if (hand == 1) {
        basic.showIcon(IconNames.SmallSquare)
    } else if (hand == 2) {
        basic.showIcon(IconNames.Square)
    } else {
        basic.showIcon(IconNames.Scissors)
    }
})
```

## {Step 13}

¡Vamos a probar tu código! Pulsa el botón blanco **SHAKE** del simulador en pantalla de Calliope mini, o mueve el cursor rápidamente hacia delante y hacia atrás sobre el simulador. ¿Ves los iconos de piedra, papel y tijeras aparecer aleatoriamente?  ⭐ ¡Buen trabajo! ⭐


## {Step 14}

If you have a @boardname@ device, connect it to your computer and click the `|Download|` button. Follow the instructions to transfer your code onto the @boardname@. Once your code has been downloaded, attach your Calliope mini to a battery pack and challenge another Calliope mini or a human to a game of Rock, Paper, Scissors!


## {Step 15}

Go further - Try adding 🎵 Music 🎵 blocks to your Rock Paper Scissors game for different sound effects. Note that some Music blocks may require a Calliope mini 3 device to play.

```blocks

let hand = 0
input.onGesture(Gesture.Shake, function () {
    hand = randint(1, 3)
    if (hand == 1) {
        basic.showIcon(IconNames.SmallSquare)
        music.playTone(131, music.beat(BeatFraction.Whole))
    } else if (hand == 2) {
        basic.showIcon(IconNames.Square)
        music.playTone(392, music.beat(BeatFraction.Double))
    } else {
        basic.showIcon(IconNames.Scissors)
        music.playTone(784, music.beat(BeatFraction.Whole))
    }
})

```

```blockconfig.global
randint(1, 3)
```

```template
input.onGesture(Gesture.Shake, function() {})
```


```package
v3
```