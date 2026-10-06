# write Number

Schreiben Sie eine Nummer an den [seriellen](/device/serial) Anschluss.

```sig
serial.writeNumber(0);
```

A number value is written to the serial port as characters in a string representation. The number `876`, for example:

```block
serial.writeNumber(876)
```

The receiving serial port will see this number as the 3 characters:

    876
    

## Parameter

* `Value` ist die [Zahl](/types/number), die auf den seriellen Port geschrieben werden soll

### ~ reminder

#### Simulator data log

When a number is written to the serial port, it's sent immediately over the serial connection. However, when you code with `||serial:write number||` in the Editor, the simulator's data log may not display the output data right away. The characters that represent the number may get queued in the data log buffer and won't display until:

* a 'newline' line character is received (`\n`)

-- or --

* log data buffer limit is reached (currently set at `255` characters).

If you want to see the string displayed immediately, use a `||serial:write line||` with an empty string right after the `||serial:write number||`.

### ~

## Beispiele

### One, Two, Three

This program repeatedly writes a 3-digit number as a line to the serial port.

```blocks
basic.forever(function() {
    serial.writeNumber(123)
    serial.writeLine("")
    basic.pause(5000)
});
```

### Plot bar graph does serial

Wenn du die `led.plotBarGraph` Funktion verwendest, stellt sie auch die Zahlenwerte dar, die über die serielle Schnittstelle empfangen werden.

```blocks
basic.forever(() => {
    led.plotBarGraph(input.lightLevel(), 255)
    basic.pause(10000);
})
```

## Siehe auch

[serial](/device/serial), [write line](/reference/serial/write-line), [write value](/reference/serial/write-value), [write numbers](/reference/serial/write-numbers)