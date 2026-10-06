# Im Hintergrund ausführen

Lässt einen Programmteil im Hintergrund laufen, während der Rest des Programms etwas anderes macht.

```sig
control.inBackground(() => {
})
```

## ~hint

Weitere Informationen findest du unter [@boardname @-ein reaktives System](/device/reactive). Es ist ziemlich fortgeschritten!

## ~

## Beispiel

Dieses Programm zeigt, wie im Hintergrund der Wert der Variable `Num`angezeigt werden kann, während ein anderer Teil (`Bei Tastendruck`) den Variableninhalt ändert.

```blocks
let num = 0
control.inBackground(() => {
    while (true) {
        basic.showNumber(num)
        basic.pause(100)
    }
})
input.onButtonEvent(Button.A, input.buttonEventValue(ButtonEvent.Down), () => {
    num++;
})
```

Dieses Programm erledigt das Gleiche, aber auf eine üblichere Weise, mit einer `Forever` -Schleife.

```blocks
let num = 0
basic.forever(() => {
    basic.showNumber(num)
})
input.onButtonEvent(Button.A, input.buttonEventValue(ButtonEvent.Down), () => {
    num++;
})
```

## Siehe auch

[while](/blocks/loops/while), [forever](/reference/basic/forever), [on button pressed](/reference/input/on-button-pressed)