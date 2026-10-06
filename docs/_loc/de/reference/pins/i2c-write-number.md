# i2c Write Number

Schreibe eine Zahl an ein Gerät mit einer I2C-Adresse unter Verwendung eines bestimmten Zahlenformats.

```sig
pins.i2cWriteNumber(0, 0, NumberFormat.Int8LE, true);
```

### ~ hint

#### Simulator

Zur Verwendung dieser Funktion brauchst Du echte Hardware, die im Simulator nicht unterstützt wird.

### ~

## Parameter

* **address**: die 7-Bit I2C-Adresse des Geräts, an das **value** gesendet wird.
* **value**: die Zahl, die an **address** gesendet wird.
* **format**: das [Zahlenformat](/types/buffer/number-format) für **value**.
* **repeated**: wenn `true`, sende keine Stopp-Bedingung nach dem Schreiben. Andernfalls wird eine Stopp-Bedingung gesendet, wenn `false` (der Standardwert).

### ~ hint

#### Wiederholter Start

Eine [wiederholte Startbedingung](http://www.i2c-bus.org/repeated-start-condition/) wird gesetzt, um sicherzustellen, dass beim Schreiben mehrerer Zahlen vom Gerät auf einmal dies ohne Unterbrechung geschehen kann. Eine Startbedingung wird gesendet (wenn **repeated** `true` ist) jedes Mal, wenn eine Zahl ohne eine entsprechende Stopp-Bedingung geschrieben wird. Wenn die letzte Zahl geschrieben wird, kann die Stopp-Bedingung gesendet werden, indem **repeated** auf `false` gesetzt wird. Für einzelne Schreibvorgänge, verwende **repeated** nicht oder setze es auf `false`.

#### Reservierte Adressen

Einige Sensoren auf Ihrem @boardname@ verwenden denselben I2C-Bus, der mit den Pins verbunden ist, die Sie programmieren. Das bedeutet, dass Sie darauf achten sollten, **KEINE** Adresse für Ihr Gerät zu verwenden, die mit einer der Adressen übereinstimmt, die von den Sensoren auf der Platine verwendet werden. Überprüfen Sie die Liste der [I2C-Sensoradressen](https://tech.microbit.org/hardware/i2c/), bevor Sie Ihrem Gerät eine zuweisen. Dies wird Ihnen helfen, die Adressen getrennt zu halten.

#### Busadressformat

Der @boardname@ verwendet 7-Bit-Werte, um die Geräte auf dem I2C-Bus zu adressieren. Bevor eine Adresse übertragen wird, wird sie vorübergehend auf einen 8-Bit-Wert angepasst, damit die gültigen Adressbits korrekt gesendet werden. Das bedeutet, dass der Wert einer 8-Bit-Adresse auf dem Bus doppelt so hoch erscheint, wie von Ihnen angegeben. Das ist jedoch in Ordnung, da das adressierte Gerät es so dekodieren wird, dass es mit der von Ihnen angegebenen Adresse übereinstimmt. Wenn die Adresse Ihres Geräts als 8-Bit-Adresse angegeben ist, müssen Sie eine Adresse verwenden, die halb so groß ist, wenn Sie von diesem Gerät lesen oder darauf schreiben.

### ~

## Beispiele

### Schreibe eine Big-Endian-Zahl an ein Gerät

Sende den Wert `2055` an die 7-Bit I2C-Adresse als eine 32-Bit-Zahl. Das Format `32`, Big-Endian und Integer wird gewählt.

```blocks
pins.i2cWriteNumber(32, 2055, NumberFormat.Int32BE, false);
```

### Wiederholte Schreibvorgänge

Sende drei Byte-Werte an ein Gerät mit der Adresse `33`.

```blocks
pins.i2cWriteNumber(33, 19, NumberFormat.Int32BE, true);
pins.i2cWriteNumber(33, 61, NumberFormat.Int32BE, true);
pins.i2cWriteNumber(33, 87, NumberFormat.Int32BE, false);
```

## Siehe auch

[i2c read number](/reference/pins/i2c-read-number)

[Was ist I2C?](http://www.i2c-bus.org/), [Zahlenformat](/types/buffer/number-format)