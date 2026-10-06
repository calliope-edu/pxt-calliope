# Tiempo de ejecución

Encuentra cuánto tiempo ha estado funcionando un programa desde que se inició, en milisegundos.

```sig
input.runningTime()
```

## Devuelve

* the [Number](/types/number) of milliseconds since the program started. (One second is 1000 milliseconds.)

## Ejemplo: tiempo transcurrido

Cuando presionas el botón `B` en la @boardname@, este programa encuentra el número de milisegundos transcurridos desde que se inició el programa y lo muestra en la [pantalla LED](/device/screen).

```blocks
input.onButtonEvent(Button.B, input.buttonEventClick(), () => {
    let now = input.runningTime()
    basic.showNumber(now)
})
```

## Ver también

[show number](/reference/basic/show-number), [pause](/reference/basic/pause), [running time micros](/reference/input/running-time-micros)