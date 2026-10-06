# Pour commencer

## Marche à suivre (1ᵉ étape)

Welcome! Place the `||basic:show string||` block in the `||basic:on start||` slot. Replace the `"Hello"` text with your name. Did you see it scroll in the simulator?

```blocks
basic.showString("Micro!")
```

## Marche à suivre (2ᵉ étape)

Well, the text stopped scrolling. Place the `||basic:show string||` block in the `||input:on button pressed||` slot to scroll your name when button **A** is pressed.

```blocks
input.onButtonEvent(Button.A, input.buttonEventValue(ButtonEvent.Click), () => {
    basic.showString("Micro!")
});
```

## Marche à suivre (3ᵉ étape)

Place some blocks to display a smiley when button **B** is pressed.

Use the dropdown to find `B`!

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

## Marche à suivre (4ᵉ étape)

Place the `||basic:show number||` and `||Math:pick random||` blocks in an `||input:on shake||` block to build a dice.

```blocks
input.onGesture(Gesture.Shake, () => {
    basic.showNumber(randint(0, 10))
})
```

## Step 5

Un dé classique montre des valeurs de `1` à `6`. Donc, dans `||Math:choisir au hasard||` n'oublie pas de choisir la bonne valeur minimum et maximum!

```blocks
input.onGesture(Gesture.Shake, () => {
    basic.showNumber(randint(1, 6))
})
```

## Step 6

Si vous possédez une carte @boardname@, connectez là avec un câble USB et cliquez sur `|Télécharger|`. Save the program to the **@drivename@** drive. Cela transfère votre code sur la carte @boardname @!

## Step 7

On the @boardname@, press button **A** to scroll your text. Press button **B** to show a smiley. Shake the @boardname@ and see which number is chosen.

## Step 8

Well done! Vous avez terminé votre première activité Microsoft MakeCode.