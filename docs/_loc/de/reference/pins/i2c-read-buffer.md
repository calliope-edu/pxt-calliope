# I2C lese Buffer

Lese die Daten von einem Gerät aus an einer I2C-Adresse.

```sig
pins.i2cReadBuffer(0, 0, false);
```

Ein Gerät, das mit den I2C-Pins auf der @boardname@ an der Adresse verbunden ist, wird zum Lesen der Daten ausgewählt. Wenn es Daten zur Übertragung zur Verfügung hat, werden die Daten empfangen und in einen Puffer kopiert, der für das Programm verwendet werden kann. Ihr Programm sagt, wie groß (wie viele Bytes erhalten werden) der Puffer sein soll. Du wirst nicht so viele Bytes an Daten zurückerhalten, wenn das angeschlossene Gerät weniger zu senden hat als das, was du verlangt hast.

### ~ hint

#### Simulator

Diese Funktion benötigt echte Hardware, um damit zu arbeiten. Im Simulator wird diese Funktion nicht unterstützt.

### ~

## Parameter

* **-Adresse**: die 7-bit I2C-Adresse, von der die Daten gelesen werden sollen.
* **Größe**: die [Zahl](/types/number) von Bytes, die vom Gerät in den Puffer eingelesen werden sollen.
* **wiederhole**: wenn `wahr`, sende keine Stop-Bedingung nach dem Lesen senden. Andernfalls wird eine Stop-Bedingung gesendet, wenn `falsch` (die Standardeinstellung).

### ~ hint

#### Wiederholter Start

Eine [wiederholte Startbedingung](http://www.i2c-bus.org/repeated-start-condition/) ist gesetzt, um sicherzustellen, dass wenn Sie Daten Miltiple-Zeiten vom Gerät auf einmal lesen möchten, es kann ohne Unterbrechung geschehen. Ein Startkonditon wird gesendet (wenn **wiederholt** `wahr`) jedes Mal, wenn ein Puffer ohne passende Stop-Bedingung gelesen wird. Wenn der letzte Puffer gelesen wird, kann der Stop-Konditon durch die Einstellung **wiederholt** auf `falsch` gesendet werden. Für einzelne Lesungen verwenden Sie nicht **wiederholt** oder setzen Sie es auf `falsch`.

#### Reservierte Adressen

Einige Sensoren auf deinem @boardname@ verwenden den gleichen I2C-Bus, der mit den Pins verbunden ist, die du programmierst. Dies bedeutet, dass du darauf achten solltest, **NICHT** eine Adresse für dein Gerät zu verwenden, die die gleiche ist wie die der Sensoren auf dem Board. Überprüfe die [I2C Sensoradressen](https://tech.microbit.org/hardware/i2c/) Liste, bevor du deinem Gerät eine zuweist. Dies wird dir helfen, die Adressen getrennt zu halten.

#### Bus-Adressformat

Die @boardname@ verwendet 7-bit Werte, um die Geräte zu adressieren, die mit dem I2C-Bus verbunden sind. Bevor eine Adresse übertragen wird, wird sie vorübergehend an einen 8-Bit-Wert angepasst, so dass die gültigen Adressbits korrekt gesendet werden. Das bedeutet, dass der Wert einer 8-Bit-Adresse, die im Bus vorhanden ist, doppelt so hoch erscheint wie der von Ihnen angegebene Wert. Das ist jedoch in Ordnung, da das Gerät, das du adressiert, es entsprechend der von dir angegebenen Adresse dekodiert. Wenn die Geräteadresse als 8-Bit-Adresse angegeben ist müsst du eine Adresse verwenden, die halb so groß ist, wenn du darauf liest oder daraus schreibs.

### ~

## Rückgabewert

* ein [Buffer](/types/buffer), der die vom Gerät an der I2C-Adresse gelesenen Daten enthält. Die Anzahl der zurückgegebenen Bytes ist kleiner oder gleich dem von dir angeforderten Betrag im Parameter **Größe**.

## Beispiel

Sage einem Gerät, das mit der Adresse `141` an die I2C-Pins angeschlossen ist, auf einen _Lesestatus_ Befehl zu antworten. Das Gerät sendet die Statusdaten auf den I2C-Drähten, wenn es ein Befehlsbyte in Höhe von `0` erhält. `32` Bytes von Statusdaten werden in einen Buffer eingelesen.

```blocks
const i2cDevice = 141;
pins.i2cWriteNumber(i2cDevice, NumberFormat.UInt8LE, 0)
let i2cBuffer = pins.i2cReadBuffer(i2cDevice, 32, false);
```

## Siehe auch

[i2c write buffer](/reference/pins/i2c-write-buffer), [Puffer](/types/buffer)

[Was ist I2C?](http://www.i2c-bus.org/)