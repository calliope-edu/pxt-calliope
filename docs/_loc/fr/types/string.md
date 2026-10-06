# Texte

Une *chaîne* est une séquence de caractères.

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

### ~ indice

#### Character sets

The available characters to use for a language is called the _character set_. Each character in the set has a number code to match it with. To display characters on the [LED screen](/device/screen), the @boardname@, uses the "ASCII" character codes of `32` to `126`; letters, digits, punctuation marks, and a few symbols. All other character codes appear as a `?` on the LED screen.

### ~
## Voir aussi #seealso

[Nombres](/types/number)