# Ändere... um...

Ändern bedeutet hier, den Wert einer Variable um einen bestimmten Betrag zu erhöhen.

```block
let x = 0
x += 2
```

Die Änderung-Blöcke erhöhen den Wert in der Variable um den gewünschten Betrag. Dies ist auch bekannt als *Additionzuweisungs* Operation.

### Deklarierte Variable ändern

Verwende den Änderungs-Operator, um einen neuen, größeren Wert auf eine [Variable](/blocks/variables/var) zu speichern. Wenn du mit **`let`** einer Variable einen Wert von `1` zuweist, ändert der Änderungsblock die Werte um `2` wie folgt:

```block
let x = 1
x += 2
```

### ~ hint

Du kannst den Änderungs-Operator mit allen Variablen der unterstützten [Typen](/types) verwenden.

### ~

##  #examples

## Beispiel: Anzeigen des Werts einer Variablen

Verwende den Zuweisungsoperator, um den Wert einer [Variable](/blocks/variables/var) festzulegen. Ändere den Wert einer Variablen mit dem Block Ändere auf von 0 auf 1. Zeige dann den neuen Wert der Variablen auf dem LED-Bildschirm an. Wie zum Beispiel:

```blocks
let x = 0;
x += 1;
basic.showNumber(x);
```

## Siehe auch

[Variablen](/blocks/variables/var), [Assignment operator](/blocks/variables/assign)