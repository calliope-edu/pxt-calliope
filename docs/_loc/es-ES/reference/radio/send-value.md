# enviar Valor

Enviar una [string]() y [number]() juntos por `radio` a otros @boardname@s. La extensión máxima de [string]() es 8 caracteres.

```sig
radio.sendValue("name", 0);
```

## Parametros

* **name**: una [cadena](/types/string) que es el nombre de la estructura.
* **value**: un [número](/types/number) que es el valor a enviar.

## ~ notas

Mira este vídeo para ver como el hardware de radio trabaja en el @boardname@:

https://www.youtube.com/watch?v=Re3H2ISfQE8

## ~

## Ejemplo: Aceleración de transmisión

Este programa envía tu @boardname@'s **aceleración** (cantidad acelerando o ralentizando) en la `x` dirección (izquierda y derecha) a otros @boardname@s. Este tipo de programa puede ser útil en un coche modelo o cohete de modelo.

```blocks
radio.setGroup(99)
input.onButtonEvent(Button.A, input.buttonEventClick(), () => {
    radio.sendValue("acc", input.acceleration(Dimension.X))
})
```

Este programa recibe la cadena y el número enviados por el último programa. Luego los muestra en la pantalla LED.

```blocks
radio.setGroup(99)
radio.onReceivedValue(function (name, value) {
    basic.showString(name);
    basic.showNumber(value);
});
```

## Ver también

[al recibir el valor](/reference/radio/on-received-value)

```package
funk
```