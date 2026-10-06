# Coin Flipper

## Introduction @unplugged

Let's create a coin flipping program to simulate a real coin toss. We'll use icon images to represent a `heads` or `tails` result.

![Simulating coin toss](https://cdn.makecode.com/blob/c3328d2b3c722766adea6e0e3d6c50367896ba07/static/calliope/tutorials/08_coin_flipper_animation.gif)

## Paso 1

Let's start with the `||input:on button A pressed||` block on the Workspace. We'll put our coin flipping code in here.

```blocks
input.onButtonEvent(Button.A, input.buttonEventValue(ButtonEvent.Click), () => {
})
```

## Paso 2

Grab an `||logic:if else||` block and set it inside `||input:on button A pressed||`. Coloca un `||Math:elige aleatoriamente verdadero o falso||` en el `|logic:if||` como su condición.

El `||Math:elige aleatorio verdadero o falso||` devuelve un valor aleatorio `verdadero` o `falso` que utilizamos para determinar un resultado `cara` o `cruz` para el lanzamiento de una moneda.

```blocks
input.onButtonEvent(Button.A, input.buttonEventValue(ButtonEvent.Click), () => {
    if (Math.randomBoolean()) {
    } else {
    }
})
```

## Paso 3

Now, put a `||basic:show icon||` block inside both the `||logic:if||` and the `||logic:else||`. Pick images to mean `heads` and `tails`.

```blocks
input.onButtonEvent(Button.A, input.buttonEventValue(ButtonEvent.Click), () => {
    if (Math.randomBoolean()) {
        basic.showIcon(IconNames.Skull)
    } else {
        basic.showIcon(IconNames.Square)
    }
})
```

## Step 4

Press button **A** in the simulator to try the coin toss code.

## Paso 5

You can animate the coin toss to add the feeling of suspense. Place different `||basic:show icon||` blocks before the `||logic:if||` to show that the coin is flipping.

```blocks
input.onButtonEvent(Button.A, input.buttonEventValue(ButtonEvent.Click), () => {
    basic.showIcon(IconNames.Diamond)
    basic.showIcon(IconNames.SmallDiamond)
    basic.showIcon(IconNames.Diamond)
    basic.showIcon(IconNames.SmallDiamond)
    if (Math.randomBoolean()) {
        basic.showIcon(IconNames.Skull)
    } else {
        basic.showIcon(IconNames.Square)
    }
})
```

## Paso 6

If you have a @boardname@, connect it to USB and click `|Download|` to transfer your code.

## Paso 7

Press button **A** for a flip. Test your luck and guess `heads` or `tails` before the toss is over!

```template
input.onButtonEvent(Button.A, input.buttonEventClick(), function() {})
```