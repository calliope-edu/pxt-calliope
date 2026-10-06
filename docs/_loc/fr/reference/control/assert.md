# assert

Arrête le programme si la condition d'assertion est fausse.

```sig
control.assert(false)
```

You can insist that your program will stop at an assert block if a certain condition you check is false. The error number in the assert is written to the serial port with a failure message.

## Paramètres

* **cond**: a [boolean](/types/boolean) where true means everything is ok or false which means, stop the program!
* **msg**: an optional [string](/types/string) with a message describing the failed assertion.

## Exemple

Arrêter le programme si un capteur connectée à la broche `P0` envoie un signal faible (`0`).

```blocks
basic.forever(() => {
    control.assert(pins.digitalReadPin(DigitalPin.P0) == 1)
    basic.pause(1000)
})
```

## Voir Aussi

[panic](/reference/control/panic)