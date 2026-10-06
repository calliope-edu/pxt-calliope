# Hallo, @boardname@!

## Schritt 1

Willkommen, lass uns den @boardname@ programmieren! Platziere den Block `||basic:zeige Text||` in dem Slot von `||basic:beim Start ||`. Ändere den Text `"Hello"` zu deinem Namen. Siehst du ihn im Simulator durch scrollen?

```blocks
basic.showString("My Name")
```

## Schritt 2

Nun hast du sicher bemerkt, dass der Text gestoppt wurde. Place the `||basic:show string||` block in an `||input:on button pressed||` block to scroll your name whenever button **A** is pressed.

```block
input.onButtonEvent(Button.A, input.buttonEventValue(ButtonEvent.Click), () => {
    basic.showString("My Name")
});
```

## Schritt 3

Ok, lass uns versuchen, mit dem @boardname@ über eine Schaltfläche zu kommunizieren. Ändere den Text in `||basic:zeige Text||` zur Frage "Wie geht es dir?". Füge noch ein weiteres `||basic:zeige Text||` mit "....." hinzu, um zu zeigen, dass der @boardname@ denkt.

```block
input.onButtonEvent(Button.A, input.buttonEventValue(ButtonEvent.Click), () => {
    basic.showString("How are you?")
    basic.showString(".....");
})
```

## Schritt 4

Nun lass den @boardname@ Antwort mit einem Smileygesicht geben! Finde `||basic:zeige Leds||` und zeichne einen Smiley auf den Block, indem du auf die LEDs klickst. Press button **A** in the simulator and see the @boardname@ respond to your question.

```block
input.onButtonEvent(Button.A, input.buttonEventValue(ButtonEvent.Click), () => {
    basic.showString("How are you?")
    basic.showString(".....");
    basic.showLeds(`
    # # . # #
    # # . # #
    . . . . .
    # . . . #
    . # # # .
    `)
})
```

## Schritt 5

OK, fragen wir @boardname@, wie er sich gerade jetzt fühlt, aber mit einer anderen Methode. Wir können die Schüttelgeste benutzen, um die Frage zu stellen. Hol einen `||input:wenn geschüttelt||` Block. Schnapp dir den vorigen Block `||basic:zeige Leds||` und steck ihn in den `||input:wenn geschüttelt||`.

```block
input.onGesture(Gesture.Shake, () => {
    basic.showLeds(`
    # # . # #
    # # . # #
    . . . . .
    # . . . #
    . # # # .
    `)
})
```

## Schritt 6

Wir wollen, dass der @boardname@ die Stimmung zu verschiedenen Zeiten verändert. Er wird zwei Stimmungen haben, glücklich und traurig. Go to **Logic** and get an `||logic:if then else||`. Stecke ihn in `||input:wenn geschüttelt||` und schiebe nun `|||basic:zeige LEDs|||` in den `|||logic:wenn dann|||` Steckplatz.

```block
input.onGesture(Gesture.Shake, () => {
    if (true) {
        basic.showLeds(`
            # # . # #
            # # . # #
            . . . . .
            # . . . #
            . # # # .
            `)
    } else {

    }
})
```

## Schritt 7

Dupliziere den Block `||basic:zeige LEDs||` (Rechtsklick, dann die Option Duplizieren). Der neue Eintrag wird in den `||logic:ansonsten||`-Teil des `||logic:wenn dann ansonsten||` eingefügt. Dieses Mal verwandelst du es in ein trauriges Smiley.

```block
input.onGesture(Gesture.Shake, () => {
    if (true) {
        basic.showLeds(`
            # # . # #
            # # . # #
            . . . . .
            # . . . #
            . # # # .
            `)
    } else {
        basic.showLeds(`
            # # . # #
            # # . # #
            . . . . .
            . # # # .
            # . . . #
            `)
    }
})
```

## Schritt 8

Test it's mood by changing the condition in the `||logic:if||` from `true` to `false` and then click the **SHAKE** spot in the simulator.

## Schritt 9

So. Um den @boardname@ noch launischer zu machen, geben wir ihm eine zufällige Stimmung. Find the `||math:pick random true or false||` block in **Math**. Ziehen ihn heraus und verwenden ihn in der Bedingung `||logic:wenn||` anstelle des Wertes `wahr`.

```block
input.onGesture(Gesture.Shake, () => {
    if (Math.randomBoolean()) {
        basic.showLeds(`
            # # . # #
            # # . # #
            . . . . .
            # . . . #
            . # # # .
            `)
    } else {
        basic.showLeds(`
            # # . # #
            # # . # #
            . . . . .
            . # # # .
            # . . . #
            `)
    }
})
```

## Schritt 10

Now, click the **SHAKE** spot a few times to see how the @boardname@ is feeling. Hmm, seine Stimmung ist manchmal anders!

## Schritt 11

Großartige Arbeit! Du hast deine Microsoft MakeCode Aktivität abgeschlossen. If you have a @boardname@ to use, click the `|Download|` button and try your code on the board.