# digitaler Pin

Erhalte eine digitale Pinnummer für eine Pin-Kennung.

```sig
pins._digitalPin(DigitalPin.P3)
```

## Parameter

- **pin**: eine Pin-Kennung für einen digitalen Pin (`P0` bis `P20`).

## Rückgabewert

- eine Pin [number](/types/number) für die Pin-Kennung.

## Beispiel: Fußball-Torwächter

Dieses Programm liest den Pin P0, um festzustellen, wann ein Tor erzielt wird. Wenn P0 = 1 ist, erhöht das Programm den Punktestand und gibt einen Ton über P2 mit `||pins:digital write pin||` aus. Verwende Pin Variablen
, um die Lese- und Schreib-Pins zu setzen.

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

## Siehe auch

[digitalen Pin lesen](/reference/pins/digital-read-pin),
[digitalen Pin schreiben](/reference/pins/digital-write-pin)