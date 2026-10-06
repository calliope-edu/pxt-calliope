# analoger Pin

Erhalte eine digitale Pin-Nummer für eine Pin-Kennung.

```sig
pins._analogPin(AnalogPin.P0)
```

## Parameter

- **pin**: eine Pin-Kennung für einen analogen Pin (`P0` bis `P20`).

## Rückgabewert

- eine Pin [number](/types/number) für die Pin-Kennung.

## Beispiel

Lege eine analoge Pin-Variable für `P1` fest, lese Pin `P1` und zeige den Eingabewert auf der LED-Matrix an.

```blocks
let myPin = AnalogPin.P1
basic.forever(function() {
    let value = pins.analogReadPin(myPin)
    basic.showNumber(value)
})
```

## Siehe auch

[analogen Pin lesen](/reference/pins/analog-read-pin),
[analogen Pin schreiben](/reference/pins/analog-write-pin)