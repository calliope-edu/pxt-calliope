# écrire la Valeur

Write a **name:value** pair and a newline character (`\r\n`) to the [serial](/device/serial) port.

```sig
serial.writeValue("x", 0);
```

It is common when reporting or recording data to use a *Name Value Pair* (NVP). They appear as a text output string in the form of a *name* and a *value* together. The name and the value are separated in the string with a *colon*, `:`. A name value pair reporting a temperature of `-15` degrees could look like:

`température: -15`

L'association d'un nom à une valeur permet d'identifier les données associées lorsque différentes sources de données sont enregistrées. Par exemple, si vous indiquez à la fois la température et l'intensité lumineuse, le format *nom:valeur* aide les feuilles de calcul ou autres programmes d'analyse de données à les distinguer et à regrouper correctement les mêmes types de valeurs. Le rapport de deux sources de données pourrait ressembler à ceci dans la sortie:

    temperature:-15
    temperature:-12
    light:154
    temperature:-11
    light:152
    

## Paramètres

* `name` is the [string](/types/string) to write to the serial port
* `value` is the [number](/types/number) to write to the serial port

## Example: streaming data

Every 10 seconds, the example below sends the temperature and light level to the serial port.

```blocks
basic.forever(() => {
    serial.writeValue("temp", input.temperature())
    serial.writeValue("light", input.lightLevel())
    basic.pause(10000);
})
```

### ~indice

#### Radio-Serial gateway

The [send value](/reference/radio/send-value) function broadcasts string/number pairs. You can use a second @boardname@ to receive them, and then send them directly to the serial port with `write value`.

### ~

## Voir Aussi

[serial](/device/serial), [write line](/reference/serial/write-line), [write number](/reference/serial/write-number), [send value](/reference/radio/send-value)