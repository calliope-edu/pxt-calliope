# read String

Read the buffered serial data as a string.

```sig
serial.readString();
```

## Valeur retournée

* a [string](/types/string) containing input from the serial port. The string is empty if no data is available.

## Exemple

Le programme suivant fait défiler le texte sur l'écran à mesure qu'il arrive du port série.

```blocks
basic.forever(() => {
    basic.showString(serial.readString());
});
```

## Voir Aussi

[serial](/device/serial), [write line](/reference/serial/write-line), [write value](/reference/serial/write-value)