# read Until

Read a text from the serial port until a delimiter is found.

```sig
serial.readUntil(",");
```

## Valeur retournée

* a [string](/types/string) containing input from the serial port, such as a response typed by a user

## Exemple

The following example reads strings separated by commands (`,`).

```blocks
basic.forever(() => {
    let answer = serial.readUntil(",");
    serial.writeLine(answer);
});
```

## Voir Aussi

[serial](/device/serial), [write line](/reference/serial/write-line), [write value](/reference/serial/write-value)