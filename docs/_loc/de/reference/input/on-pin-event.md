# Pin Ereignisse

Startet einen [Ereignis-Handler](/reference/event-handler) (ein Teil des Programms, der ausgeführt wird, wenn etwas passiert, z. B. wenn ein Knopf gedrückt wird).  Dieser Handler arbeitet, wenn du den Pin `0`, `1`oder `2` gleichzeitig mit `GND` verbindest. Du kannst einen anderen Eventtyp wählen wenn du den [Tasten-Event Block](/reference/input/button-event) verwendest. Mögliche Ereignistypen sind `gedrückt` (1), `losgelassen` (2), `geklickt` (3), `lange geklickt` (4) oder `halten` (5). Wenn du diese Funktionen in einem Web-Browser verwendest, klicke auf die Pins auf dem Simulator statt auf dem Calliope mini.

Wenn du den `GND` -Pin mit einer Hand hälst und den Pin `0`, `1`, `2` oder `3` mit der anderen Hand berührst, fließt ein sehr kleiner (sicherer) Strom durch deinen Körper und zurück in den Calliope mini. Das nennt man **einen Stromkreis schließen**. Es ist, als wärst du ein großer Draht!

```sig
input.onPinTouchEvent(TouchPin.P0, input.buttonEventClick(), () => {
})
```

## ~hint

Diese Funktion funktioniert am besten, wenn der Calliope mini mit Batterien genutzt wird.

## ~

## Parameter

* `Name` bezeichnet den zu betätigenden Pin, entweder `P0`, `P1`, `P2` oder <0>P3</0>

## Pin Ereignisse in Aktion

Schau dir an, wie der Calliope mini das Drücken von einem Pin oder etwas, was an dem an einem Pin hängt, erkennt:

https://www.youtube.com/watch?v=GEpZrvbsO7o

## Beispiel: gedrückter Pin Zähler

In diesem Beispiel wird gezählt, wie oft du den Pin `P0` drückst. Jedes Mal, wenn du den Pin drückst, zeigt das Programm die Anzahl der Male auf dem Bildschirm an.

```blocks
let count = 0
basic.showNumber(count)
input.onPinTouchEvent(TouchPin.P0, input.buttonEventClick(), () => {
    count = count + 1
    basic.showNumber(count)
})
```

## Siehe auch

[@boardname@ Pins](/device/pins), [Pin is gedrückt](/reference/input/pin-is-pressed), [Analog Pin lesen](/reference/pins/analog-read-pin), [Analog Pin schreiben](/reference/pins/analog-write-pin), [Digital Pin lesen](/reference/pins/digital-read-pin), [Digital Pin schreiben](/reference/pins/digital-write-pin)