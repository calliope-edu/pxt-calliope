# write String

Write a string to the [serial](/device/serial) port, without starting a new line afterward.

```sig
serial.writeString("");
```

### ~ reminder

#### Registro de datos del simulador

Cuando se escribe una cadena en el puerto serie, se envía inmediatamente a través de la conexión serie. Sin embargo, cuando se programa con `||serial:write string||` en el Editor, es posible que el registro de datos del simulador no muestre los datos de salida de inmediato. Los caracteres que representan la cadena pueden quedar en cola en el búfer del registro de datos y no se mostrarán hasta que:

* se ha recibido un carácter de línea «nueva línea» (`\n`)

-- o --

* se ha alcanzado el límite del búfer de datos de registro (actualmente establecido en `255` caracteres).

Si quieres ver la cadena mostrada de inmediato, usa una línea `||serial:write line||` con una cadena vacía justo después de `||serial:write string||`.

### ~

## Parameters

* `text` is the [string](/types/string) to write to the serial port

## Example: simple serial

This program writes the word `JUMBO` to the serial port repeatedly, without any new lines.

```blocks
basic.forever(() => {
    serial.writeString("JUMBO");
    basic.pause(1000);
});
```

## Ver también

[serial](/device/serial), [write line](/reference/serial/write-line), [write number](/reference/serial/write-number), [write value](/reference/serial/write-value)