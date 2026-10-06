# LEDs anzeigen

Zeigt ein Bild auf der [LED-Matrix](/device/screen) an.

```sig
basic.showLeds(`
    . . . . .
    . # . # .
    . . # . .
    # . . . #
    . # # # .
    `
)
```

## Parameter

* `leds` ist ein [string](/types/string), der steuert, welche LEDs an- und ausgeschaltet sind.
* `intervall` ist eine optionale [Zahl](/types/number) die angibt, wie viele Millisekunden nach der Anzeige eines Bildes zu warten sind. Wenn du mit Blocks programmierst, wird `Interval` auf 400 Millisekunden festgelegt.

### ~ hint

#### LED display

Watch this video to see how the @boardname@ shows numbers, text, and displays images with [LEDs](/reference/led).

https://www.youtube.com/watch?v=qqBmvHD5bCw

### ~

## Beispiel

Dieses Programm zeigt ein Bild mit der Funktion `Zeige LEDs`.

```blocks
basic.showLeds(`
    # # . # #
    # # . # #
    . # # # .
    . # . # .
    . # . # .
    `
)
```

## ~hint

Wenn du in JavaScript programmierst, bedeutet `#` dass eine LED ein- und bei `.` ausgeschaltet ist.

## ~

## Siehe auch

[Symbol anzeigen](/reference/basic/show-icon)