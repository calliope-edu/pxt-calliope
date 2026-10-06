# scrivi Valore

Write a **name:value** pair and a newline character (`\r\n`) to the [serial](/device/serial) port.

```sig
serial.writeValue("x", 0);
```

It is common when reporting or recording data to use a *Name Value Pair* (NVP). They appear as a text output string in the form of a *name* and a *value* together. Il nome e il valore sono separati nella stringa con i *due punti*, `:`. A name value pair reporting a temperature of `-15` degrees could look like:

`temperatura:-15`

Associating a name with a value helps to identify related data when different data sources are recorded. Per esempio, se stai segnalando sia la temperatura che l'intensità luminosa, il formato *name:value* aiuta i fogli di calcolo o altri programmi di analisi dei dati a distinguere tra loro e il gruppi degli stessi tipi di valori insieme propriamente. La segnalazione di due fonti di dati potrebbe apparire come questa nell'output:

    temperature:-15
    temperature:-12
    light:154
    temperature:-11
    light:152
    

## Parametri

* `name` is the [string](/types/string) to write to the serial port
* `value` is the [number](/types/number) to write to the serial port

## Esempio: dati streaming

Ogni 10 secondi, l'esempio sottostante invia la temperatura e il livello di luce alla porta seriale.

```blocks
basic.forever(() => {
    serial.writeValue("temp", input.temperature())
    serial.writeValue("light", input.lightLevel())
    basic.pause(10000);
})
```

### ~hint

#### Radio-Serial gateway

The [send value](/reference/radio/send-value) function broadcasts string/number pairs. Puoi usare una seconda @boardname@ per riceverli e poi inviarli direttamente alla porta seriale con `scrivi valore`.

### ~

## Vedi anche

[serial](/device/serial), [write line](/reference/serial/write-line), [write number](/reference/serial/write-number), [send value](/reference/radio/send-value)