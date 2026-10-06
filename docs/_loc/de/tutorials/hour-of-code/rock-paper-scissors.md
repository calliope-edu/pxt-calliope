# Schere-Stein-Papier

## Schritt 1

Wir wollen, dass der @boardname@ Schere, Stein oder Papier wählt, wenn du ihn schüttelst. Platziere einen `||input:wenn geschüttelt||` Block, so dass er einen Teil eines Programms ausführt, wenn du den @boardname@ schüttelst.

```blocks
input.onGesture(Gesture.Shake, () => {

})
```

## Schritt 2

Füge eine Variable `tool` hinzu, um eine Zufallszahl zu speichern, die mit `||math:pick random||` berechnet wurde.

Wenn du den @boardname@ schüttelst, sollte er eine Zufallszahl von `0` bis `2` ziehen und in der Variable `tool` speichern. (Diese Variable trägt den Namen `tool` weil Stein, Papier und Schere sind die Werkzeuge, mit denen du deine Freunde herausfordern kannst!)

```blocks
let tool = 0;
input.onGesture(Gesture.Shake, () => {
    tool = Math.randomRange(0, 3)
})
```

In einem späteren Schritt wird jeder der möglichen Zahl (`0`, `1`, or `2`) ein eigenes Bild zugeordnet. Das Bild wird auf der LED-Anzeige angezeigt, wenn die dazugehörige Zahl ausgewählt wird.

## Schritt 3

Setzt einen Block `if` unter den Block `||math:pick random||` und prüfe, ob `tool` gleich `0` ist.

```blocks
let tool = 0;
input.onGesture(Gesture.Shake, () => {
    let tool = Math.randomRange(0, 3)
    if (tool == 0) {
    }
})
```

## Schritt 4

Füge dem `if`-Block einen `||basic:show leds||`-Block hinzu, der ein Bild von einem Stück Papier dargestellt.

```blocks
let tool = 0;
input.onGesture(Gesture.Shake, () => {
    let tool =  Math.randomRange(0, 2)
    if (tool == 0) {
        basic.showLeds(`
            # # # # #
            # . . . #
            # . . . #
            # . . . #
            # # # # #
            `)
    }
})
```

## Schritt 5

Füge einen `else if`-Block zum `if`Block hinzu und prüfe, ob `tool` ist gleich `1`.

```blocks
let tool = 0;
input.onGesture(Gesture.Shake, () => {
    let tool =  Math.randomRange(0, 2)
    if (tool == 0) {
        basic.showLeds(`
            # # # # #
            # . . . #
            # . . . #
            # . . . #
            # # # # #
            `)
    } else if (tool == 1) {
    }
})
```

## Schritt 6

Platziere ein `||basiczeige LEDs||`-Block unter dem ansonsten und zeichne ein Bild von einem **Stein** auf den Bildschirm.

```blocks
let tool = 0;
input.onGesture(Gesture.Shake, () => {
    let tool =  Math.randomRange(0, 2)
    if (tool == 0) {
        basic.showLeds(`
            # # # # #
            # . . . #
            # . . . #
            # . . . #
            # # # # #
            `)
    } else if (tool == 1) {
        basic.showLeds(`
            . . . . .
            . # # # .
            . # # # .
            . # # # .
            . . . . .
            `)
    }
})
```

## Schritt 7

Füge einen `||basic:show leds||`-Block mit einem Scherenbild zum `else`-Teil hinzu.

Du brauchst nicht zu prüfen, ob `tool` `2` ist, weil `2` die einzige Zahl ist, die von `0`, `1` und `2` übrig bleibt. Deshalb kannst du ein `else` anstelle eines `else if` verwenden.

```blocks
let tool = 0;
input.onGesture(Gesture.Shake, () => {
    let tool = randint(0, 3)
    if (tool == 0) {
        basic.showLeds(`
            # # # # #
            # . . . #
            # . . . #
            # . . . #
            # # # # #
            `)
    } else if (tool == 1) {
        basic.showLeds(`
            . . . . .
            . # # # .
            . # # # .
            . # # # .
            . . . . .
            `)
    } else {
        basic.showLeds(`
            # # . . #
            # # . # .
            . . # . .
            # # . # .
            # # . . #
            `)
    }
})

```

## Schritt 8

Dein Spiel ist fertig! Hol deine Freunde zusammen und spiele Schere-Stein-Papier!