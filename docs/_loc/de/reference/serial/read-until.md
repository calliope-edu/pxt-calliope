# read Until

Liest eine Textdatei von der seriellen Schnittstelle aus, bis ein Trennzeichen gefunden wird.

```sig
serial.readUntil(",");
```

## Rückgabewert

* eine [string](/types/string) der Eingaben aus dem seriellen Port enthält, wie eine Antwort, die von einem Benutzer eingegeben wurde

## Beispiel

Das folgende Beispiel ermöglicht Dir Zeichenfolgen, die durch (`,`) getrennt sind, auszulesen.

```blocks
basic.forever(() => {
    let answer = serial.readUntil(",");
    serial.writeLine(answer);
});
```

## Siehe auch

[serial](/device/serial), [write line](/reference/serial/write-line), [write value](/reference/serial/write-value)