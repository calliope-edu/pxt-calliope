# panic

Mostra un numero di errore ed interrompe il programma.

```sig
control.panic(0)
```

If your board has some way to display error information, `||control:panic||` will work with it to show error numbers.

Your program stops when you use `||control:panic||`. Use this when you think something bad enough has happened and your program can't run properly anymore.

## Parametri

* **code**: an error [number](/types/number) you match to an error situation in your program.

### ~hint
**Codici di errore di sistema**

The @boardname@ has error codes reserved for use by the system software. The `panic()` function is for advanced usage only. You must carefully chose an error code that doesn't match one currently used by the @boardname@ system.
### ~

## Esempio

Invia un errore 'codice rosso' che hai creato allo schermo d'errore se l'input dal pin `P0` è inferiore a `10`.

```blocks
let codeRed = 1110;
let codeBlue = 1111;

if (pins.analogReadPin(AnalogPin.P0) < 10) {
    control.panic(codeRed)
}
```

## Vedi anche

[assert](/reference/control/assert), [error codes](/device/error-codes)