# on Data Received

Legt ein Ereignis fest, das ausgeführt wird, wenn auf der seriellen Schnittstelle eines der Begrenzungszeichen erkannt wird.

```sig
serial.onDataReceived(",", () => {})
```

## Parameter

* `Trennzeichen` ist eine [Zeichenkette](/types/string) mit einem beliebigen Zeichen, das als Trennzeichen verwendet werden soll

## Beispiel

Read values separated by a comma `,`.

```blocks
serial.onDataReceived(serial.delimiters(Delimiters.Comma), function() {
    basic.showString(serial.readUntil(serial.delimiters(Delimiters.Comma)))
})
```

## Siehe auch

[serial](/device/serial), [write line](/reference/serial/write-line), [write value](/reference/serial/write-value)