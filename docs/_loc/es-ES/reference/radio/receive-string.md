# receive String

Find the next string sent by radio from another @boardname@.

```sig
radio.receiveString()
```

### ~ alert

#### Deprecated

¡Esta API ha quedado obsoleta! Usa [on received string](/reference/radio/on-received-string) en su lugar.

### ~

## Devuelve

* the first [string](/types/string) that was sent. If no string was sent, then this function returns an empty (blank) string.

## Ejemplo: Receptor simple

Muestra la cadena enviada por otra @boardname@.

```blocks
radio.onDataReceived(() => {
    basic.showString(radio.receiveString());
});
```

## Ejemplo: Radio bidireccional

Si cargas este programa en dos o más @boardname@s, puedes enviar una palabra clave desde una de ellas a las otras presionando el botón `A`. Las otras @boardname@s recibirán la palabra clave y luego la mostrarán.

```blocks
input.onButtonEvent(Button.A, input.buttonEventClick(), () => {
    radio.sendString("Codeword: TRIMARAN")
    basic.showString("SENT");
})

radio.onDataReceived(() => {
    basic.showString(radio.receiveString());
});
```

## ~nota

A radio that can both transmit and receive is called a *transceiver*.

## ~

## Ejemplo: Radio de estados de ánimo

Este es un programa simple para enviar si estás feliz o triste por radio ```radio```Usa los botones `A` o `B` para seleccionar una emoción.

Este programa también recibirá el estado de ánimo de tu amigo.

```blocks
let data: string = "";
input.onButtonEvent(Button.A, input.buttonEventClick(), () => {
    radio.sendString("H");
});
input.onButtonEvent(Button.B, input.buttonEventClick(), () => {
    radio.sendString("S");
});
radio.onDataReceived(() => {
    data = radio.receiveString();
    if ("H" == data) {
        basic.showLeds(`
            . . . . .
            . # . # .
            . . . . .
            # . . . #
            . # # # .
            `);
    } else if ("S" == data) {
        basic.showLeds(`
            . . . . .
            . # . # .
            . . . . .
            . # # # .
            # . . . #
            `);
    } else {
        basic.showString("?");
    }
});
```

## Ver también

[envía la cadena](/reference/radio/send-string), [al recibir datos](/reference/radio/on-data-received)

```package
funk
```