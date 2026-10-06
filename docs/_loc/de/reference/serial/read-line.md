# read Line

Liest eine Textzeile aus der seriellen Schnittstelle.

```sig
serial.readLine();
```

### ~hint

Diese Funktion erwartet, dass die gelesene Zeile mit dem Zeichen `\n` beendet wird. Wenn Deine Terminalsoftware keine Zeilen mit `\n` beendet, wird diese Funktion wahrscheinlich niemals einen Wert zurückgeben.

Du kannst das Feld `serial.NEW_LINE_DELIMITER` überschreiben, um Trennzeichen durch einen Zeilenumbruch zu ersetzen.

### ~

## Rückgabewert

* eine [string](/types/string) der Eingaben aus dem seriellen Port enthält, wie eine Antwort, die von einem Benutzer eingegeben wurde

## Beispiel

Das folgende Beispiel fordert den Namen des Benutzers an und wiederholt ihn dann um den Benutzer zu grüßen.

```blocks
basic.forever(() => {
    serial.writeLine("What is your name?")
    let answer = serial.readLine()
    serial.writeString("Hello,")
    serial.writeLine(answer)
})
```

## Siehe auch

[serial](/device/serial), [write line](/reference/serial/write-line), [write value](/reference/serial/write-value)