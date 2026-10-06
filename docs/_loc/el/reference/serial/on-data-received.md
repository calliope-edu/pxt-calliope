# on Data Received

Καταχωρεί μία εκδήλωση που πυροδοτείται όταν πληρούται ένας οριοθέτης.

```sig
serial.onDataReceived(",", () => {})
```

## Parameters

* `delimiters` is a [string](/types/string) containing any of the character to match

## Example

Read values separated by a comma `,`.

```blocks
serial.onDataReceived(serial.delimiters(Delimiters.Comma), function() {
    basic.showString(serial.readUntil(serial.delimiters(Delimiters.Comma)))
})
```

## See also

[serial](/device/serial), [write line](/reference/serial/write-line), [write value](/reference/serial/write-value)