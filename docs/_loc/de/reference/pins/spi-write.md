# spi Write

Schreibt einen Datenwert auf das SPI-Slave-Gerät und gibt dessen Antwort zurück.

```sig
pins.spiWrite(0);
```

Datenwerte werden auf ein SPI-Slave-Gerät geschrieben, das über die [SPI-Pins](/reference/pins/spi-pins) mit dem @boardname@ verbunden ist. Der Datenwert kann entweder ein Befehl des angeschlossenen Gerätes oder ein Wert für dessen Verwendung sein. Wenn der Schreibvorgang dazu führt, dass das angeschlossene Gerät einen Wert an @boardname@ zurücksendet, wird dies der Rückgabewert für die Funktion **spiWrite** sein.

### ~ hint

#### Simulator

Zur Verwendung dieser Funktion brauchst Du echte Hardware, die im Simulator nicht unterstützt wird.

### ~

## Parameter

* `Wert`: Ein [Ziffernwert](/types/number), der Datenwerte repräsentiert, die an das SPI-Slave-Gerät gesendet werden sollen.

## Rückgabewert

* Es handelt sich um einen[Ziffern](/types/number)wert, der die Antwort des SPI-Peripheriegerätes darstellt.

## Beispiel

Sende den Befehl, um den Wert des *WHOAMI*-Registers von dem an den SPI-Bus angeschlossenen Gerät herauszulesen. The chip select line is connected to pin **0** and the SPI signals use pins **P13**, **P14**, and **P15**.

```blocks
pins.digitalWritePin(DigitalPin.P0, 1);
pins.spiPins(DigitalPin.C15, DigitalPin.C14, DigitalPin.C13);
pins.spiFormat(8, 3);
pins.spiFrequency(1000000);
pins.digitalWritePin(DigitalPin.P0, 0);
let command = pins.spiWrite(143);
let whoami = pins.spiWrite(0);
pins.digitalWritePin(DigitalPin.P0, 1);
basic.showNumber(whoami);
serial.writeLine("WHOAMI register value: " + whoami)
```

## Siehe auch

[SPI-Pins](/reference/pins/spi-pins), [SPI-Taktfrequenzen](/reference/pins/spi-frequency), [SPI-Format](/reference/pins/spi-format)

[SPI Programming](https://developer.mbed.org/handbook/SPI)