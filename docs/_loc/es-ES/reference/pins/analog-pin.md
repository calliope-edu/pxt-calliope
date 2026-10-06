# Pin analógico

Obtiene un número de pin analógico para un identificador de pin.

```sig
pins._analogPin(AnalogPin.P0)
```

## Parámetros

- **pin**: un identificador de pin para un pin analógico (de `P0` a `P20`).

## Devuelve

- un pin [número](/types/number) para el identificador del pin.

## Ejemplo

Configura una variable de pin analógico para `P1`, lee el pin `P1`, y muestra el valor de entrada en la pantalla LED.

```blocks
let myPin = AnalogPin.P1
basic.forever(function() {
    let value = pins.analogReadPin(myPin)
    basic.showNumber(value)
})
```

## Ver también

[analog read pin](/reference/pins/analog-read-pin),
[analog write pin](/reference/pins/analog-write-pin)