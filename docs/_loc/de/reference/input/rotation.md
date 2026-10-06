# Drehung

Stellt fest, wie stark der Calliope mini in verschiedene Richtungen geneigt wird.

```sig
input.rotation(Rotation.Roll);
```

## ~hint

Der @boardname@ hat ein Bauteil namens **Beschleunigungsmesser** der überprüfen kann, wie sich der @boardname@ bewegt. Sieh dir dieses Video an, um zu erfahren, wie der Beschleunigungsmesser funktioniert:

https://www.youtube.com/watch?v=byngcwjO51U

## ~

## Parameter

* `Art` bedeutet, welche Richtung du überprüfst: `Rotation.Pitch` (neigen vorwärts oder rückwärts) oder `Rotation.Roll` (neigen links und rechts)

## Rückgabewert

* eine [Zahl](/types/number) bedeutet, wieviel der @boardname@ in die Richtung gekippt wird, die du abfragst. Dies ist ein Wert in Grad zwischen `-180` bis `180` entweder in der `Rotation.Pitch` oder der `Rotation.Roll` Richtung der Rotation.

## Beispiel: @boardname@-Wasserwaage

Dieses Programm hilft dir, den @boardname@ zu nivellieren, bis er waagerecht liegt. Wenn er genau waagerecht liegt, zeigt der @boardname@ einen Smiley.

Wenn du dieses Programm in einem Browser ausführst, kannst du den @boardname@ mit der Maus kippen.

```blocks
let pitch = 0;
basic.forever(() => {
    pitch = input.rotation(Rotation.Pitch);
    let roll = input.rotation(Rotation.Roll);
    if (Math.abs(pitch) < 10 && Math.abs(roll) < 10) {
        basic.showLeds(`
            . # . # .
            . . . . .
            . . . . .
            # . . . #
            . # # # .
            `);
    } else {
        basic.showLeds(`
            # . . . #
            . # . # .
            . . # . .
            . # . # .
            # . . . #
            `);
        }
    });
```

## Siehe auch

[Beschleunigung](/reference/input/acceleration), [Kompass Richtung](/reference/input/compass-heading)