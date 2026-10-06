# Zuweisungsoperator

Verwende ein Gleichheitszeichen, um einer [Variable](/blocks/variables/var) eine [Zahl](/types/number) oder eine [Zeichenfolge](/types/string) zuzuweisen.

Wenn du ein Gleichheitszeichen verwendest, um etwas in einer Variablen zu speichern, dann werden die Gleichheitszeichen **Zuweisungsoperator** genannt. Was du speicherst nennt man einen *Wert*.

Wenn du in JavaScript oder Python arbeitest, wird das Gleichheitszeichen verwendet:

```typescript-ignore
item = 3
```

## Der 'setze'-Block

In Blöcken geschieht eine Variablenzuweisung mit dem `||Variablen:set||` Block, wenn du einen Wert auf eine [Variable](/blocks/variables/var) setzt.

```block
let item = 3
```

### ~ hint

#### Eine Variable in der Blockbibliothek erstellen

In der `||variables:Variablen||` Kategorie der **Blockbibliothek** kannst du eine neue Variable erstellen:

![Eine Variable auf einen Wert setzen](https://cdn.makecode.com/blob/1e6a56545ba2c94d0bd17c86cbf0a791121e58ad/static/blocks/variables/assign.gif)

### ~

## Speichern von Zahlen in Variablen

Dieses Programm setzt die Variable `item` gleich `5` und zeigt sie dann auf der [LED-Anzeige](/device/screen) an.

```blocks
let item = 5
basic.showNumber(item)
```

## Speichern von Zeichenfolgen in Variablen

Dieses Programm setzt die Variable `name` gleich `Joe` und zeigt Sie dann auf der [LED-Anzeige](/device/screen) an.

```blocks
let name = "Joe"
basic.showString(name);
```

## Anmerkungen

Den Zuweisungsoperator kann für jedem [Typ](/types) von Variablen verwendet werden. Ein *Typ* ist das Fprmat der Sache eine Variable, wie eine Zahl oder eine Zeichenfolge welche gespeichert werden kann.

## Siehe auch

[Variablen](/blocks/variables/var), [Typen](/types)