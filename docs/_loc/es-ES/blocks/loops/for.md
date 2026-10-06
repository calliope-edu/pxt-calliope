# For
 
Run part of the program the number of times you say using an index variable.

```block
for(let i = 0; i <= 4; ++i) {
    let j = i;
}
```

##  #examples

## Ejemplo: Contar hasta 4

Este programa muestra consecutivamente los números 0, 1, 2, 3 y 4 en la pantalla LED.

```blocks
input.onButtonEvent(Button.A, input.buttonEventValue(ButtonEvent.Down), () => {
    for(let i = 0; i < 5; ++i) {
        basic.showNumber(i)
    }
})
```