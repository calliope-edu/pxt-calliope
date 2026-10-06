# Pin ist gedrückt

Ermittelt, ob der angegebene Pin gedrückt ist oder nicht.

Wenn du den `GND` -Pin mit einer Hand hälst und den Pin `0`, 0>1</code>oder `2` mit der anderen Hand berührst, fließt ein sehr kleiner (sicherer) Strom durch deinen Körper und zurück in den @boardname @. Das nennt man **einen Stromkreis schließen**. Es ist, als wärst du ein großer Draht!

```sig
input.pinIsPressed(TouchPin.P0);
```

## ~hint

Diese Funktion funktioniert am besten, wenn der @boardname @ Batterien für die Stromversorgung anstelle des USB-Kabels verwendet.

## ~

## Parameter

* ein [String](/types/string), der den Namen des Pins enthält (**P0**, **P1** oder **P2**)

## Rückgabe

* ein [boolescher Wert](/blocks/logic/boolean) , der angibt, ob der angegebene Pin gedrückt ist (`wahr` oder `falsch`)

## Pin-Drücken in Aktion

Sieh dir an, wie der @boardname@ einen Druck auf einen Pin oder auf etwas, das mit einem Pin verbunden ist, in diesem Video erkennt:

https://www.youtube.com/watch?v=GEpZrvbsO7o

## Beispiel

Dieses Programm zeigt `1` an, wenn `P0` gedrückt ist, und `0`, wenn `P0` nicht gedrückt wird:

```blocks
basic.forever(() => {
    if (input.pinIsPressed(TouchPin.P0)) {
        basic.showNumber(1)
    } else {
        basic.showNumber(0)
    }
})
```

## Siehe auch

[@boardname@ pins](/device/pins), [on pin pressed](/reference/input/on-pin-pressed), [analog read pin](/reference/pins/analog-read-pin), [analog write pin](/reference/pins/analog-write-pin), [digital read pin](/reference/pins/digital-read-pin), [digital write pin](/reference/pins/digital-write-pin)