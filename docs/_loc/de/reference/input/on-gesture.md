# Bei Geste

Startet einen [Ereignishandler](/reference/event-handler) (Teil des Programms, der ausgeführt wird, wenn etwas passiert). Dieser Handler wird gestartet, wenn du eine **Geste** ausführst (wie das Schütteln des @boardname@).

```sig
input.onGesture(Gesture.Shake,() => {
})
```

## Parameter

* `Geste` bedeutet, wie du den @boardname@ hälst oder bewegst. Dies kann sein `schütteln`, `Logo nach oben`, `Logo nach unten`, `LED-ANzeige nach oben`, `LED-ANzeige nach unten`, `links kippen`, `rechts kippen`, `freier Fall`, `3g` oder `6g`'.

## Beispiel: Zufallszahl

Dieses Programm zeigt eine Zahl von `2` bis `9` an, wenn du den Calliope mini schüttelst.

```blocks
input.onGesture(Gesture.Shake,() => {
    let x = randint(2, 9)
    basic.showNumber(x)
})
```

## Siehe auch

[ist Tipp-Geste](/reference/input/is-gesture)