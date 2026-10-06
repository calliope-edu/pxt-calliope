# on Data Received

Run part of a program when the @boardname@ receives a [number](/types/number) or [string](/types/string) over radio.

```sig
radio.onDataReceived(() => { });
```

### ~ alert

#### API Obsoleta

¡Esta API ha quedado obsoleta! Usa [al recibir número](/reference/radio/on-received-number) en su lugar.

### ~

```sig
radio.onDataReceived(() => { });
```

## Ejemplo

Este programa sigue enviando números que indican la velocidad a la que la @boardname@ se está ralentizando o acelerando. También recibe números con la misma información de @boardname@s cercanas. Muestra estos números como un [gráfico de barras](/reference/led/plot-bar-graph).

```blocks
basic.forever(() => {
    radio.sendNumber(input.acceleration(Dimension.X));
})
radio.onDataReceived(() => {
    led.plotBarGraph(radio.receiveNumber(), 1023);
})
```

## Ver también

[al recibir número](/reference/radio/on-received-number), [envía el número](/reference/radio/send-number), [establece el grupo](/reference/radio/set-group)

```package
funk
```