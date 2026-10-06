# write Number

Write a number to the [serial](/device/serial) port.

```sig
serial.writeNumber(0);
```

Se escribe un valor numérico en el puerto serie como caracteres en una representación de cadena. El número `876`, por ejemplo:

```block
serial.writeNumber(876)
```

El puerto serie receptor verá este número como los 3 caracteres:

    876
    

## Parameters

* `value` is the [number](/types/number) to write to the serial port

### ~ reminder

#### Registro de datos del simulador

Cuando se escribe un número en el puerto serie, se envía inmediatamente a través de la conexión serie. Sin embargo, cuando se programa con `||serial:write number||` en el Editor, es posible que el registro de datos del simulador no muestre los datos de salida de inmediato. Los caracteres que representan el número pueden quedar en cola en el búfer del registro de datos y no se mostrarán hasta que:

* se ha recibido un carácter de línea «nueva línea» (`\n`)

-- o --

* se ha alcanzado el límite del búfer de datos de registro (actualmente establecido en `255` caracteres).

Si quieres ver la cadena mostrada de inmediato, usa una línea `||serial:write line||` con una cadena vacía justo después de `||serial:write number||`.

### ~

## Ejemplos

### Uno, Dos, Tres

Este programa escribe repetidamente un número de 3 dígitos como una línea en el puerto serie.

```blocks
basic.forever(function() {
    serial.writeNumber(123)
    serial.writeLine("")
    basic.pause(5000)
});
```

### Traza gráfico de barras en serie

If you use the `led.plotBarGraph` function, it writes the number being plotted to the serial port too.

```blocks
basic.forever(() => {
    led.plotBarGraph(input.lightLevel(), 255)
    basic.pause(10000);
})
```

## Ver también

[serial](/device/serial), [write line](/reference/serial/write-line), [write value](/reference/serial/write-value), [write numbers](/reference/serial/write-numbers)