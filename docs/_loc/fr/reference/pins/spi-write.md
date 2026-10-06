# spi Write

Write a data value to the SPI slave device and return its response.

```sig
pins.spiWrite(0);
```

Data values are written to a SPI slave device connected to the @boardname@ by the [SPI pins](/reference/pins/spi-pins). The data value might be either a command for the connected device or some value for its use. Si l'opération de lecture a pour effet de retourner une valeur au @boardname@ par le périphérique connecté, la valeur renvoyée en question ne sera que celle renvoyée par la fonction **spiWrite**.

### ~ indice

#### Simulateur

This function needs real hardware to work with. It's not supported in the simulator.

### ~

## Paramètres

* `valeur` : il s'agit, concrètement, du[nombre](/types/number), ou, autrement dit, de la valeur de données à envoyer vers le dispositif esclave SPI.

## Valeur retournée

* Une valeur [numérique](/types/number), ce qui se traduit par une réponse du dispositif esclave SPI.

## Exemple

Exécutez la commande système à partir du dispositif relié au bus SPI, si vous désirez lire la valeur contenue dans la liste d'arguments *WHOAMI*. The chip select line is connected to pin **0** and the SPI signals use pins **P13**, **P14**, and **P15**.

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

## Voir Aussi

[spi pins](/reference/pins/spi-pins), [spi frequency](/reference/pins/spi-frequency), [spi format](/reference/pins/spi-format)

[SPI Programming](https://developer.mbed.org/handbook/SPI)