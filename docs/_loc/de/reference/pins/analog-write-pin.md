# Schreibe analogen Wert

Schreibe einen **analogen** Wert (`0` bis `1023`) auf den angegebenen [Pin](/device/pins).

```sig
pins.analogWritePin(AnalogPin.P0, 400)
```

## Parameter

* `name` ist eine [string](/types/string) mit dem Namen des gewünschten Pins (`P1`, `P2`, `C16 oder C17`)
* `Wert`: eine [Zahl](/types/number) von `0` bis `1023`

## Beispiel

Dieses Programm schreibt `1023` auf den Pin `C16`.

```blocks
pins.analogWritePin(AnalogPin.P0, 1023)
```

### ~hint

Wenn du möchtest dass z. B. der Wert `256` geschrieben werden soll, schreibt diese Funktion nicht *wirklich* `256`. Stattdessen schreibt er eine Menge unterschiedlicher Zahlen, und ihr Durchschnitt ist `256`.

### ~

## Siehe auch

[@boardname@ pins](/device/pins), [on pin pressed](/reference/input/on-pin-pressed), [analog read pin](/reference/pins/analog-read-pin), [digital read pin](/reference/pins/digital-read-pin), [digital write pin](/reference/pins/digital-write-pin)