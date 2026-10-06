# einen Wert schreiben

Schreibe ein **Name:Wert** -Paar und ein Zeilenumbruchzeichen (`\r\n`) an den [seriellen](/device/serial) Anschluss.

```sig
serial.writeValue("x", 0);
```

*Name Value Pair* (NVP) wird meistens bei der Meldung oder bei der Aufzeichnung aller Informationen verwendet. Sie erscheinen als Textausgabestring in Form eines *Namens* und eines *Wertes* zusammen. Der Name und der Wert werden in der Zeichenkette durch einen *Doppelpunkt*, `:` getrennt. Ein Name/Wert-Paar, das eine Temperatur von `-15` Grad angibt, könnte wie folgt aussehen:

`temperature:-15`

Die Zuordnung eines Namens zu einem Wert ermöglicht es, relevante Daten zu identifizieren, wenn Datenmengen, die aus verschiedenen Quellen kommen, gespeichert werden. Wenn Du, zum Beispiel, sowohl die Temperatur als auch die Lichtintensität meldest, hilft das Format *Name/Wert* Tabellenkalkulationen und weiteren Programmen zur Datenanalyse dabei, zwischen den beiden zu unterscheiden und dieselben Arten von Werten richtig zusammenzufassen. Die Meldung zweier Datenquellen dürfte in der Ausgabe wie folgt aussehen:

    temperature:-15
    temperature:-12
    light:154
    temperature:-11
    light:152
    

## Parameter

* `Name` ist der [String](/types/string), der auf den seriellen Port geschrieben werden soll
* `Value` ist die [Zahl](/types/number), die auf den seriellen Port geschrieben werden soll

## Beispiel: Streaming-Daten

Alle 10 Sekunden sendet das folgende Beispiel die Temperatur und den Lichtpegel an den seriellen Anschluss.

```blocks
basic.forever(() => {
    serial.writeValue("Temp", input.temperature())
    serial.writeValue("Licht", input.lightLevel())
    basic.pause(10000);
})
```

### ~hint

#### Radio-Serial gateway

Die [Wert senden](/reference/radio/send-value) Funktion sendet String/Zahlen-Paare. Du kannst einen zweiten @boardname@ verwenden, um sie zu empfangen, und sie dann direkt an den seriellen Port mit `Wert schreiben` senden.

### ~

## Siehe auch

[serial](/device/serial), [write line](/reference/serial/write-line), [write number](/reference/serial/write-number), [send value](/reference/radio/send-value)