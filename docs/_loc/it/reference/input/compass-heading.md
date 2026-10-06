# compass Heading

Find which direction on a compass the @boardname@ is facing.

La @boardname@ misura la **direzione della bussola** da `0` a `359` gradi con il suo chip del **magnetometro**. Different numbers mean North, East, South, and West.

```sig
input.compassHeading()
```

## Returns

* a [number](/types/number) from `0` to `359` degrees, which means the compass heading. If the compass isn't ready, it returns `-1003`.

## Compass points

In history, a compass was a device that pointed in the direction of the magnetic North Pole. A needle or or a spot on a moving dial was magnetically attracted to the pole. Using a circular card or diagram arranged with direction indications you could align the indicator with the mark that meant "North" and see which direction the heading you wanted was in.

![Modern plastic compass](https://cdn.makecode.com/blob/33c7e48fc0383010e9ef9865e6d30625cfbd042c/static/device/compass/plastic-compass.jpg)</br> **Magnetic compass**  
*by Evan Amos, Public Domain*

## ~hint

When you run a program that uses this function in a browser, click and drag the compass needle on the screen to change the compass heading.

## ~

## Esempi

### Digital compass

Display the current compass heading in degrees `0` - `359`.

```blocks
basic.forever(function () {
    basic.showNumber(input.compassHeading())
    basic.pause(1000)
})
```

### Analog compass

Find the compass heading and then show an arrow that means whether the @boardname@ is facing north (‰), south (‹), east (Š), or west (ˆ).

```blocks
let degrees = 0
basic.forever(() => {
    degrees = input.compassHeading()
    if (degrees < 45) {
        basic.showIcon(IconNames.ArrowNorth)
    } else if (degrees < 135) {
        basic.showIcon(IconNames.ArrowEast)
    } else if (degrees < 225) {
        basic.showIcon(IconNames.ArrowSouth)
    } else if (degrees < 315) {
        basic.showIcon(IconNames.ArrowWest)
    } else {
        basic.showIcon(IconNames.ArrowNorth)
    }
})
```

## Calibration

Ogni volta che inizi a utilizzare la bussola (ad esempio, se hai appena attivato @boardname@), il @boardname@ avvierà un [calibra bussola](/reference/input/calibrate-compass) (regola se stessa). Il [passaggio per la calibrazione](https://support.microbit.org/support/solutions/articles/19000008874-calibrating-the-micro-bit-compass) ti chiederà di disegnare un motivo di riempimento sullo schermo inclinando @boardname@.

If you are calibrating or using the compass near metal, it might confuse the @boardname@.

## ~ hint

Keep the calibration handy by running it when the user pressed **A+B**.

```block
input.onButtonEvent(Button.AB, input.buttonEventClick(), () => {
    input.calibrateCompass();
})
```

## ~

## Vedi anche

[accelerazione](/reference/input/acceleration), [calibrare bussola](/reference/input/calibrate-compass)