# wenn gepulsed

Konfiguriere einen Pin als digitalen Eingang und führe dann Code aus, wenn der Pin entweder `high` oder `low` pulsiert.

```sig
pins.onPulsed(DigitalPin.P0, PulseValue.High, () => { });
```

### ~ hint

#### Simulator

Zur Verwendung dieser Funktion brauchst Du echte Hardware, die im Simulator nicht unterstützt wird.

### ~

## Parameter

* **name**: der @boardname@ Hardware-Pin, der als digitaler Eingang konfiguriert werden soll (`P0` bis `P20`).
* **pulse**: der Zustand, der dazu führen wird, dass der Code im Block ausgeführt wird, entweder `high` oder `low`.
* **body**: der Code, der ausgeführt wird, wenn der Pin in **name** auf den in **pulse** festgelegten Zustand pulsiert.

## Beispiel

Konfiguriere den Pin `P2` für den digitalen Eingang. Zeige die Zeichenkette `"LOW"` an, wann immer `P2` `low` pulsiert.

```blocks
pins.onPulsed(DigitalPin.P2, PulseValue.Low, () => {
    basic.showString("LOW");
});
```

## Siehe auch

[servo set pulse](/reference/pins/servo-set-pulse), [pulse duration](/reference/pins/pulse-duration), [digital read pin](/reference/pins/digital-read-pin)