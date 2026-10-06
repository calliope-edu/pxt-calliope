# Stop Animation

Beenden Sie die Wiedergabeanimation und alle Animationen, auf die gewartet werden.

```sig
led.stopAnimation()
```

## Beispiel

Dieses Programm konfiguriert den `Stop-Animation` Teil des Programms, und zeigt dann eine Zeichenkette an, die du mit dem Button `B` stoppen kannst.

```blocks
input.onButtonEvent(Button.B, input.buttonEventClick(), () => {
    led.stopAnimation();
});
basic.showString("STOP ME! STOP ME! PLEASE, WON'T SOMEBODY STOP ME?");
```

## ~hint

Es ist wichtig, `Stop-Animation` einzurichten, bevor die Animation angezeigt wird, so dass der `Stop-Animation` Teil des Programms schon bereit ist.

## ~

## Siehe auch

[zeige LEDs](/reference/basic/show-leds), [zeige Symbol](/reference/basic/show-icon), [Plot](/reference/led/plot)