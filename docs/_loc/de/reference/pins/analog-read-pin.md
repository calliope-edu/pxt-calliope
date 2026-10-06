# Analoge Werte von Pin

Liest ein **analoges** Signal (`0` bis `1023`) vom angegebenen [Pin](/device/pins).

```sig
pins.analogReadPin(AnalogPin.P0)
```

## Parameter

* **Name**: Es handelt sich hier um eine [Zeichenkette](/types/string) mit dem Namen der Pin, die Du eingeben möchtest (`P0` bis `P4` oder `P10`).

## Rückgabewert

* eine [Zahl](/types/number) von `0` bis `1023`

## Beispiel

Dieses Programm liest Pin `P1` und zeigt die Zahl auf dem LED-Bildschirm an.

```blocks
basic.forever(function() {
    let value = pins.analogReadPin(AnalogPin.P1)
    basic.showNumber(value)
})
```

### ~hint

Wenn du ** analoge Werte von Pin** gleichzeitig mit einem anderen @boardname@, der **schreibe analogen Wert**, verwendest, dann kann es schwierig werden. Denke daran, dass der @boardname@, der **analogen Wert schreiben** verwendet, 0 und 1 mit sehr hoher Frequenz schreibt, um einen Durchschnitt des gewünschten Wertes zu erreichen. Wenn du diesen Durchschnittswert von einem anderen @boardname@ liest, dann liest der @boardname@ entweder 0 oder 1023. Du könntest versuchen, eine höhere Anzahl von Werten (z.B. eine Million) in einer Schleife zu lesen und dann Computer den Durchschnitt berechnen zu lassen. Aternativ kannst du zwischen den beiden @boardname@s einen Kondensator anschließen.

### ~

## Siehe auch

[@boardname@ pins](/device/pins), [on pin pressed](/reference/input/on-pin-pressed), [analog write pin](/reference/pins/analog-write-pin), [digital read pin](/reference/pins/digital-read-pin), [digital write pin](/reference/pins/digital-write-pin)