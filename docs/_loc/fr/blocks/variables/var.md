# Declaring variables

How to declare and use variables.

## @parent language

A variable is a place where you can store and retrieve data. Variables have a name, a [type](/types), and a value:

* *nom* est la dénomination de la variable dans le programme
* *type* is the kind of data a variable can store
* *value* is what's stored in the variable

## The variable (var) statement

A variable is created using a `variable` statement. The variable will "declare" itself in this statement. In MakeCode JavaScript a variable is declared along with its first [assignment](/blocks/variables/assign):

```typescript
let x = 2
```

With Python a variable is declared when it's first used. In this case the variable statement is just the assignment of the variable:

```python
x = 2
```

If a variable is declared in blocks you will see the `||variables:set||` block with the first use of the variable. This code stores the number `2` in the `x` variable:

```blocks
let x = 2
```

The new variable is created inside the `||variables:Variables||` category of the **Toolbox**.

### ~ indice

#### Creating a variable from the Toolbox

In the `||variables:Variables||` category of the **Toolbox** you can create new variable:

![Create a new variable](https://cdn.makecode.com/blob/d60ec394e561b38d35ea4e45a38fb1328f63ef7f/static/blocks/variables/create.gif)

Here's how to create a variable using the Toolbox:

1. Click `||variables:Variables||` in the Toolbox.
2. Click on **Make a Variable...**.
3. Choose a name for your variable, type it in, and click **Ok**.
4. Drag the new variable, `||variables:set||` or `||variables:change||` block into your code. 

### ~

### Quick example

A variable is created for the number returned by the [brightness](/reference/led/brightness) function.

```blocks
let b = led.brightness()
```

## Utilisation des variables

Une fois que avez défini une variable, il suffit d'utiliser le nom de cette variable pour connaître la valeur qu'elle contient. For example, the following code shows the value stored in `counter` on the LED screen:

```blocks
let counter = 1
basic.showNumber(counter)
```

Pour modifier le contenu d'une variable, utilisez l'opérateur d'assignation. Le code suivant définit `compteur` à 1, puis incrémente `compteur` de 10 :

```blocks
let counter = 1
counter = counter + 10
basic.showNumber(counter)
```

## Pourquoi utiliser des variables?

Si vous voulez mémoriser et modifier des données, vous aurez besoin d'une variable. Un compteur est un excellent exemple :

```blocks
let counter = 0;
input.onButtonEvent(Button.A, input.buttonEventValue(ButtonEvent.Down), () => { 
  counter = counter + 1;
  basic.showNumber(counter);
});
```

## Variables locales

Les variables locales n'existent que dans la fonction ou le bloc de code où elles sont définies. Par exemple :

```blocks
// x does NOT exist here.
if (led.brightness() > 128) {
    // x exists here
    let x = 0
}
```

## Notes about variables

### Variable names

Some blocks come from the Toolbox with default variable names, such as `list` from `||arrays:Arrays||`. You can use the default variable names if you like, however, it's best to use descriptive variable names. To change a variable name in the editor, select the down arrow next to the variable and then click **"Rename variable..."** to change it.

### Hidden declaration block

If a variable is used more than once, and its declaration block sets the variable to `0`, that first declaration block is hidden. For example:

```blocks
let x = 0
if (x == 0) {
    x = 9
}
```

You don't see any first block setting the variable `x` to `0` but that happens in its hidden declaration statement. You'll see the declaration statement, `let x = 0`, if you switch from Blocks to JavaScript in the Editor:

```typescript-ignore
let x = 0
if (x == 0) {
    x = 9
}
```

## Voir Aussi

[types](/types), [opérateur d'assignation](/blocks/variables/assign)