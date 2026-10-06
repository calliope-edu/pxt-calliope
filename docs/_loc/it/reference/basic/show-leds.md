# Show LEDs

Shows a picture on the [LED screen](/device/screen).

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

## Parametri

* `leds` is a [string](/types/string) that controls which LEDs are on and off.
* `interval` is an optional [number](/types/number) that means how many milliseconds to wait after showing a picture. Se stai programmando con i blocchi, l'`intervallo` è configurato a 400 millisecondi.

### ~ hint

#### LED display

Watch this video to see how the @boardname@ shows numbers, text, and displays images with [LEDs](/reference/led).

https://www.youtube.com/watch?v=qqBmvHD5bCw

### ~

## Esempio

This program shows a picture with the `show leds` function.

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

Se stai programmando in JavaScript, `#` significa che un LED è acceso e `.` significa che un LED è spento.

## ~

## Vedi anche

[show icon](/reference/basic/show-icon)