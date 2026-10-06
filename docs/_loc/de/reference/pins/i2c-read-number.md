# I2C lese Zahl

Liest eine Nummer von einer I2C-Adresse mit einem angegebenen Zahlenformat aus.

```sig
pins.i2cReadNumber(0, NumberFormat.Int8LE, false);
```

### ~ hint

#### Simulator

Zur Verwendung dieser Funktion brauchst Du echte Hardware, die im Simulator nicht unterstützt wird.

### ~

## Parameter

* **-Adresse**: die 7-bit I2C-Adresse des Geräts, von dem du eine Nummer lesen möchtest.
* **-Format**: das [Zahlenformat](/types/buffer/number-format) des zu lesenden Zahlenwerts.
* **wiederhole**:Wenn `wahr`, keine Stop-Bedingung nach dem Lesen senden. Andernfalls wird eine Stop-Bedingung gesendet, wenn `falsch` (die Standardeinstellung).

### ~ hint

#### Wiederholter Start

Eine [wiederholte Startbedingung](http://www.i2c-bus.org/repeated-start-condition/) ist gesetzt, um sicherzustellen, dass wenn Sie Daten Miltiple-Zeiten vom Gerät auf einmal lesen möchten, es kann ohne Unterbrechung geschehen. Ein Startkonditon wird gesendet (wenn **wiederholt** `wahr`) jedes Mal, wenn ein Buffer ohne passende Stop-Bedingung gelesen wird. Wenn der letzte Buffer gelesen wird, kann der Stop-Konditon durch die Einstellung **wiederholt** auf `falsch` gesendet werden. Für einzelnes Einlesen verwende nicht **wiederholt** oder setzen es auf `falsch`.

#### Reservierte Adressen

Einige Sensoren auf deinem @boardname@ verwenden den gleichen I2C-Bus, der mit den Pins verbunden ist, die du programmierst. Dies bedeutet, dass du darauf achten solltest, **NICHT** eine Adresse für dDein Gerät zu verwenden, die die gleiche ist wie die der Sensoren auf dem Board. Überprüfe die [I2C Sensoradressen](https://tech.microbit.org/hardware/i2c/) Liste, bevor du deinem Gerät eine zuweist. Dies wird dir helfen, die Adressen getrennt zu halten.

#### Bus-Adressformat

Die @boardname@ verwendet 7-bit Werte, um die Geräte zu adressieren, die mit dem I2C-Bus verbunden sind. Bevor eine Adresse übertragen wird, wird sie vorübergehend an einen 8-Bit-Wert angepasst, so dass die gültigen Adressbits korrekt gesendet werden. Das bedeutet, dass der Wert einer 8-Bit-Adresse, die im Bus vorhanden ist, doppelt so hoch erscheint wie der von dir angegebene Wert. Das ist jedoch in Ordnung, da das Gerät, das du adressiert, es entsprechend der von dir angegebenen Adresse dekodiert. Wenn die Geräteadresse als 8-Bit-Adresse angegeben ist müsst du eine Adresse verwenden, die halb so groß ist, wenn du darauf liest oder daraus schreibst.

### ~

## Rückgabewert

* eine Nummer vom Gerät mit dem [NumberFormat](/types/buffer/number-format) welche du abgefragt hast.

## Beispiele

### Lese eine "big-Endian" Nummer von einem Gerät aus

Das folgende Beispiel liest eine Zahl im Format big-endian, 16-bit, unsigned integer von der 7-Bit I2C-Adresse `32`.

Liest eine Nummer aus dem Gerät an einer 7-Bit-I2C-Adresse als 16-Bit-Nummer. Die `16`, big-Endian und Integer für das Format ausgewählt.

```blocks
let inValue = pins.i2cReadNumber(32, NumberFormat.UInt16BE, false);
```

### Wiederholtes einlesen

Lese drei Bytes von einem Gerät unter Adresse `33` gleichzeitig.

```blocks
nums[0] = pins.i2cReadNumber(33, NumberFormat.UInt8LE, true)
nums[1] = pins.i2cReadNumber(33, NumberFormat.UInt8LE, true)
nums[2] = pins.i2cReadNumber(33, NumberFormat.UInt8LE, false)
```

## Siehe auch

[I2C schreibe Zahl](/reference/pins/i2c-write-number)

[Was ist I2C?](http://www.i2c-bus.org/), [Zahlenformat](/types/buffer/number-format)