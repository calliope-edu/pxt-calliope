# Love Meter

## Introduction @unplugged

Make a love meter, how sweet! The @boardname@ is feeling the love, then sometimes not so much!

![Mensaje del banner del medidor de amor](https://cdn.makecode.com/blob/f66fb26c6f73e95493dee6583de311da1e660901/static/calliope/tutorials/05_love_meter_animation.gif)

## Paso 1

Let's build a **LOVE METER** machine. We'll use an `||input:on pin pressed||` block to run code when pin **0** is pressed. Use `P0` from the list of pin inputs.

```blocks
input.onPinTouchEvent(TouchPin.P0, input.buttonEventValue(ButtonEvent.Down), () => {
});
```

## Paso 2

Using `||basic:show number||` and `||Math:pick random||` blocks, show a random number from `0` to `100` when pin **0** is pressed.

```blocks
input.onPinTouchEvent(TouchPin.P0, input.buttonEventValue(ButtonEvent.Down), () => {
    basic.showNumber(randint(0, 100));
});
```
## Paso 3

Click on pin **0** in the simulator and see which number is chosen.

## Step 4

Show `"LOVE METER"` on the screen when the @boardname@ starts.

```blocks
basic.showString("LOVE METER");
input.onPinTouchEvent(TouchPin.P0, input.buttonEventValue(ButtonEvent.Down), () => {
    basic.showNumber(randint(0, 100));
});
```

## Paso 5

Click `|Download|` to transfer your code in your @boardname@. Hold the **GND** pin with one hand and press pin **0** with the other hand to trigger this code.