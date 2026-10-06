# Schreibe digitalen Wert von Pin

Schreibt ein **digitales** (`0` oder `1`) Signal auf einen [Pin](/device/pins) auf dem @boardname@ Board.

```sig
pins.digitalWritePin(DigitalPin.P1, 1)
```

## ~avatar

Einige Pins werden auch von der [LED-Matrix](/device/screen) verwendet. Bitte lies die [Seite über Pins](/device/pins) sorgfältig durch.

## ~

## Parameter

* `name`: eine [Zeichenfolge](/types/string), die den Namen des Pins angibt (`P0`, `P1` oder `P2` bis zu `P20`)
* `Wert`: eine [Zahl](/types/number) die entweder `0` oder `1` sein kann

## Beispiel: Fußball-Punktezähler

Dieses Programm liest Pin `P0` um herauszufinden, wann ein Tor erzielt wurde. Wenn `P0` `1` ist, vergrößert das Programm den Punktestand und spielt einen Ton über `P2` mit `schreibe digitalen Wert`.

```blocks
let score = 0
basic.showNumber(score)
basic.forever(() => {
    if (pins.digitalReadPin(DigitalPin.P0) == 1) {
        score++;
        pins.digitalWritePin(DigitalPin.P2, 1)
        basic.showNumber(score)
        basic.pause(1000)
        pins.digitalWritePin(DigitalPin.P2, 0)
    }
})
```

Dieses Programm ist eine Fernbedienung für das Punktezählerprogramm. Wenn du mit `P1` am Fernbedienungs @boardname@ mit `P0` des Punktezähler @boardname@ verbindest, kannst du `B` auf der Fernbedienung drücken und die Punktzahl auf dem anderen @boardname@ erhöhen. Dieses Programm verwendet `digital write pin` um einen Ton am anderen @boardname@ zu erzeugen und die Punktzahl zu vergrößern.

```blocks
input.onButtonEvent(Button.B, input.buttonEventClick(), () => {
    pins.digitalWritePin(DigitalPin.P1, 1);
    basic.pause(500);
    pins.digitalWritePin(DigitalPin.P1, 0);
});
```

## Siehe auch

[@boardname@ pins](/device/pins), [digital read pin](/reference/pins/digital-read-pin), [analog read pin](/reference/pins/analog-read-pin), [analog write pin](/reference/pins/analog-write-pin), [on pin pressed](/reference/input/on-pin-pressed)