# Morra cinese

## Fase 1

We want the @boardname@ to choose rock, paper, or scissors when you shake it. Place a `||input:on shake||` block so when you shake the @boardname@, it will run part of a program.

```blocks
input.onGesture(Gesture.Shake, () => {

})
```

## Fase 2

Aggiungi una variabile `tool` per memorizzare un numero casuale generato da `||math:valore casuale||`.

Quando scuoti il @boardname@, viene generato un numero a caso da `0` a `2` e memorizzato nella variabile `tool`. (This variable is named `tool` because rock, paper, and scissors are the tools you use to challenge your friends!)

```blocks
let tool = 0;
input.onGesture(Gesture.Shake, () => {
    tool = randint(0, 3)
})
```

In a later step, each of the possible numbers (`0`, `1`, or `2`) is matched to its own picture. The picture is shown on the LEDs when its number is picked.

## Fase 3

Posiziona un blocco `se` sotto al blocco `||math:valore casuale||` e controlla se `tool` è uguale a `0`.

```blocks
let tool = 0;
input.onGesture(Gesture.Shake, () => {
    let tool = randint(0, 3)
    if (tool == 0) {
    }
})
```

## Fase 4

Nel blocco `se`, posiziona un blocco `||basic:mostra LED||` che visualizzi l'immagine di un foglio di carta.

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

## Fase 5

Aggiungi un blocco `altrimenti se` al blocco `se`e controlla se `tool` è uguale a `1`.

Click on the **(+)** at the bottom of the `if` block to add an `else if` section.

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

## Fase 6

Place a `||basic:show leds||` block under the else if and draw a **rock** image on the screen.

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

## Fase 7

Cliccando nuovamente sull'ingranaggio, modifica il blocco `||logica:se||` aggiungendo in fondo un blocco `else`. Poi aggiungi un blocco <0>||basic:mostra LED||</0> con l'immagine di una forbice nell'ultimo <0>altrimenti</0>.

Non serve verificare se `tool` è uguale a `2`, perché `2` è l'unico numero rimasto tra `0`, `1`, and `2`. Questo è il motivo per cui alla fine puoi usare un blocco `altrimenti` invece di `altrimenti se`.

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

## Fase 8

Your game is ready! Gather your friends and play Rock Paper Scissors!