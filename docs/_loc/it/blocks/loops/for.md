# Per

Esegui parte del programma il numero di volte che dici tu usando una variabile indice.

```block
for(let i = 0; i <= 4; ++i) {
    let j = i;
}
```

##  #examples

## Example: Count to 4

This program will show the numbers 0, 1, 2, 3, and 4 one after another on the LED screen.

```blocks
input.onButtonEvent(Button.A, input.buttonEventValue(ButtonEvent.Down), () => {
    for(let i = 0; i < 5; ++i) {
        basic.showNumber(i)
    }
})
```