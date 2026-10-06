# Zurücksetzen

Setzt den @boardname @ zurück und startet das Programm erneut.

Diese Funktion ist das gleiche wie das Drücken der Reset-Taste auf dem @boardname @.

```sig
control.reset()
```

## ~hint

**Simulator**

Die **reset** Funktion funktioniert nur auf einem echten @boardname@ und nicht im Simulator.

## ~

## Beispiel

Dieses Programm zählt so hoch, wie du möchtest, wenn du die Taste `A` drückst. Wenn du das Zählen satt hast, drückst du die Taste `B` , um den @boardname @ zurückzusetzen und das Programm neu zu starten.

```blocks
let item = 0;
basic.showNumber(item);
input.onButtonEvent(Button.A, input.buttonEventValue(ButtonEvent.Down), () => {
    item = item + 1;
    basic.showNumber(item);
});
input.onButtonEvent(Button.B, input.buttonEventValue(ButtonEvent.Down), () => {
    control.reset();
});
```

## Siehe auch

[clear screen](/reference/basic/clear-screen), [game over](/reference/game/game-over)