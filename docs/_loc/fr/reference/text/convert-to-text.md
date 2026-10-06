# convert to text

Change the value of any [type](/types) into a text [string](/types/string).

```sig
convertToText(123)
```

## Paramètres

* **value**: a value of some [type](/types) to convert to a [string](/types/string).

## Valeur retournée

* a [string](/types/string) that is a text representation of **value**.

## Exemple #example

Convert a boolean and a number value into strings and join them in a sentence.

```blocks
let myBoolean = false
let myNumber = 0

myBoolean = true
myNumber = 123

let myString = "It is " + convertToText(myBoolean) + " that " + convertToText(myNumber) + " is now a string!"
```

## Voir aussi #seealso

[parse int](/reference/text/parse-int), [parse float](/reference/text/parse-float)