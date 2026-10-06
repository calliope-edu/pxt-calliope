# assert

Stop the program if the assertion condition is false.

```sig
control.assert(false)
```

You can insist that your program will stop at an assert block if a certain condition you check is false. Il numero di errore nella risorsa è scritto alla porta seriale con un messaggio di fallimento.

## Parametri

* **cond**: a [boolean](/types/boolean) where true means everything is ok or false which means, stop the program!
* **msg**: an optional [string](/types/string) with a message describing the failed assertion.

## Esempio

Stop the program if a sensor connected to pin `P0` sends a low (`0`) signal.

```blocks
basic.forever(() => {
    control.assert(pins.digitalReadPin(DigitalPin.P0) == 1)
    basic.pause(1000)
})
```

## Vedi anche

[panic](/reference/control/panic)