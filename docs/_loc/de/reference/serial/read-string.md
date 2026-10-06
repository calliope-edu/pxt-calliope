# read String

Auslesen von Daten einer seriellen Schnittstelle, die als String zwischengepuffert werden.

```sig
serial.readString();
```

## Rückgabewert

* ein [string](/types/string), der vom seriellen Port Daten empfängt. Wenn keine Daten vorhanden sind, wird der String leer angezeigt.

## Beispiel

Das folgende Programm scrollt Text auf dem Bildschirm, wie er von der seriellen Schnittstelle kommt.

```blocks
basic.forever(() => {
    basic.showString(serial.readString());
});
```

## Siehe auch

[serial](/device/serial), [write line](/reference/serial/write-line), [write value](/reference/serial/write-value)