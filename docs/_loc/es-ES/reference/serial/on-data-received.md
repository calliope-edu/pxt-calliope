# on Data Received

Registra la activación de un evento cuando se empareja uno de los delimitadores.

```sig
serial.onDataReceived(",", () => {})
```

## Parameters

* `delimiters` is a [string](/types/string) containing any of the character to match

## Ejemplo

Lee los valores separados por una coma `,`.

```blocks
serial.onDataReceived(serial.delimiters(Delimiters.Comma), function() {
    basic.showString(serial.readUntil(serial.delimiters(Delimiters.Comma)))
})
```

## Ver también

[serial](/device/serial), [write line](/reference/serial/write-line), [write value](/reference/serial/write-value)