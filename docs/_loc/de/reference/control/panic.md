# panic

Zeigt eine Fehlerzahl an und stoppt das Programm.

```sig
control.panic(0)
```

Wenn dein Board eine Möglichkeit hat, Fehlerinformationen anzuzeigen, wird `||control:panic||` damit arbeiten, um Fehlerzahlen anzuzeigen.

Dein Programm stoppt, wenn Du `||control:panic||` verwendest. Verwende dies, wenn du denkst, dass etwas was schlimm genug war passiert ist und dein Programm nicht mehr richtig laufen kann.

## Parameter

* **code**: eine Fehlerzahl [number](/types/number), die du einer Fehlersituation in deinem Programm zuordnest.

### ~hint
**System Fehlercodes**

Das @boardname@ hat Fehlercodes, die für die Verwendung durch die Systemsoftware reserviert sind. Die `Panic()` Funktion ist nur für erweiterte Nutzung bestimmt. Du musst sorgfältig einen Fehlercode wählen, der nicht mit einem vom @boardname@ System verwendeten übereinstimmt.
### ~

## Beispiel

Sende einen von dir erstellten 'Code Rot' Fehler an die Fehleranzeige, wenn der Eingang vom Pin `P0` niedriger als `10` ist.

```blocks
let codeRed = 1110;
let codeBlue = 1111;

if (pins.analogReadPin(AnalogPin.P0) < 10) {
    control.panic(codeRed)
}
```

## Siehe auch

[assert](/reference/control/assert), [Fehlercodes](/device/error-codes)