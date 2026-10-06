# sende Zahl

Sendet eine [Zahl](/types/number) an andere @boardname@s, die über `Funk` miteinander verbunden sind.

```sig
radio.sendNumber(0);
```

## Parameter

* **Wert**: eine [Zahl](/types/number), die gesendet werden soll.

## ~ hint

Watch this video to see how the radio hardware works on the @boardname@:

https://www.youtube.com/watch?v=Re3H2ISfQE8

## ~

## Beispiele

### Broadcasting acceleration

Dieses Beispiel sendet den Wert der `Beschleunigung` in der `x` Richtung (links und rechts) deines @boardname@s an andere @boardname@s. Diese Art Programm könnte in einem Modellfahrzeug oder einer Modellrakete nützlich sein.

```blocks
input.onButtonEvent(Button.A, input.buttonEventClick(), () => {
    radio.sendNumber(input.acceleration(Dimension.X))
})
```

### Lichtstärkesender

In diesem Beispiel wird der Pegel des Lichts um dich herum übertragen. You can do some interesting things with it if you use it along with the [on received number](/reference/radio/on-received-number) example.

```blocks
radio.setGroup(99)
basic.forever(() => {
    let level = input.lightLevel()
    radio.sendNumber(level)
})
```

## Siehe auch

[on received number](/reference/radio/on-received-number)

```package
Funk
```