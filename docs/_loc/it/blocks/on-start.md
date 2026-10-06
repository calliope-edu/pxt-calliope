# All'avvio

Un evento che viene eseguito all'avvio del programma.

```blocks
let thousand = 1000
```

The `on start` is a special event that runs when the program starts, before any other event. Use this event to initialize your program.

##  #exstart

In this example, `on start` sets a dimmer brightness on the screen and the button handler shows a string.

```blocks
input.onButtonEvent(Button.A, input.buttonEventValue(ButtonEvent.Down), () => {
    basic.showString("Hello!")
})
led.setBrightness(50)
```

## Che dire di JavaScript?

Dov'è `all'avvio`...?

```typescript
function onStart(){} // I don't exist
```

`on start` **only** exists in the block editor. In JavaScript, all code executes sequentially starting at the first line.

## Hey, my events moved! #eventsmoved

Quando trasformiamo i blocchi in JavaScript, mettiamo sempre tutte le registrazioni evento (pulsanti, shake, ...) prima di lanciare il codice `all'avvio`.

Se un blocco da `all'avvio` si sospende, altri eventi registrati hanno l'opportunità di eseguirsi.

## #eventorder

## #examples