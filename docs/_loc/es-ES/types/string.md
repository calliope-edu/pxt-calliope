# Cadena

A *String* is a sequence of characters.

## #intro

Un tipo cadena es más complejo que un [número](/types/number) o un [booleano](/types/boolean). Junto con sus caracteres, un tipo cadena contiene información sobre su longitud y te permite cambiar cualquiera de sus caracteres usando un índice. Las cadenas se pueden dividir en cadenas más pequeñas o agregarlas para hacer cadenas más grandes.

Las cadenas pueden contener letras, números, signos de puntuación y otros caracteres especiales. Las cadenas también pueden tener caracteres en diferentes idiomas.

`"abcdefg1234*?!"`

Una cadena [variable](/blocks/variables/var) se declara [asignando](/blocks/variables/assign) una variable a un valor de cadena:

```block
let myString = "¡Mi nueva y bonita cadena está aquí!"
```

Las cadenas tienen operaciones asociadas a ellas para que puedas cambiarlas o trabajar con partes de ellas.

```blocks
let myString = "¡Mi nueva cadena está aquí!"
// make a smaller string
let mySmallString = myString.substr(0, myString.indexOf("g") + 1)
```

## Crea una variable de cadena #create

In the `||variables:Variables||` category of the **Toolbox** you can create new variable:

![Create a new string variable](https://cdn.makecode.com/blob/77e63dd20b6639cf336db7c7ead0ce0a43dddff6/static/blocks/variables/string.gif)

Here's how to create a string variable using the Toolbox:

1. Click `||variables:Variables||` in the Toolbox.
2. Click on **Make a Variable...**.
3. Choose a name for your variable, type it in, and click **Ok**.
4. Drag the new `||variables:set||` block into your code.
5. Click on the `||text:Text||` drawer in the Toolbox and find the `||text:" "||` block.
6. Drag the `||text:" "||` block into the value slot in of your variable `||variables:set||` block.

## #examples

## Characters you use in strings #custom

### ~ notas

#### Character sets

The available characters to use for a language is called the _character set_. Each character in the set has a number code to match it with. To display characters on the [LED screen](/device/screen), the @boardname@, uses the "ASCII" character codes of `32` to `126`; letters, digits, punctuation marks, and a few symbols. All other character codes appear as a `?` on the LED screen.

### ~
## See also #seealso

[Número](/types/number)