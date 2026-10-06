# enviar Número

Broadcast a [number](/types/number) to other @boardname@s connected via `radio`.

```sig
radio.sendNumber(0);
```

## Parameters

* **value**: a [number](/types/number) to send.

## ~ notas

Mira este vídeo para ver como el hardware de radio trabaja en el @boardname@:

https://www.youtube.com/watch?v=Re3H2ISfQE8

## ~

## Ejemplos

### Broadcasting acceleration

This example broadcasts the value of your @boardname@'s `acceleration` in the `x` direction (left and right) to other @boardname@s. This kind of program might be useful in a model car or model rocket.

```blocks
input.onButtonEvent(Button.A, input.buttonEventClick(), () => {
    radio.sendNumber(input.acceleration(Dimension.X))
})
```

### Light level sender

This example broadcasts the level of the light around it. You can do some interesting things with it if you use it along with the [on received number](/reference/radio/on-received-number) example.

```blocks
radio.setGroup(99)
basic.forever(() => {
    let level = input.lightLevel()
    radio.sendNumber(level)
})
```

## Ver también

[on received number](/reference/radio/on-received-number)

```package
funk
```