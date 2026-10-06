# read String

Read the buffered serial data as a string.

```sig
serial.readString();
```

## Devuelve

* a [string](/types/string) containing input from the serial port. The string is empty if no data is available.

## Ejemplo

The following program scrolls text on the screen as it arrives from serial.

```blocks
basic.forever(() => {
    basic.showString(serial.readString());
});
```

## Ver también

[serial](/device/serial), [write line](/reference/serial/write-line), [write value](/reference/serial/write-value)