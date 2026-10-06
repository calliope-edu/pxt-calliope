# Erste Schritte

## Schritt 1

Herzlich willkommen! Platziere den Block `||basic:zeige Text||` in dem Slot von `||basic:beim Start ||`. Ersetze den Text `"Hallo"` durch deinen Namen. Did you see it scroll in the simulator?

```blocks
basic.showString("Micro!")
```

## Schritt 2

Well, the text stopped scrolling. Place the `||basic:show string||` block in the `||input:on button pressed||` slot to scroll your name when button **A** is pressed.

```blocks
input.onButtonEvent(Button.A, input.buttonEventValue(ButtonEvent.Click), () => {
    basic.showString("Micro!")
});
```

## Schritt 3

Place some blocks to display a smiley when button **B** is pressed.

Verwende die Dropdownliste, um `B`zu finden!

```blocks
input.onButtonEvent(Button.B, input.buttonEventValue(ButtonEvent.Click), () => {
    basic.showLeds(`
    # # . # #
    # # . # #
    . . . . .
    # . . . #
    . # # # .
    `)
})
```

## Schritt 4

Platziere die Blöcke `||basic:zeige Zahl||` und `||Math:wähle zufällige Zahl||` in einem `||input:wenn geschüttelt||` Block, um eine Würfel zu bauen.

```blocks
input.onGesture(Gesture.Shake, () => {
    basic.showNumber(randint(0, 10))
})
```

## Schritt 5

Ein typischer Würfel hat die Werte von `1` bis `6`. Also vergiss nicht in `||Math:wähle zufällige Zahl||` die richtigen Mindest- und Maximalwerte zu wählen!

```blocks
input.onGesture(Gesture.Shake, () => {
    basic.showNumber(randint(1, 6))
})
```

## Schritt 6

If you have a @boardname@, connect a USB cable to it and click `|Download|`. Save the program to the **@drivename@** drive. Dies überträgt deinen Code auf den @boardname@!

## Schritt 7

On the @boardname@, press button **A** to scroll your text. Press button **B** to show a smiley. Shake the @boardname@ and see which number is chosen.

## Schritt 8

Gut gemacht! Gut gemacht! Du hast deine erste Microsoft MakeCode-Aktivität abgeschlossen.