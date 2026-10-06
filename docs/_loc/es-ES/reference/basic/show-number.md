# Show Number

Show a number on the [LED screen](/device/screen). It will slide left if it has more than one digit.

```sig
basic.showNumber(2)
```

## Parameters

* `value` is a [Number](/types/number). If the number is not single-digit number, it will scroll on the display.
* `interval` is an optional [Number](/types/number). It means the number of milliseconds before sliding the `value` left by one LED each time. Bigger intervals make the sliding slower.

## Examples:

To show the number 10:

```blocks
basic.showNumber(10)
```

To show the number stored in a variable:

```blocks
let x = 1
basic.showNumber(x)
```

## Example: count to 5

This example uses a [for](/blocks/loops/for) loop to show numbers `0` through `5` on the screen:

```blocks
for (let i = 0; i < 6; i++) {
    basic.showNumber(i)
    basic.pause(200)
}
```

## Avanzado

If `value` is `NaN` (not a number), `?` is displayed.

## Other show functions

Usa [show string](/reference/basic/show-string) para mostrar una cadena de texto [String](/types/string) con letras en la pantalla.

## Ver también

[mostrar cadena](/reference/basic/show-string), [Número](/types/number), [Matemática](/blocks/math)