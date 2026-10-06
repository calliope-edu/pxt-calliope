# Se

Esegue il codice a seconda che una condizione [booleana](/blocks/logic/boolean) sia vera o falsa.

```block
if(true) {
}
```

Il codice all'interno del blocco **`if`** viene eseguito quando la condizione del blocco è **true**. È possibile confrontare variabili a valori o variabili a variabili, per una condizione **vera**.

```block
let reward = false;
let perfect = 0;
let myScore = 0;
if (myScore < 10) {
    myScore += 1;
}

if (myScore == perfect) {
    reward = true;
}
```

## Condizione opposta: `else` #oppositecondition

Se vuoi qualche altro codice da eseguire quando la condizione opposta è **true**, inserisci un'area del blocco aggiuntiva detta **`else`**.

```block
let colorMix = 0;
let favColor = "orange";

if (favColor == "blue")
{
    colorMix = 7;
} else {
    colorMix = 472;
}
```

## Condizione opposta, ma controlla qualcosa di nuovo: `else if`

Another conditional action is to add an **`if`** to an **`else`** for an **`else if`**. It works like this:

```block
let reward = false;
let nearPerfect = 0
let perfect = 0
let myScore = 0;
if (myScore < 10) {
    myScore += 1;
}

if (myScore == perfect) {
    reward = true;
} else if (myScore == nearPerfect) {
    reward = true;
}
```

You might guess that a longer way of saying the same thing is this:

```block
let reward = false;
let nearPerfect = 0;
let perfect = 0;
let myScore = 0;
if (myScore < 10) {
    myScore += 1;
}

if (myScore == perfect) {
    reward = true;
} else {
    if (myScore == nearPerfect) {
        reward = true;
    }
}
```

## ~hint

Click on the plus **(+)** symbol to add *else* or *else if* sections to the current *if* block.

## ~

##  #examples

## Example: adjusting screen brightness

If the [light level](/reference/input/light-level) is `< 100`, this code sets the brightness to `255` when the button A is pressed:

```blocks
input.onButtonEvent(Button.A, input.buttonEventValue(ButtonEvent.Down), () => {
    if(input.lightLevel()<100){
        led.setBrightness(255);
    }
})
```