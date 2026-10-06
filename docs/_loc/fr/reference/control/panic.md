# panic

Affiche un numéro d'erreur et arrête le programme.

```sig
control.panic(0)
```

Si votre appareil dispose d'un moyen d'afficher une information d'erreur, `||control:panic||` l'utilisera pour afficher les numéros d'erreur.

Your program stops when you use `||control:panic||`. Use this when you think something bad enough has happened and your program can't run properly anymore.

## Paramètres

* **code**: an error [number](/types/number) you match to an error situation in your program.

### ~indice
**Codes d'erreur système**

The @boardname@ has error codes reserved for use by the system software. The `panic()` function is for advanced usage only. You must carefully chose an error code that doesn't match one currently used by the @boardname@ system.
### ~

## Exemple

Envoyer un 'code rouge' d'erreur que vous avez créé vers l'afficheur d'erreur si l'entrée de la broche `P0` est plus petite que `10`.

```blocks
let codeRed = 1110;
let codeBlue = 1111;

if (pins.analogReadPin(AnalogPin.P0) < 10) {
    control.panic(codeRed)
}
```

## Voir Aussi

[assert](/reference/control/assert), [codes d'erreur](/device/error-codes)