# For
 
Run part of the program the number of times you say using an index variable.

```block
for(let i = 0; i <= 4; ++i) {
    let j = i;
}
```

##  #examples

## Παράδειγμα: Μετράμε ως το 4

Αυτό το πρόγραμμα θα δείξει τους αριθμούς 0, 1, 2, 3 και 4 τον έναν μετά τον άλλον στην οθόνη LED.

```blocks
input.onButtonEvent(Button.A, input.buttonEventValue(ButtonEvent.Down), () => {
    for(let i = 0; i < 5; ++i) {
        basic.showNumber(i)
    }
})
```