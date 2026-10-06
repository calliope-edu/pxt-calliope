# Assert

Unterbricht das Programm, wenn die Assertionsbedingung falsch ist.

```sig
control.assert(false)
```

Sie können darauf bestehen, dass Ihr Programm bei einem assert block stoppt, wenn eine bestimmte Bedingung falsch ist. Die Fehlernummer im assert wird mit einer Fehlermeldung auf den seriellen Port geschrieben.

## Parameter

* **cond**: Ein [boolean](/types/boolean) wobei true bedeutet, dass alles in Ordnung ist bzw. falsch, was bedeutet, dass das Programm gestoppt werden muss!
* **msg**: ein optionaler [string](/types/string) mit einer Meldung, die die fehlgeschlagene Assertion beschreibt.

## Beispiel

Stoppt das Programm, wenn ein an Pin `P0` angeschlossener Sensor ein Low-Signal (`0`) sendet.

```blocks
basic.forever(() => {
    control.assert(pins.digitalReadPin(DigitalPin.P0) == 1)
    basic.pause(1000)
})
```

## Siehe auch

[panic](/reference/control/panic)