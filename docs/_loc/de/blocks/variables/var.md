# Variable definieren

Variablen deklarieren und verwenden.

## @parent language

Eine Variable ist ein Platz zum Speichern und Abrufen von Daten. Variablen haben einen Namen, einen [Typ](/types) und einen Wert:

* Der *Name* legt fest, wie du die Variable nennen willst.
* *Typ* - die Art der Daten, die eine Variable speichern kann
* Der *Wert* bezieht sich auf das, was in der Variablen gespeichert ist

## Die Variablen (var) Anweisung

Eine Variable wird mit einer `Variablen` Anweisung erstellt. Die Variable wird in dieser Anweisung selbst „deklariert“. In MakeCode JavaScript wird eine Variable zusammen mit der ersten [-Zuordnung](/blocks/variables/assign) deklariert:

```typescript
let x = 2
```

In Python wird eine Variable deklariert, wenn sie zum ersten Mal verwendet wird. In diesem Fall ist die Variablenanweisung lediglich die Zuweisung der Variablen:

```python
x = 2
```

Wenn eine Variable in Blöcken deklariert wird, sehst du den `||Variablen:set||`-Block bei der ersten Verwendung der Variable. Dieser Code speichert die Zahl `2` in der Variable `x`:

```blocks
let x = 2
```

Die neue Variable wird innerhalb der `||Variablen:Variablen||` Kategorie der **Blockbibliothek** erstellt.

### ~ hint

#### Eine Variable in der Blockbibliothek erstellen

In der `||variables:Variablen||` Kategorie der **Toolbox** kannst du eine neue Variablen erstellen:

![Eine neue Variable erstellen](https://cdn.makecode.com/blob/d60ec394e561b38d35ea4e45a38fb1328f63ef7f/static/blocks/variables/create.gif)

Im Folgenden wird beschrieben, wie du eine Variable mit Hilfe der Blockbibliothek erstellen kannst:

1. Klicke auf den <strong x-id="1">Schütteln</strong> Button, um das Ergebnis anzuzeigen.
2. Klicke auf **Erstelle eine Variable...**.
3. Wählen einen Namen für die Variable, gebe ihn ein und klicken auf **Ok**.
4. Ziehe die neue Variable, `||Variables:set||` oder den `|Variablen:change||` Block auf die Programmierbühne. 

### ~

### Kurzes Beispiel

Für die von der [brightness](/reference/led/brightness)-Funktion zurückgegebene Zahl wird eine Variable erstellt.

```blocks
let b = led.brightness()
```

## Verwenden von Variablen

Nachdem eine Variable definiert ist, verwende einfach den Variablennamen, wann immer du benötigst, was in der Variable gespeichert ist. Der folgende Code zeigt z. B. den Wert, der in `counter` gespeichert ist, auf der LED-Anzeige an:

```blocks
let counter = 1
basic.showNumber(counter)
```

Um den Inhalt einer Variablen zu ändern, verwende den Zuweisungsoperator. Der folgende Code setzt `counter` auf 1 und erhöht dann den Wert von `counter` um 10:

```blocks
let counter = 1
counter = counter + 10
basic.showNumber(counter)
```

## Warum Variablen verwenden?

Wenn du Daten zwischenspeichern und ändern möchtest, benötigst du eine Variable. Ein Zähler ist ein gutes Beispiel:

```blocks
let counter = 0;
input.onButtonEvent(Button.A, input.buttonEventValue(ButtonEvent.Down), () => { 
  counter = counter + 1;
  basic.showNumber(counter);
});
```

## Lokale Variablen

Lokale Variablen sind nur innerhalb der Funktion oder des Codeblocks vorhanden, in der sie definiert worden sind. Zum Beispiel:

```blocks
// x does NOT exist here.
if (led.brightness() > 128) {
    // x exists here
    let x = 0
}
```

## Hinweise zu Variablen

### Variablennamen

Einige Blöcke kommen aus der Blockbibliothek mit Standard-Variablennamen, wie `list` von `||Arrays:Arrays||`. Du kannst die Standard-Variablennamen verwenden, wenn du möchtest. Allerdings ist es am besten, wenn man aussagekräftige Variablennamen verwendet, du solltest aber keine Umlaute oder Sonderzeichen verwenden. Um einen Variablennamen im Editor zu ändern, wähle den Pfeil nach unten neben der Variable und klicken dann auf "neue Variable...".

### Versteckter Deklarationsblock

Wenn eine Variable mehrmals verwendet wird und der Deklarationsblock die Variable auf `0`setzt, dass der erste Block der Deklaration ausgeblendet ist. Zum Beispiel:

```blocks
let x = 0
if (x == 0) {
    x = 9
}
```

Du siehst keinen ersten Block, der die Variable `x` auf `0` setzt, denn das geschieht in einer versteckten Deklaration. Du siehst die Deklarationsanweisung, `let x = 0`, wenn du im Editor von Blöcken zu JavaScript wechselst:

```typescript-ignore
let x = 0
if (x == 0) {
    x = 9
}
```

## Siehe auch

[Typen](/types), [Zuweisungsoperator](/blocks/variables/assign)