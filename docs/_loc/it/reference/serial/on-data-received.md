# alla Ricezione dei Dati

Registra un evento da scatenare quando uno dei delimitatori viene raggiunto.

```sig
serial.onDataReceived(",", () => {})
```

## Parametri

* `delimiters` is a [string](/types/string) containing any of the character to match

## Esempio

Read values separated by a comma `,`.

```blocks
serial.onDataReceived(serial.delimiters(Delimiters.Comma), function() {
    basic.showString(serial.readUntil(serial.delimiters(Delimiters.Comma)))
})
```

## Vedi anche

[serial](/device/serial), [write line](/reference/serial/write-line), [write value](/reference/serial/write-value)