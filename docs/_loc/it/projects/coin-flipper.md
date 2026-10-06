# Lancio della monetina

## Introduction @unplugged

Let's create a coin flipping program to simulate a real coin toss. We'll use icon images to represent a `heads` or `tails` result.

![Simulazione del lancio della moneta](https://cdn.makecode.com/blob/c3328d2b3c722766adea6e0e3d6c50367896ba07/static/calliope/tutorials/08_coin_flipper_animation.gif)

## Fase 1

Let's start with the `||input:on button A pressed||` block on the Workspace. We'll put our coin flipping code in here.

```blocks
input.onButtonEvent(Button.A, input.buttonEventValue(ButtonEvent.Click), () => {
})
```

## Fase 2

Prendi un blocco `||logic:se altrimenti||` e mettilo all'interno del blocco `||input:quando premi pulsante A||`. Metti un blocco `||Math:valore casuale vero o falso||` nella condizione del blocco `||logic:se||`.

Il blocco `||Math:valore casuale vero o falso||` restituisce un valore casuale `vero` o `falso` che possiamo usare per determinare il risultato `testa` o `croce` del lancio della monetina.

```blocks
input.onButtonEvent(Button.A, input.buttonEventValue(ButtonEvent.Click), () => {
    if (Math.randomBoolean()) {
    } else {
    }
})
```

## Fase 3

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

## Fase 4

Press button **A** in the simulator to try the coin toss code.

## Fase 5

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

## Fase 6

Se hai un @boardname@, collegalo con il cavo USB e clicca su `|Download|` per trasferire il tuo programma.

## Fase 7

Press button **A** for a flip. Test your luck and guess `heads` or `tails` before the toss is over!

```template
input.onButtonEvent(Button.A, input.buttonEventClick(), function() {})
```