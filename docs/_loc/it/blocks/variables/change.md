# Change value

Change, meaning increase, the value of a variable by some amount.

```block
let x = 0
x += 2
```

I blocchi di modifica aumentano il valore nella variabile della quantità desiderata. Questo è anche noto come *operazione di assegnazione di addizioni*.

### Modifica una variabile dichiarata

Use the change operator to set a new, larger value to a [variable](/blocks/variables/var). Se **`fai`** avere un valore di `1` ad una variabile, il blocco modifica fa cambiare il valore di `2` così:

```block
let x = 1
x += 2
```

### ~ hint

Puoi usare l'operatore d'assegnazione con variabili di ogni [tipo](/types) supportato.

### ~

##  #examples

## Example: show the value of a variable

Use the assignment operator to set the value of a [variable](/blocks/variables/var). Change the value of a variable from 0 to 1 using the change item block. Then display the new value of the variable on the LED screen. Like this:

```blocks
let x = 0;
x += 1;
basic.showNumber(x);
```

## Vedi anche

[Variables](/blocks/variables/var), [Assignment operator](/blocks/variables/assign)