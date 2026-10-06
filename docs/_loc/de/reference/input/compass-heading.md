# compass Heading

Findet heraus, in welche Richtung auf einem Kompass der @boardname@ zeigt.

Der @boardname@ ermittelt die **Kompassausrichtung** von `0` bis `359` Grad mit seinem **Magnetsensorchip**. Different numbers mean North, East, South, and West.

```sig
input.compassHeading()
```

## Rückgabewert

* eine [Zahl](/types/number) von `0` bis `359` Grad, d. h. die Kompassausrichtung. Wenn der Kompass nicht bereit ist, wird `-1003` zurückgegeben.

## Compass points

In history, a compass was a device that pointed in the direction of the magnetic North Pole. A needle or or a spot on a moving dial was magnetically attracted to the pole. Using a circular card or diagram arranged with direction indications you could align the indicator with the mark that meant "North" and see which direction the heading you wanted was in.

![Modern plastic compass](https://cdn.makecode.com/blob/33c7e48fc0383010e9ef9865e6d30625cfbd042c/static/device/compass/plastic-compass.jpg)</br> **Magnetic compass**  
*by Evan Amos, Public Domain*

## ~hint

Wenn du ein Programm ausführst, das diese Funktion in einem Browser verwendet, klicke und ziehe die Kompassnadel auf dem Bildschirm, um die Kompassrichtung zu ändern.

## ~

## Beispiele

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

## Kalibrierung

Jedes Mal, wenn man den Kompass benutzt (z. B., wenn man gerade den @boardname@ eingeschaltet hat), beginnt der @boardname@ sich neu zu justieren. Der [Kalibrierungsschritt](https://support.microbit.org/support/solutions/articles/19000008874-calibrating-the-micro-bit-compass) fordert auf, ein Füllmuster auf dem Bildschirm zu zeichnen, indem der Calliope mini alle Richtungen geneigt wird.

Wenn man den Kompass in der Nähe von Metall kalibriert oder benutzt, kann es sein, dass der @boardname@ dadurch verwirrt wird.

## ~ hint

Um die Kalibrierung immer griffbereit zu halten, führen wir diese aus, wenn der Benutzer **A+B** drückt.

```block
input.onButtonEvent(Button.AB, input.buttonEventClick(), () => {
    input.calibrateCompass();
})
```

## ~

## Siehe auch

[Beschleunigung](/reference/input/acceleration), [Kompass kalibrieren](/reference/input/calibrate-compass)