# Mentre

Ripeti codice mentre una `condizione` del [Booleano](/blocks/logic/boolean) è vera.

```block
while(true) {
}
```

Un ciclo ha una *condizione* che viene valutata come valore [Booleano](/blocks/logic/boolean).

Tale condizione è verificata prima che qualunque codice venga eseguito. Il che vuol dire che se la condizione è falsa, il codice all'interno del loop non viene eseguito.

##  #examples

## Example: diagonal line

The following example uses a while loop to make a diagonal line on the LED screen (points `0, 0`, `1, 1`, `2, 2`, `3, 3`, `4, 4`).

```blocks
input.onButtonEvent(Button.A, input.buttonEventValue(ButtonEvent.Down), () => {
    let index = 4;
    while(index >= 0) {
        led.plot(index, index);
        index--;
    }
})
```