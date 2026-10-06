# i2c Write Buffer

Write data from buffer to a device at an I2C address.

```sig
pins.i2cWriteBuffer(0, null, false);
```

A device connected to the I2C pins on the @boardname@ at the address is selected to write data to. If the device is ready to take in your data, some or all of the data in your buffer is written to it.

### ~ hint

#### Simulatore

This function needs real hardware to work with. It's not supported in the simulator.

### ~

## Parametri

* **address**: the 7-bit I2C address to read the data from.
* **buffer**: a [buffer](/types/buffer) that contains the data to write to the device at the I2C address.
* **repeated**: if `true`, don't send a stop condition after the write. Otherwise, a stop condition is sent when `false` (the default).

### ~ hint

#### Avvio ripetuto

A [repeated start condition](http://www.i2c-bus.org/repeated-start-condition/) is set to help make sure that when you want to write data miltiple times from the device at once, it can happen without interruption. A start conditon is sent (if **repeated** is `true`) each time a buffer is written without a matching stop condition. When the last buffer is written, the stop conditon can be sent by setting **repeated** to `false`. For single writes, don't use **repeated** or set it to `false`.

#### Indirizzi riservati

Alcuni sensori sul tuo @boardname@ utilizzano lo stesso bus I2C collegato ai pin programmati. This means that you should be careful to **NOT** use an address for your device that is the same as the any of the ones used by the sensors on the board. Controlla l'elenco [Indirizzi sensore I2C](https://tech.microbit.org/hardware/i2c/) prima di assegnarne uno al dispositivo. Questo ti aiuterà a mantenere gli indirizzi separati.

#### Formato dell'indirizzo del bus

Il @Boardname@ utilizza valori a 7 bit per indirizzare i dispositivi collegati sul bus I2C. Prima che un indirizzo venga trasmesso, viene temporaneamente regolato su un valore di 8 bit in modo che i bit di indirizzo validi vengano inviati correttamente. Ciò significa che il valore di un indirizzo a 8 bit presente sul bus apparirà il doppio di quello specificato. Questo va bene però, dato che il dispositivo che stai indirizzando lo decodificherà in modo che corrisponda all'indirizzo che hai dato. Se l'indirizzo del dispositivo è specificato come indirizzo a 8 bit, sarà necessario utilizzare un indirizzo con metà del valore quando si legge o si scrive da esso.

### ~

## Esempio

Tell a device connected to the I2C pins with the address of `141` to respond to a _read status_ command. Il dispositivo invia i dati di stato sui cavi I2C se riceve un byte di comando uguale a `0`. `32` byte di dati sullo stato vengono letti in un buffer.

Il terzo byte viene modificato e il buffer viene inviato per fare in modo che il dispositivo aggiorni il suo stato.

```blocks
const i2cDevice = 141;
pins.i2cWriteNumber(i2cDevice, NumberFormat.UInt8LE, 0)
let i2cBuffer = pins.i2cReadBuffer(i2cDevice, 32, false);
i2cBuffer.setNumber(NumberFormat.UInt8LE, 2, 0)
pins.i2cWriteBuffer(i2cDevice, i2cBuffer, false)
```

## Vedi anche

[buffer di lettura i2c](/reference/pins/i2c-read-buffer), [buffer](/types/buffer)

[Cos'è I2C?](http://www.i2c-bus.org/)