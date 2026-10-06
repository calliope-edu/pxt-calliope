# Change value

Change, meaning increase, the value of a variable by some amount.

```block
let x = 0
x += 2
```

The change blocks increase the value in the variable by the amount you want. This is also known as an *addition assignment* operation.

### Change a declared variable

Use the change operator to set a new, larger value to a [variable](/blocks/variables/var). If you **`let`** a variable have a value of `1`, the change block makes the value change by `2` like this:

```block
let x = 1
x += 2
```

### ~ notas

You can use the change operator with variables of each of the supported [types](/types).

### ~

##  #examples

## Example: show the value of a variable

Use the assignment operator to set the value of a [variable](/blocks/variables/var). Change the value of a variable from 0 to 1 using the change item block. Then display the new value of the variable on the LED screen. Like this:

```blocks
let x = 0;
x += 1;
basic.showNumber(x);
```

## Ver también

[Variables](/blocks/variables/var), [Assignment operator](/blocks/variables/assign)