# receive Number

Receive the next number sent by a @boardname@ in the same `radio` group.

```sig
radio.receiveNumber();
```

### ~ alert

#### API Obsoleta

¡Esta API ha quedado obsoleta! Usa [al recibir número](/reference/radio/on-received-number) en su lugar.

### ~

## Devuelve

* the first [number](/types/number) that the @boardname@ received. If it did not receive any numbers, this function will return `0`.

## Ejemplo: Receptor de número simple

Este ejemplo recibe el número transmitido por otra @boardname@ y lo muestra como un gráfico de barras.

```blocks
radio.onDataReceived(() => {
    led.plotBarGraph(radio.receiveNumber(), 1023);
})
```

## Ejemplo: Receptor de nivel de luz

Este ejemplo muestra el nivel de luz del [ejemplo de emisor de nivel de luz](/reference/radio/send-number) como un número.

```blocks
radio.setGroup(99)
basic.forever(() => {
    let level = radio.receiveNumber()
    basic.showNumber(level)
})
```

## Ejemplo: Mailbot

Este ejemplo recibe el nivel de luz del [ejemplo de emisor de nivel de luz](/reference/radio/send-number) y muestra una cadena de texto como **ALERTA** si el nivel de luz se vuelve mucho más brillante. Para saber cuándo llega el correo, puedes colocar el emisor de nivel de luz en tu buzón y te avisará cuando alguien abra la caja. También puedes probarlo con una caja normal, como un regalo para un amigo.

```blocks
radio.setGroup(99)
let max = 0
basic.forever(() => {
    let level = radio.receiveNumber()
    if (level > max) {
        max = level
    }
    if (max > 10) {
        basic.showString("ALERTA")
    }
})
```

## Ver también

[enviar número](/reference/radio/send-number), [al recibir datos](/reference/radio/on-data-received)

```package
funk
```