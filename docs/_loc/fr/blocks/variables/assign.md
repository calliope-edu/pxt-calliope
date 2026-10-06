# Opérateur d'assignation

Use an equals sign to make a [variable](/blocks/variables/var) store a [number](/types/number), [string](/types/string), or other [type](/types) of value.

When you use the equals sign (**=**) to store something in a variable, the equals sign is called an *assignment operator*, and what you store is called a *value*.

When you work in JavaScript or Python the equals sign is used:

```typescript-ignore
item = 3
```

## The 'set' block

In blocks, a variable assignment happens with the `||variables:set||` block when you set a value to a [variable](/blocks/variables/var).

```block
let item = 3
```

### ~ indice

#### Setting a variable using the Toolbox

In the `||variables:Variables||` category of the **Toolbox** you can create or choose a variable to assign:

![Setting a variable to a value](https://cdn.makecode.com/blob/1e6a56545ba2c94d0bd17c86cbf0a791121e58ad/static/blocks/variables/assign.gif)

### ~

## Stocker des nombres dans des variables

Ce programme rend la variable `item` égale à `5` , puis l’affiche sur l'[écran LED](/device/screen).

```blocks
let item = 5
basic.showNumber(item)
```

## Stockage de chaînes dans des variables

Ce programme rend la variable `name` égal à `Joe` , puis l’affiche sur l'[écran LED](/device/screen).

```blocks
let name = "Joe"
basic.showString(name);
```

## Notes

Vous pouvez utiliser l'opérateur d'assignation avec des variables de chaque [type](/types). Un *type* est le type de chose qu'une variable peut stocker, comme un nombre ou une chaîne.

## Voir Aussi

[variable](/blocks/variables/var), [types](/types)