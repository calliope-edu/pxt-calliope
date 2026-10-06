# Pinzas de cocodrilo

The large holes at the bottom of the board are designed to attach alligator/crocodile clips to create electrical circuit with other components.

# ~nota

**No crocodile clips!?!?!** Use [wires or aluminium foil](/device/foil-circuits)!

# ~


## Connecting crocodile clips

The hole for `P0` and `GND` allow to grab the board on the side which makes for a great grip.

![](https://cdn.makecode.com/blob/97c0a42ae73c7ffb0e22b50e2410f02549b87567/static/mb/device/croc-clips/crocclipsclamped.jpg)

Pass one jaw in the hole and grab the side of the board with the other jaw.

![](https://cdn.makecode.com/blob/24db12cc0e122866e812f214305b7f2a9a2a709f/static/mb/device/croc-clips/sideclamp.jpg)

For the center holes, `P1` and `P2`, you can also grab the bottom of the board but they are a bit harder to grip.

You can also grip the board between the jaws. In which case, you will want to make sure to avoid overlapping the jaws with the other pins as it will create short-circuit in the board.

![](https://cdn.makecode.com/blob/315d4efead59dfb28d9b59798c6bd74a97048ea2/static/mb/device/croc-clips/badclamp.jpg)

Adding a little tape helps keeping the crocodile clips in place.

![](https://cdn.makecode.com/blob/eca31b20bb5fbbd1206ffe3134e207f90aae33a4/static/mb/device/croc-clips/frontclamp.jpg)

## Example: on pin pressed with random numbers

This example displays a random number every time the crocodile clip holds  `GND` then connects and disconnects the `P0` pin. Each time the crocodile clip is firmly connected and disconnected from pin `P0`, the @boardname@ will return a random Number between 0 and the parameter limit.

```blocks
input.onPinTouchEvent(TouchPin.P0, input.buttonEventValue(ButtonEvent.Down), () => {
    basic.showNumber(randint(0, 10))
})
```

## Ver también

[Calliope mini pins](/device/pins)