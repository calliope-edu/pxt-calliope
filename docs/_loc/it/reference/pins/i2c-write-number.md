# i2c Write Number

Write a number to a device at an I2C address using a specified number format.

```sig
pins.i2cWriteNumber(0, 0, NumberFormat.Int8LE, true);
```

### ~ hint

#### Simulatore

This function needs real hardware to work with. It's not supported in the simulator.

### ~

## Parametri

* **address**: the 7-bit I2C address of the device to send to send **value** to.
* **value**: the number to send to **address**.
* **formato**: il [NumberFormat](/types/buffer/number-format) per il **valore**.
* **repeated**: if `true`, don't send a stop condition after the write. Otherwise, a stop condition is sent when `false` (the default).

### ~ hint

#### Avvio ripetuto

A [repeated start condition](http://www.i2c-bus.org/repeated-start-condition/) is set to help make sure that when you want to write multiple numbers from the device at one time, it can happen without interruption. A start conditon is sent (if **repeated** is `true`) each time a number is written without a matching stop condition. When the last number is written, the stop conditon can be sent by setting **repeated** to `false`. For single writes, don't use **repeated** or set it to `false`.

#### Indirizzi riservati

Alcuni sensori sul tuo @boardname@ utilizzano lo stesso bus I2C collegato ai pin programmati. Questo significa che dovresti stare attento a **NON** usare un indirizzo per il tuo dispositivo uguale a quello usato dai sensori sulla scheda. Controlla l'elenco [Indirizzi sensore I2C](https://tech.microbit.org/hardware/i2c/) prima di assegnarne uno al dispositivo. Questo ti aiuterà a mantenere gli indirizzi separati.

#### Formato dell'indirizzo del bus

Il @Boardname@ utilizza valori a 7 bit per indirizzare i dispositivi collegati sul bus I2C. Prima che un indirizzo venga trasmesso, viene temporaneamente regolato su un valore di 8 bit in modo che i bit di indirizzo validi vengano inviati correttamente. Ciò significa che il valore di un indirizzo a 8 bit presente sul bus apparirà il doppio di quello specificato. Questo va bene però, dato che il dispositivo che stai indirizzando lo decodificherà in modo che corrisponda all'indirizzo che hai dato. Se l'indirizzo del dispositivo è specificato come indirizzo a 8 bit, sarà necessario utilizzare un indirizzo con metà del valore quando si legge o si scrive da esso.

### ~

## Esempi

### Scrivere un grande numero endiano a un dispositivo

Invia il valore `2055` all'indirizzo I2C a 7 bit come numero in 32 bit. Il grande `32<0> e l'intero scelto per il formato.</p>

<pre><code class="blocks">pins.i2cWriteNumber(32, 2055, NumberFormat.Int32BE, false);
`</pre> 

### Scritture ripetute

Invia tre valori byte a un dispositivo all'indirizzo `33`.

```blocks
pins.i2cWriteNumber(33, 19, NumberFormat.Int32BE, true);
pins.i2cWriteNumber(33, 61, NumberFormat.Int32BE, true);
pins.i2cWriteNumber(33, 87, NumberFormat.Int32BE, false);
```

## Vedi anche

[i2c read number](/reference/pins/i2c-read-number)

[Cos'è I2C?](http://www.i2c-bus.org/), [formato numerico](/types/buffer/number-format)