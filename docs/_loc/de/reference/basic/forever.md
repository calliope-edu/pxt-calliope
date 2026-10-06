# dauerhaft

Führt einen Teil eines Programms [im Hintergrund](/reference/control/in-background) aus.

```sig
basic.forever(() => {
})
```

Du kannst einen Teil eines Programms kontinuierlich haben, indem du es in eine **dauerhaft** Schleife legst. Die **dauerhaft** Schleife gibt jedoch dem anderen Code in Ihrem Programm </em> nach*, so dass dieser Code Zeit hat, falls nötig.</p> 

### ~ reminder

#### Ereignisbasierte Schleifen

Sowohl die **dauerhaft**-Schleife als auch die **alle...**-Schleife sind *ereignisbasierte*-Schleifen, in denen der Code als Teil einer Funktion ausgeführt wird. Diese unterscheiden sich von [for](/blocks/loops/for) und [while](/blocks/loops/while) Schleifen. Diese Schleifen sind Teil der Programmiersprache und können [pause](/blocks/loops/break) und [weiter](/blocks/loops/continue) Anweisungen enthalten. Du kannst **pause** oder **weiter** NICHT in einer **dauerhaft** Schleife oder einer **alle...** Schleife verwenden.

### ~

## Beispiele

### Example: compass

Das folgende Beispiel überprüft ständig die [Kompass Ausrichtung](/reference/input/compass-heading) und aktualisiert die LED-Anzeige mit der Richtung.

```blocks
let degrees = 0
basic.forever(() => {
    degrees = input.compassHeading()
    if (degrees < 45) {
        basic.showString("N")
    } else if (degrees < 135) {
        basic.showString("E")
    } else if (degrees < 225) {
        basic.showString("S")
    } else if (degrees < 315) {
        basic.showString("W")
    } else {
        basic.showString("N")
    }
})
```

### Beispiel: Counter

Das folgende Beispiel zeigt fortlaufend die [Zahl](/types/number), die in einer globalen Variable gespeichert ist. Wenn die Taste `A` gedrückt wird, wird die Zahl größer. Du kannst ein Programm wie dieses verwenden, um Dinge mit deinem @boardname@ zu zählen.

```blocks
let num = 0
basic.forever(() => {
    basic.showNumber(num)
})
input.onButtonEvent(Button.A, input.buttonEventClick(), () => {
    num = num + 1
})
```

## Wettbewerb um den LED-Bildschirm

Wenn verschiedene Teile eines Programms jeweils versuchen gleichzeitig etwas auf der LED-Anzeige anzuzeigen, kann es zu unerwarteten Ergebnissen kommen. Versuche mal folgendes auf deinem @boardname@:

```blocks
basic.forever(() => {
    basic.showNumber(6789)
})
input.onButtonEvent(Button.A, input.buttonEventClick(), () => {
    basic.showNumber(2)
})
```

## Siehe auch

[während](/blocks/loops/while), [im Hintergrund](/reference/control/in-background), [alle...](/reference/loops/every-interval)