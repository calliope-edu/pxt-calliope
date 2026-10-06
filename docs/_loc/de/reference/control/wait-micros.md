# Warte Mikrosekunden

Blockiert das Programm für die Dauer der angegebenen Mikrosekunden.

```sig
control.waitMicros(4)
```

## Beispiel

Dieses Programm erzeugt einen 10 Mikrosekunden langen High-Impuls am Pin `P0`.

```blocks
// sicherstellen, dass der Pin auf 0 (low) steht, um einen sauberen Impuls zu erzeugen
pins.digitalWritePin(DigitalPin.P0, 0)
control.waitMicros(2)
// Pin auf 1 (high) setzen und 10 Mikrosekunden warten
pins.digitalWritePin(DigitalPin.P0, 1)
control.waitMicros(10)
// Impuls abschließen
pins.digitalWritePin(DigitalPin.P0, 0)
```

### ~hint

Im Simulator wird diese Funktion nicht unterstützt.

### ~

## Siehe auch

[pausieren](/reference/basic/pause)