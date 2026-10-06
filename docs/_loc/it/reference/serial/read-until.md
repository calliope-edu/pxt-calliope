# read Until

Legge un testo dalla porta seriale finché trova il delimitatore.

```sig
serial.readUntil(",");
```

## Returns

* a [string](/types/string) containing input from the serial port, such as a response typed by a user

## Esempio

L'esempio seguente legge le stringhe separate dai comandi (`,`).

```blocks
basic.forever(() => {
    let answer = serial.readUntil(",");
    serial.writeLine(answer);
});
```

## Vedi anche

[serial](/device/serial), [write line](/reference/serial/write-line), [write value](/reference/serial/write-value)