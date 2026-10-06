# Impulsdauer

Dauer des letzten Impulses in Mikrosekunden abrufen.

```sig
pins.pulseDuration();
```

Ein Impuls an einem Pin wird im Ereignis [onPulsed](/reference/pins/on-pulsed) erkannt. Sie verwenden **pulseDuration** innerhalb dieses Ereignisses, um die Dauer des Impulses zu ermitteln, der das Ereignis ausgelöst hat.

### ~ hint

#### Simulator

Zur Verwendung dieser Funktion brauchst Du echte Hardware, die im Simulator nicht unterstützt wird.

### ~

## Rückgabewert

* eine [Zahl](/types/number), die die Dauer des letzten Impulses in Mikrosekunden angibt.

## Beispiel

Warten Sie, bis der Pin `P0` einen hohen Impuls erhält. Zeigen Sie die Dauer des Impulses in Mikrosekunden auf dem LED-Bildschirm an.

```blocks
pins.onPulsed(DigitalPin.P0, PulseValue.High, () => {
    basic.showNumber(pins.pulseDuration());
});
```

## Siehe auch

[servo set pulse](/reference/pins/servo-set-pulse), [on pulsed](/reference/pins/on-pulsed), [digital read pin](/reference/pins/digital-read-pin)