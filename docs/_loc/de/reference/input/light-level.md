# Lichtstärke

Ermittelt die Lichtstärke (Helligkeit) am Einsatzort. Die Lichtstärke `0` bedeutet Dunkelheit und `255` bedeutet helles Licht. Der @boardname @ misst das Licht um ihn herum, indem er einige der LEDs auf der [LED-Anzeige](/device/screen) als Helligkeitssensoren verwendet.

Beim ersten Aufruf liefert diese Funktion den Wert `0`. Danach liefert sie die tatsächliche Lichtstärke. Dies liegt daran, dass der Lichtsensor (der Teil, der das Lichtniveau ermittelt) zuerst eingeschaltet werden muss.

```sig
input.lightLevel();
```

Erfahre mehr darüber, wie Licht erkannt und gemessen wird, in diesem Lichtsensor Video:

https://www.youtube.com/watch?v=TKhCr-dQMBY.

## Rückgabewert

* eine [Zahl](/types/number), die eine Lichtstärke von `0` (dunkel) bis `255` (hell) bedeutet.

## Beispiel: Lichtstärke anzeigen

Wenn du die Taste `B` drückst, zeigt dieses Programm die Lichtstärke auf der [LED-Matrix](/device/screen) an.

```blocks
input.onButtonEvent(Button.B, input.buttonEventClick(), () => {
    let level = input.lightLevel()
    basic.showNumber(level)
})
```

## Beispiel: Lichtstärke als Balkendiagramm

Dieses Programm zeigt die Lichtstärke mit einem [Balkendiagramm](/reference/led/plot-bar-graph) auf der @boardname @ LED-Anzeige an. Wenn du den @boardname @ an verschiedene Stellen mit unterschiedlichen Lichtstärken trägst, ändert sich das Balkendiagramm.

```blocks
basic.forever(() => {
    led.plotBarGraph(input.lightLevel(), 255)
})
```

## Siehe auch

[Beschleunigung](/reference/input/acceleration), [Kompassrichtung](/reference/input/compass-heading)