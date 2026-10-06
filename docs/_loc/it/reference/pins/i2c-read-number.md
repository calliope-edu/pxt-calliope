# i2c Read Number

Legge un numero da un indirizzo I2C usando un formato numerico specificato.

```sig
pins.i2cReadNumber(0, NumberFormat.Int8LE, false);
```

### ~ hint

#### Simulatore

This function needs real hardware to work with. It's not supported in the simulator.

### ~

## Parametri

* **address**: the 7-bit I2C address of the device you want to read a number from.
* **formato**: il [NumberFormat](/types/buffer/number-format) del valore numerico da leggere.
* **repeated**: if `true`, don't send a stop condition after the read. Otherwise, a stop condition is sent when `false` (the default).

### ~ hint

#### Avvio ripetuto

A [repeated start condition](http://www.i2c-bus.org/repeated-start-condition/) is set to help make sure that when you want to read multiple numbers from the device at one time, it can happen without interruption. A start conditon is sent (if **repeated** is `true`) each time a number is read without a matching stop condition. When the last number is read, the stop conditon can be sent by setting **repeated** to `false`. For single reads, don't use **repeated** or set it to `false`.

#### Indirizzi riservati

Alcuni sensori sul tuo @boardname@ utilizzano lo stesso bus I2C collegato ai pin programmati. Questo significa che dovresti stare attento a **NON** usare un indirizzo per il tuo dispositivo uguale a quello usato dai sensori sulla scheda. Controlla l'elenco [Indirizzi sensore I2C](https://tech.microbit.org/hardware/i2c/) prima di assegnarne uno al dispositivo. Questo ti aiuterà a mantenere gli indirizzi separati.

#### Formato dell'indirizzo del bus

Il @Boardname@ utilizza valori a 7 bit per indirizzare i dispositivi collegati sul bus I2C. Prima che un indirizzo venga trasmesso, viene temporaneamente regolato su un valore di 8 bit in modo che i bit di indirizzo validi vengano inviati correttamente. Ciò significa che il valore di un indirizzo a 8 bit presente sul bus apparirà il doppio di quello specificato. Questo va bene però, dato che il dispositivo che stai indirizzando lo decodificherà in modo che corrisponda all'indirizzo che hai dato. Se l'indirizzo del dispositivo è specificato come indirizzo a 8 bit, sarà necessario utilizzare un indirizzo con metà del valore quando si legge o si scrive da esso.

### ~

## Returns

* un numero dal dispositivo con il [NumberFormat](/types/buffer/number-format) che hai chiesto.

## Esempi

### Leggere un grande numero endiano da un dispositivo

L'esempio seguente legge un numero in un intero senza segno big-endian, a 16 bit formato dall'indirizzo I2C a 7 bit `32`.

Legge un numero dal dispositivo a un indirizzo I2C a 7 bit come numero a 16 bit. `16`, big-endian e l' intero scelto per il formato.

```blocks
let inValue = pins.i2cReadNumber(32, NumberFormat.UInt16BE, false);
```

### Letture ripetute

Legge tre byte da un dispositivo all'indirizzo `33` alla volta.

```blocks
let nums: number[] = []

nums[0] = pins.i2cReadNumber(33, NumberFormat.UInt8LE, true)
nums[1] = pins.i2cReadNumber(33, NumberFormat.UInt8LE, true)
nums[2] = pins.i2cReadNumber(33, NumberFormat.UInt8LE, false)
```

## Vedi anche

[i2c write number](/reference/pins/i2c-write-number)

[Cos'è I2C?](http://www.i2c-bus.org/), [formato numerico](/types/buffer/number-format)