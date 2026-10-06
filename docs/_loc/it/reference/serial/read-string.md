# read String

Legge come una stringa i dati ricevuti sul buffer seriale.

```sig
serial.readString();
```

## Returns

* a [string](/types/string) containing input from the serial port. The string is empty if no data is available.

## Esempio

The following program scrolls text on the screen as it arrives from serial.

```blocks
basic.forever(() => {
    basic.showString(serial.readString());
});
```

## Vedi anche

[serial](/device/serial), [write line](/reference/serial/write-line), [write value](/reference/serial/write-value)