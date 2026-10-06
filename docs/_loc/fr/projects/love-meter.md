# Love Meter

## Introduction @unplugged

Make a love meter, how sweet! The @boardname@ is feeling the love, then sometimes not so much!

![Love meter banner message](https://cdn.makecode.com/blob/f66fb26c6f73e95493dee6583de311da1e660901/static/calliope/tutorials/05_love_meter_animation.gif)

## Marche à suivre (1ᵉ étape)

Let's build a **LOVE METER** machine. We'll use an `||input:on pin pressed||` block to run code when pin **0** is pressed. Utilise `P0` dans la liste des broches d'entrées.

```blocks
input.onPinTouchEvent(TouchPin.P0, input.buttonEventValue(ButtonEvent.Down), () => {
});
```

## Marche à suivre (2ᵉ étape)

Using `||basic:show number||` and `||Math:pick random||` blocks, show a random number from `0` to `100` when pin **0** is pressed.

```blocks
input.onPinTouchEvent(TouchPin.P0, input.buttonEventValue(ButtonEvent.Down), () => {
    basic.showNumber(randint(0, 100));
});
```
## Marche à suivre (3ᵉ étape)

Click on pin **0** in the simulator and see which number is chosen.

## Marche à suivre (4ᵉ étape)

Montrer `"COMPTEUR D'AMOUR"` à l'écran lorsque la carte @boardname@ s'allume.

```blocks
basic.showString("LOVE METER");
input.onPinTouchEvent(TouchPin.P0, input.buttonEventValue(ButtonEvent.Down), () => {
    basic.showNumber(randint(0, 100));
});
```

## Step 5

Click `|Download|` to transfer your code in your @boardname@. Hold the **GND** pin with one hand and press pin **0** with the other hand to trigger this code.