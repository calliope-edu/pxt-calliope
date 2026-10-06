# i2c Schreibe Puffer

Schreibe Daten aus einem Puffer an ein Gerät unter einer I2C-Adresse.

```sig
pins.i2cWriteBuffer(0, null, false);
```

Ein an die I2C-Pins auf dem @boardname@ angeschlossenes Gerät an der Adresse wird ausgewählt, um Daten darauf zu schreiben. Wenn das Gerät bereit ist, Ihre Daten aufzunehmen, werden einige oder alle Daten in deinem Puffer darauf geschrieben.

### ~ hint

#### Simulator

Diese Funktion benötigt echte Hardware, um damit zu arbeiten. Im Simulator wird diese Funktion nicht unterstützt.

### ~

## Parameter

* **-Adresse**: die 7-bit I2C-Adresse, von der die Daten gelesen werden sollen.
* **buffer**: ein [Puffer](/types/buffer), der die Daten enthält, die auf das Gerät unter der I2C-Adresse geschrieben werden sollen.
* **repeated**: wenn `wahr`, sende keine Stop-Bedingung nach dem Schreiben. Andernfalls wird eine Stop-Bedingung gesendet, wenn `falsch` (die Standardeinstellung).

### ~ hint

#### Wiederholter Start

Eine [wiederholte Startbedingung](http://www.i2c-bus.org/repeated-start-condition/) wird gesetzt, um sicherzustellen, dass wenn du mehrmals hintereinander Daten vom Gerät schreiben möchtest, dies ohne Unterbrechung geschehen kann. Eine Startbedingung wird gesendet (wenn **repeated** `true` ist) jedes Mal, wenn ein Puffer ohne eine entsprechende Stopp-Bedingung geschrieben wird. Wenn der letzte Puffer geschrieben wird, kann die Stopp-Bedingung gesendet werden, indem **repeated** auf `false` gesetzt wird. Für einzelnes Schreiben verwende nicht **wiederholt** oder setze es auf `falsch`.

#### Reservierte Adressen

Einige Sensoren auf Ihrem @boardname@ verwenden denselben I2C-Bus, der mit den Pins verbunden ist, die Sie programmieren. Dies bedeutet, dass du darauf achten solltest, **NICHT** eine Adresse für dein Gerät zu verwenden, die die gleiche ist wie die der Sensoren auf dem Board. Überprüfen Sie die Liste der [I2C-Sensoradressen](https://tech.microbit.org/hardware/i2c/), bevor Sie Ihrem Gerät eine zuweisen. Dies wird Ihnen helfen, die Adressen getrennt zu halten.

#### Busadressformat

Der @boardname@ verwendet 7-Bit-Werte, um die Geräte auf dem I2C-Bus zu adressieren. Bevor eine Adresse übertragen wird, wird sie vorübergehend auf einen 8-Bit-Wert angepasst, damit die gültigen Adressbits korrekt gesendet werden. Das bedeutet, dass der Wert einer 8-Bit-Adresse auf dem Bus doppelt so hoch erscheint, wie von Ihnen angegeben. Das ist jedoch in Ordnung, da das adressierte Gerät es so dekodieren wird, dass es mit der von Ihnen angegebenen Adresse übereinstimmt. Wenn die Adresse Ihres Geräts als 8-Bit-Adresse angegeben ist, müssen Sie eine Adresse verwenden, die halb so groß ist, wenn Sie von diesem Gerät lesen oder darauf schreiben.

### ~

## Beispiel

Sage einem Gerät, das mit der Adresse `141` an die I2C-Pins angeschlossen ist, auf einen _Lesestatus_ Befehl zu antworten. Das Gerät sendet die Statusdaten auf den I2C-Leitungen, wenn es ein Befehlsbyte gleich `0` erhält. `32` Bytes Statusdaten werden in einen Puffer gelesen.

Das dritte Byte wird geändert und der Puffer wird zurückgesendet, damit das Gerät seinen Status aktualisieren kann.

```blocks
const i2cDevice = 141;
pins.i2cWriteNumber(i2cDevice, NumberFormat.UInt8LE, 0)
let i2cBuffer = pins.i2cReadBuffer(i2cDevice, 32, false);
i2cBuffer.setNumber(NumberFormat.UInt8LE, 2, 0)
pins.i2cWriteBuffer(i2cDevice, i2cBuffer, false)
```

## Siehe auch

[i2c read buffer](/reference/pins/i2c-read-buffer), [Puffer](/types/buffer)

[Was ist I2C?](http://www.i2c-bus.org/)