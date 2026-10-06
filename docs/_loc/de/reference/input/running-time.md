# Laufzeit

Find how long a program has run since it was started, in milliseconds.

```sig
input.runningTime()
```

## Rückgabewert

* die [Anzahl](/types/number) der Millisekunden seit dem Start des Programms. (eine Sekunde sind 1000 Millisekunden.)

## Beispiel: abgelaufene Zeit

When you press button `B` on the @boardname@, this program finds the number of milliseconds since the program started and shows it on the [LED screen](/device/screen).

```blocks
input.onButtonEvent(Button.B, input.buttonEventClick(), () => {
    let now = input.runningTime()
    basic.showNumber(now)
})
```

## Siehe auch

[show number](/reference/basic/show-number), [pause](/reference/basic/pause), [running time micros](/reference/input/running-time-micros)