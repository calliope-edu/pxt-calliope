# Würfel

## Anleitung @unplugged

Lass uns den @boardname@ in einen Würfel verwandeln! (Möchtest du lernen, wie der Beschleunigungssensor funktioniert? [Sieh dir dieses Video an](https://youtu.be/byngcwjO51U)).

![Ein Mini-Würfel](https://cdn.makecode.com/blob/755f42a2ce868380446c926f957b1f1a9e53b7e3/static/calliope/tutorials/04_dice_animation.gif)

## Schritt 1 @fullscreen

Wir brauchen drei Codestücke: eines um einen Wurf zu erkennen (Schütteln), ein anderes, um eine zufällige Zahl zu wählen, und dann eines, um die Nummer anzuzeigen.

Platziere den `||input:wenn geschüttelt||`-Block auf den Editor-Arbeitsbereich. Es durchläuft den Code, wenn du den @boardname@ schüttelt.

```blocks
input.onGesture(Gesture.Shake, function() {

})
```

## Schritt 2 @fullscreen

Nimm einen `||basic:zeige Zahl||` Block und platziere diesen innerhalb des `||input:wenn geschüttelt||` Blocks, um eine Zahl anzuzeigen.

```blocks
input.onGesture(Gesture.Shake, function() {
    basic.showNumber(0)
})
```

## Schritt 3 @fullscreen

Setze einen `||Math:wähle zufällige Zahl||` Block in den `||basic:zeige Zahl||` Block, um eine zufällige Zahl auszuwählen.

```blocks
input.onGesture(Gesture.Shake, function() {
    basic.showNumber(randint(0, 10))
})
```

## Schritt 4 @fullscreen

Ein typischer Würfel hat die Werte von `1` bis `6`. Also vergiss nicht in `||Math:wähle zufällige Zahl||` die richtigen Mindest- und Maximalwerte zu wählen!

```blocks
input.onGesture(Gesture.Shake, function() {
    basic.showNumber(randint(1, 6))
})
```

## Schritt 5

Verwende den Simulator, um dein Programm auszuprobieren. Zeigt er die von dir erwartete Zahl an?

## Schritt 6

Wenn du einen @boardname@ angeschlossen hast, klicke auf `|Herunterladen|`, um deinen Code auf den @boardname@ zu übertragen!

```template
input.onGesture(Gesture.Shake, function() {})
```