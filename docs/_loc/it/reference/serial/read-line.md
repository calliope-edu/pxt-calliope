# read Line

Legge una riga di testo dalla porta seriale.

```sig
serial.readLine();
```

### ~hint

Questa funzione aspetta che la linea che legge sia terminata con il carattere `\n`. If your terminal software does not terminate lines with `\n`, this function will probably never return a value.

You can override the `serial.NEW_LINE_DELIMITER` field to change the newline delimiter.

### ~

## Returns

* a [string](/types/string) containing input from the serial port, such as a response typed by a user

## Esempio

The following example requests the user's name, then repeats it to greet the user.

```blocks
basic.forever(() => {
    serial.writeLine("What is your name?")
    let answer = serial.readLine()
    serial.writeString("Hello,")
    serial.writeLine(answer)
})
```

## Vedi anche

[serial](/device/serial), [write line](/reference/serial/write-line), [write value](/reference/serial/write-value)