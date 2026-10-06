# Lies digitalen Wert

Lese ein **digitales** (`0` oder `1`) Signal von einem [Pin](/device/pins) auf dem @boardname@ Board.

```sig
pins.digitalReadPin(DigitalPin.P3)
```

## ~avatar

Einige Pins werden auch von der [LED-Matrix](/device/screen) verwendet. Bitte lies die [Seite über Pins](/device/pins) sorgfältig durch.

## ~

## Parameter

* `name`: eine [Zeichenfolge](/types/string), die den Namen des Pins angibt (`P0`, `P1` oder `P2` bis zu `C20`)

## Rückgabewert

* eine [Zahl](/types/number) die `0` oder `1` sein kann

## Beispiel: Fußball-Punktezähler

Dieses Programm liest Pin `P0` um herauszufinden, wann ein Tor erzielt wurde. Wenn `P0` `1` ist, vergrößert das Programm die Partitur und spielt einen Ton über `P2` mit `schreibe digitalen Wert`.

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

Dieses Programm ist eine Fernbedienung für das Punktezählerprogramm. Wenn du mit `P1` am Fernbedienungs @boardname@ mit `P0` des Punktezähler @boardname@ verbindest, kannst du `B` auf der Fernbedienung drücken und die Punktzahl auf dem anderen @boardname@ erhöhen.

```blocks
input.onButtonEvent(Button.B, input.buttonEventClick(), () => {
    pins.digitalWritePin(DigitalPin.P1, 1);
    basic.pause(500);
    pins.digitalWritePin(DigitalPin.P1, 0);
});
```

### ~hint

Denke daran, `GND` auf beiden @boardname@s miteinander zu verbinden!

### ~

## Siehe auch

[@boardname@ pins](/device/pins), [digital write pin](/reference/pins/digital-write-pin), [analog read pin](/reference/pins/analog-read-pin), [analog write pin](/reference/pins/analog-write-pin), [on pin pressed](/reference/input/on-pin-pressed), [pin is pressed](/reference/input/pin-is-pressed)