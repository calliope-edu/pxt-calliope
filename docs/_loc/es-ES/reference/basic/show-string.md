# Show String

Show a string on the [LED screen](/device/screen). It will scroll to left if it's bigger than the screen.

```sig
basic.showString("hi!")
```

## Parameters

* `text` is a [String](/types/string). It can contain letters, numbers, and punctuation.
* `interval` is an optional [Number](/types/number). It means the number of milliseconds before sliding the [String](/types/string) left by one LED each time. Bigger intervals make the sliding slower.

## Examples:

To show the word **Hello**:

```blocks
basic.showString("Hello")
```

To show what is stored in a [String](/types/string) variable:

```blocks
let s = "Hi"
basic.showString(s)
```

## Other show functions

Usa [mostrar número](/reference/basic/show-number) para mostrar un número en la [pantalla LED](/device/screen).

## Ver también

[Cadena](/types/string), [mostrar número](/reference/basic/show-number)