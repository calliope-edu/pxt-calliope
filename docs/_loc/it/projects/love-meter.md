# Affinità di coppia

## Introduction @unplugged

Crea un amorometro, che dolce! @boardname@ sente l'affinità di coppia, ehm... non proprio!

![Messaggio banner del sensore di affinità di coppia](https://cdn.makecode.com/blob/f66fb26c6f73e95493dee6583de311da1e660901/static/calliope/tutorials/05_love_meter_animation.gif)

## Fase 1

Let's build a **LOVE METER** machine. We'll use an `||input:on pin pressed||` block to run code when pin **0** is pressed. Scegli `P0` dalla lista dei pin di ingresso.

```blocks
input.onPinTouchEvent(TouchPin.P0, input.buttonEventValue(ButtonEvent.Down), () => {
});
```

## Fase 2

Using `||basic:show number||` and `||Math:pick random||` blocks, show a random number from `0` to `100` when pin **0** is pressed.

```blocks
input.onPinTouchEvent(TouchPin.P0, input.buttonEventValue(ButtonEvent.Down), () => {
    basic.showNumber(randint(0, 100));
});
```
## Fase 3

Click on pin **0** in the simulator and see which number is chosen.

## Fase 4

Visualizza la scritta `"LOVE"` sullo schermo quando si accende il @boardname@.

```blocks
basic.showString("LOVE METER");
input.onPinTouchEvent(TouchPin.P0, input.buttonEventValue(ButtonEvent.Down), () => {
    basic.showNumber(randint(0, 100));
});
```

## Fase 5

Click `|Download|` to transfer your code in your @boardname@. Hold the **GND** pin with one hand and press pin **0** with the other hand to trigger this code.