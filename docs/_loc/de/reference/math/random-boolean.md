# Boolescher Zufallswert

Gibt einen pseudozufälligen booleschen Wert zurück, der entweder `true` oder `false` ist.

```sig
Math.randomBoolean()
```

## Rückgabewert

* ein pseudozufälliger [boolean](types/boolean)-Wert, der entweder `true` oder `false` ist.

### ~ hint

#### Was ist Pseudo-Zufall?

Zufallszahlen, die auf einem Computer generiert werden, werden oft als pseudozufällig bezeichnet. Dies liegt daran, dass die Methode zur Erstellung der Zahl auf einem Anfangswert basiert, der vom Computer selbst erhalten wird. Die Formel für die zufällige Zahl könnte eine Menge mathematischer Operationen auf einem Wert verwenden, der von einem Timer oder einer anderen Eingabe abgeleitet wird. Die resultierende "zufällige" Zahl wird nicht als vollständig zufällig angesehen, weil sie mit einem Anfangswert und einer wiederholbaren Reihe von Operationen darauf begonnen hat. Deshalb wird sie als pseudozufällige Zahl bezeichnet.

Ein zufälliger Boolescher Wert wird erstellt, indem ein [zufälliger Integer](/reference/math/randint) im Bereich von `0` bis `1` ausgewählt wird.

### ~

## Beispiel

Mach mit deinem @boardname@ einen Münzwurf, wenn er sanft fallen gelassen wird. Lass die LEDs 'Kopf' oder 'Zahl' als Ergebnis des Wurfes anzeigen.

```blocks
input.onGesture(Gesture.FreeFall, () => {
    if (Math.randomBoolean()) {
        basic.showIcon(IconNames.Happy)
    } else {
        basic.showIcon(IconNames.Sword)
    }
})
```

## Siehe auch

[random int](/reference/math/randint)