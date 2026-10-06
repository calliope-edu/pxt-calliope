# Pin digital

Obtiene un número de pin digital para un identificador de pin.

```sig
pins._digitalPin(DigitalPin.P3)
```

## Parámetros

- **pin**: un identificador de pin para un pin digital (de `P0` a `P20`).

## Devuelve

- un pin [número](/types/number) para el identificador del pin.

## Ejemplo: marcador de fútbol

Este programa lee el pin `P0` para saber cuándo se marca un gol. Cuando `P0`
cambia a `1`, el programa aumenta la puntuación y reproduce un sonido a través de `P2` con `|pins:digital write pin||`. Utiliza variables pin
para configurar los números de pin de lectura y escritura.

```blocks
let score = 0
let readPin = DigitalPin.P0
let writePin = DigitalPin.P2
basic.showNumber(score)
basic.forever(() => {
    if (pins.digitalReadPin(readPin) == 1) {
        score++;
        pins.digitalWritePin(writePin, 1)
        basic.showNumber(score)
        basic.pause(1000)
        pins.digitalWritePin(writePin, 0)
    }
})
```

## Ver también

[lee pin digital](/reference/pins/digital-read-pin),
[escribe pin digital](/reference/pins/digital-write-pin)