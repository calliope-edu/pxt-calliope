# i2c Read Buffer

Read data into a buffer from a device at an I2C address.

```sig
pins.i2cReadBuffer(0, 0, false);
```

A device connected to the I2C pins on the @boardname@ at the address is selected to read data from. If it has data available to transfer, the data is received and copied into a buffer for your program to use. Your program says how big (how many bytes to receive) the buffer should be. You won't get back that many bytes of data if the connected device has less to send than what you asked for.

### ~ hint

#### Simulatore

This function needs real hardware to work with. It's not supported in the simulator.

### ~

## Parametri

* **address**: the 7-bit I2C address to read the data from.
* **size**: the [number](/types/number) of bytes to read into the buffer from the device.
* **repeated**: if `true`, don't send a stop condition after the read. Otherwise, a stop condition is sent when `false` (the default).

### ~ hint

#### Avvio ripetuto

A [repeated start condition](http://www.i2c-bus.org/repeated-start-condition/) is set to help make sure that when you want to read data miltiple times from the device at once, it can happen without interruption. A start conditon is sent (if **repeated** is `true`) each time a buffer is read without a matching stop condition. When the last buffer is read, the stop conditon can be sent by setting **repeated** to `false`. For single reads, don't use **repeated** or set it to `false`.

#### Indirizzi riservati

Alcuni sensori sul tuo @boardname@ utilizzano lo stesso bus I2C collegato ai pin programmati. This means that you should be careful to **NOT** use an address for your device that is the same as the any of the ones used by the sensors on the board. Controlla l'elenco [Indirizzi sensore I2C](https://tech.microbit.org/hardware/i2c/) prima di assegnarne uno al dispositivo. Questo ti aiuterà a mantenere gli indirizzi separati.

#### Formato dell'indirizzo del bus

Il @Boardname@ utilizza valori a 7 bit per indirizzare i dispositivi collegati sul bus I2C. Prima che un indirizzo venga trasmesso, viene temporaneamente regolato su un valore di 8 bit in modo che i bit di indirizzo validi vengano inviati correttamente. Ciò significa che il valore di un indirizzo a 8 bit presente sul bus apparirà il doppio di quello specificato. Questo va bene però, dato che il dispositivo che stai indirizzando lo decodificherà in modo che corrisponda all'indirizzo che hai dato. Se l'indirizzo del dispositivo è specificato come indirizzo a 8 bit, sarà necessario utilizzare un indirizzo con metà del valore quando si legge o si scrive da esso.

### ~

## Returns

* a [buffer](/types/buffer) that contains the data read from the device at the I2C address. The number of bytes returned to you is less than or equal to amount you asked for in the **size** parameter.

## Esempio

Tell a device connected to the I2C pins with the address of `141` to respond to a _read status_ command. Il dispositivo invia i dati di stato sui cavi I2C se riceve un byte di comando uguale a `0`. `32` byte di dati sullo stato vengono letti in un buffer.

```blocks
const i2cDevice = 141;
pins.i2cWriteNumber(i2cDevice, NumberFormat.UInt8LE, 0)
let i2cBuffer = pins.i2cReadBuffer(i2cDevice, 32, false);
```

## Vedi anche

[buffer di scrittura i2c](/reference/pins/i2c-write-buffer), [buffer](/types/buffer)

[Cos'è I2C?](http://www.i2c-bus.org/)