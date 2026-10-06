# Tutorial introduttivo

## Fase 1

Welcome! Place the `||basic:show string||` block in the `||basic:on start||` slot. Replace the `"Hello"` text with your name. Did you see it scroll in the simulator?

```blocks
basic.showString("Micro!")
```

## Fase 2

Well, the text stopped scrolling. Place the `||basic:show string||` block in the `||input:on button pressed||` slot to scroll your name when button **A** is pressed.

```blocks
input.onButtonEvent(Button.A, input.buttonEventValue(ButtonEvent.Click), () => {
    basic.showString("Micro!")
});
```

## Fase 3

Place some blocks to display a smiley when button **B** is pressed.

Usa il menu a tendina per trovare `B`!

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

## Fase 4

Place the `||basic:show number||` and `||Math:pick random||` blocks in an `||input:on shake||` block to build a dice.

```blocks
input.onGesture(Gesture.Shake, () => {
    basic.showNumber(randint(0, 10))
})
```

## Fase 5

Un dado normale mostra valori da `1` a `6`. Quindi, nel blocco `||Math:valore casuale||`, specifica correttamente il minimo e il massimo!

```blocks
input.onGesture(Gesture.Shake, () => {
    basic.showNumber(randint(1, 6))
})
```

## Fase 6

Se hai una @boardname@, connetti ad essa un cavo USB e clicca `|Scarica|`. Save the program to the **@drivename@** drive. Questo trasferisce il tuo codice alla @boardname@!

## Fase 7

On the @boardname@, press button **A** to scroll your text. Press button **B** to show a smiley. Shake the @boardname@ and see which number is chosen.

## Fase 8

Well done! Hai completato la tua prima attività di Microsoft MakeCode.