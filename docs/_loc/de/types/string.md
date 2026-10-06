# Zeichenfolge

Ein *String* ist eine Zeichenfolge.

## #intro

A string type is more complex than a [number](/types/number) or a [boolean](/types/boolean). Along with its characters a string type contains information about its length an it lets you change any of its characters using an index. Strings can be broken into smaller strings or added on to make larger strings.

Strings can contain letters, numbers, punctuation marks, and other special characters. Strings can have characters from different languages too.

`"abcdefg1234*?!"`

A string [variable](/blocks/variables/var) is declared by [assigning](/blocks/variables/assign) a variable to a string value:

```block
let myString = "My nice new string is here!"
```

Strings have operations associated with them so that you can change them or work with parts of them.

```blocks
let myString = "My nice new string is here!"
// make a smaller string
let mySmallString = myString.substr(0, myString.indexOf("g") + 1)
```

## Create a string variable #create

In der `||variables:Variablen||` Kategorie der **Blockbibliothek** kannst du eine neue Variablen erstellen:

![Eine neue Zeichenfolge-Variable erstellen](https://cdn.makecode.com/blob/77e63dd20b6639cf336db7c7ead0ce0a43dddff6/static/blocks/variables/string.gif)

Im Folgenden wird beschrieben, wie du eine Variable mit Hilfe der Blockbibliothek erstellen kannst:

1. Klicke in der Code-Bibliothek auf `||variables:Variablen||`.
2. Klicke auf **Erstelle eine Variable...**.
3. Wähle einen Namen für die Variable aus, gib diesen ein und klicke auf **OK**.
4. Ziehe die neue `||Variables:set||` Block in deinen Code.
5. Klicke in der Toolbox auf den Ordner `||text:Text||` und suche den Block `||text:" "||`.
6. Ziehe den Block `||text:" "||` in den Werte-Bereich des Blocks `||variables:set||`.

## #examples

## Zeichen, die in Zeichenfolgen verwenden werden dürfen #custom

### ~ hint

#### Zeichensätze

Die für eine Sprache verfügbaren Zeichen werden als _Zeichensatz_ bezeichnet. Jedes Zeichen in dem Satz ist mit einem Zahlencode versehen, der ihm zugeordnet ist. Um Zeichen auf dem [LED-Bildschirm](/device/screen) anzuzeigen, verwendet das @boardname@ die „ASCII“-Zeichencodes von `32` bis `126`: Buchstaben, Ziffern, Satzzeichen und einige Symbole. Alle anderen Zeichencodes werden auf dem LED-Bildschirm als `?` angezeigt.

### ~
## Siehe auch #seealso

[Number](/types/number)