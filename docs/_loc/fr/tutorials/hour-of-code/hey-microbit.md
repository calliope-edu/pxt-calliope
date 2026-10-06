# Hé, @boardname@!

## Marche à suivre (1ᵉ étape)

Bienvenue, codons le @boardname@! Place the `||basic:show string||` block in the `||basic:on start||` slot. Change the `"Hello"` text to be your name instead. Did you see it scroll in the simulator?.

```blocks
basic.showString("Mon nom")
```

## Marche à suivre (2ᵉ étape)

Eh bien, vous avez remarqué que le texte s’est arrêté. Place the `||basic:show string||` block in an `||input:on button pressed||` block to scroll your name whenever button **A** is pressed.

```block
input.onButtonEvent(Button.A, input.buttonEventValue(ButtonEvent.Click), () => {
    basic.showString("My Name")
});
```

## Marche à suivre (3ᵉ étape)

Ok, essayons de parler au @boardname@ en utilisant un bouton. Change the text in `||basic:show string||` to ask the question "How are you?". Add another `||basic:show string||` with "....." to show that the @boardname@ is thinking.

```block
input.onButtonEvent(Button.A, input.buttonEventValue(ButtonEvent.Click), () => {
    basic.showString("How are you?")
    basic.showString(".....");
})
```

## Marche à suivre (4ᵉ étape)

Now, make the @boardname@ give an answer with a smiley face! Find the `||basic:show leds||` and draw a smiley face on the block by clicking on the LEDs. Press button **A** in the simulator and see the @boardname@ respond to your question.

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

## Step 5

OK, demandons à @boardname@ comment il se sent en ce moment, mais par une méthode différente. Nous pouvons utiliser le geste de secousse pour poser la question. Va chercher un bloc `||input:on shake||`. Allez chercher votre bloc `||basic:show leds||` d'avant et placez-le dans le `||input:on shake||`.

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

## Step 6

Nous voulons que le @boardname@ change son ressenti à différents moments. It will have two moods, happy and sad. Go to **Logic** and get an `||logic:if then else||`. Put it in the `||input:on shake||` and move the `||basic:show leds||` into the `||logic:if then||` slot.

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

## Step 7

Duplicate the `||basic:show leds||` block (right-click, then choose Duplicate). Put the new one into the `||logic:else||` part of the `||logic:if then else||`. This time, turn that one into a frowny face.

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

## Step 8

Test it's mood by changing the condition in the `||logic:if||` from `true` to `false` and then click the **SHAKE** spot in the simulator.

## Step 9

So, to make the @boardname@ more fickle, let's give it a random mood. Find the `||math:pick random true or false||` block in **Math**. Pull it out and use it in the `||logic:if||` condition instead of the `true` value.

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

## Étape 10

Now, click the **SHAKE** spot a few times to see how the @boardname@ is feeling. Hmm, it's mood is different sometimes!

## Étape 11

Awesome job! You've completed your Microsoft MakeCode activity. If you have a @boardname@ to use, click the `|Download|` button and try your code on the board.