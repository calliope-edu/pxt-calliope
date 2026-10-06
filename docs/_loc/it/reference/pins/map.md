# Mappa

Rimappa il valore specificato da un intervallo all'altro. This function maps the value of `from low` to the value of `to low`, the value of `from high` to the value of `to high`, and intermediate values to intermediate values.

Questa funzione non vincola i valori agli intervalli, perché i valori furoi campo sono talvolta intesi e utili. Se devi limitare un intervallo, puoi usare la funzione `Math.clamp` prima o dopo aver chiamato questa funzione.

```sig
pins.map(0, 0, 4, 0, 1023);
```

## Parametri

* `value`: a [number](/types/number) that specifies the value to map
* `fromLow`: a [number](/types/number) that specifies the lower bound of the origin interval
* `fromHigh`: a [number](/types/number) that specifies the upper bound of the origin interval
* `toLow`: a [number](/types/number) that specifies the lower bound of the target interval
* `toHigh`: a [number](/types/number) that specifies the upper bound of the target interval

## Esempio

Questo esempio mappa il valore letto dal pin analogico `P0` ad una coordinata LED tra `0` e `4`.

```blocks
let value1 = pins.analogReadPin(AnalogPin.P0)
let index = pins.map(value1, 0, 1023, 0, 4)
led.plot(0, index)
```

## Vedi anche

[analog read pin](/reference/pins/analog-read-pin)