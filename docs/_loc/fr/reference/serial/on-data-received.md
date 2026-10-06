# Sur la base de Données Reçues

Enregistre un événement à déclencher quand un des délimiteurs correspond.

```sig
serial.onDataReceived(",", () => {})
```

## Paramètres

* `delimiters` is a [string](/types/string) containing any of the character to match

## Exemple

Read values separated by a comma `,`.

```blocks
serial.onDataReceived(serial.delimiters(Delimiters.Comma), function() {
    basic.showString(serial.readUntil(serial.delimiters(Delimiters.Comma)))
})
```

## Voir Aussi

[serial](/device/serial), [write line](/reference/serial/write-line), [write value](/reference/serial/write-value)