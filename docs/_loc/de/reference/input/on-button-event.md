# Tasten Ereignisse

Startet einen [Ereignishandler](/reference/event-handler) (ein Teil des Programms, der ausgeführt wird, wenn etwas passiert, z. B. wenn ein Knopf gedrückt wird). Diese Routine funktioniert, wenn Taste `A` oder `B` gedrückt wird bzw. `A` und `B` zusammen gedrückt werden. Wenn du diese Funktion in einem Webbrowser verwendest, klicke auf die Taster auf dem Bildschirm anstelle der auf dem @boardname@. Mögliche Ereignistypen sind `gedrückt` (1), `losgelassen` (2), `geklickt` (3), `lange geklickt` (4) oder `halten` (5).

Wenn du diese Funktion in einem Webbrowser verwendest, klicke auf die Taster auf dem Bildschirm anstelle der auf dem @boardname@.

* Für den Knopf `A` oder `B`: Dieser Handler funktioniert, wenn der Knopf nach unten gedrückt und innerhalb einer Sekunde freigegeben wird.
* Für `A` und `B` gemeinsam: Dieser Handler funktioniert wenn `A` und `B` beide gedrückt werden und einer von ihnen innerhalb von 1,5 Sekunden nach dem Drücken der zweiten Taste freigegeben wird.

```sig
input.onButtonEvent(Button.A, input.buttonEventClick(), () => {})
```

Erfahre in diesem Video, wie die Eingabe durch Knöpfe den Calliope mini steuern können.

https://www.youtube.com/watch?v=t_Qujjd_38o

## Beispiel: Tastendruck zählen

In diesem Beispiel wird gezählt, wie oft du die Taste `A` drückst. Jedes Mal, wenn du die Taste drückst, zeigt die [LED-Matrix](/device/screen) die immer größere werdende Variable `Count` an.

```blocks
let count = 0
basic.showNumber(count)
input.onButtonEvent(Button.A, input.buttonEventClick(), () => {
    count++;
    basic.showNumber(count);
})
```

## Beispiel: Würfel werfen

In diesem Beispiel wird eine Zahl von 1 bis 6 angezeigt, wenn du den Knopf `B` drückst.

```blocks
input.onButtonEvent(Button.B, input.buttonEventClick(), () => {
    let dice = randint(0, 5) + 1
    basic.showNumber(dice)
})
```

## ~hint

Dieses Pogramm addiert `1` zu `einer zufälligen Zahl zwischen 0 und 5`, so dass die Zahlen auf dem Würfel korrekt sind. Ansonsten würde manchmal auch <0>0</0> angezeigt werden. Andernfalls würden manchmal eine `0` angezeigt werden.

## ~

## Siehe auch

[Knopf wird gedrückt](/reference/input/button-is-pressed), [dauerhaft](/reference/basic/forever), [Zufall](/blocks/math), [Knopf Ereignisblock](/reference/input/button-event)