# write String

Schreibe einen String in den [serial](/device/serial) Port, ohne danach eine neue Zeile zu starten.

```sig
serial.writeString("");
```

### ~ reminder

#### Simulator data log

When a string is written to the serial port, it's sent immediately over the serial connection. However, when you code with `||serial:write string||` in the Editor, the simulator's data log may not display the output data right away. The characters that represent the string may get queued in the data log buffer and won't display until:

* a 'newline' line character is received (`\n`)

-- or --

* log data buffer limit is reached (currently set at `255` characters).

If you want to see the string displayed immediately, use a `||serial:write line||` with an empty string right after the `||serial:write string||`.

### ~

## Parameter

* `Text` ist die</a> Zeichenfolge</1>, die auf den seriellen Port geschrieben werden soll

## Beispiel: einfach seriell

Dieses Programm schreibt das Wort `CALLIOPE` wiederholt auf den seriellen Port, ohne Zeilenumbruch.

```blocks
basic.forever(() => {
    serial.writeString("CALLIOPE");
    basic.pause(1000);
});
```

## Siehe auch

[serial](/device/serial), [write line](/reference/serial/write-line), [write number](/reference/serial/write-number), [write value](/reference/serial/write-value)