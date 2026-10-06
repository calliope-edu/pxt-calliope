# Pulsanti e smiley

## Introduction @unplugged

Code the buttons on the @boardname@ to show that it's happy or sad. (Want to learn how the buttons works? [Watch this video](https://youtu.be/t_Qujjd_38o)).

![Premendo i pulsanti A e B](https://cdn.makecode.com/blob/cfe0a73998a482c76a290509081ed629c18b444f/static/calliope/tutorials/03_smiley_button_animation.gif)

## Step 1 @fullscreen

Use the `||input:on button pressed||` block to run code when button **A** is pressed.

```blocks
input.onButtonEvent(Button.A, input.buttonEventValue(ButtonEvent.Click), () => { 
});
```

## Step 2 @fullscreen

Posiziona un blocco `||basic:mostra LED||` all'interno del blocco `||input:quando premi pulsante||` per visualizzare un sorriso sullo schermo. Press the **A** button in the simulator to see the smiley.

```blocks
input.onButtonEvent(Button.A, input.buttonEventValue(ButtonEvent.Click), () => { 
    basic.showLeds(`
        # # . # #
        # # . # #
        . . . . .
        # . . . #
        . # # # .`
        )
})
```

## Step 3 @fullscreen

Add `||input:on button pressed||` and `||basic:show leds||` blocks to display a frowny when button **B** is pressed.

```blocks
input.onButtonEvent(Button.B, input.buttonEventValue(ButtonEvent.Click), () => { 
    basic.showLeds(`
        # # . # #
        # # . # #
        . . . . .
        . # # # .
        # . . . #`
        );
});
```

## Passaggio 4 @fullscreen

Add a secret mode that happens when **A** and **B** are pressed together. For this case, add multiple `||basic:show leds||` blocks to create an animation.

```blocks
input.onButtonEvent(Button.AB, input.buttonEventValue(ButtonEvent.Click), () => {
    basic.showLeds(`
        . . . . .
        # . # . .
        . . . . .
        # . . . #
        . # # # .
        `)
    basic.showLeds(`
        . . . . .
        . . # . #
        . . . . .
        # . . . #
        . # # # .
        `)    
})
```

## Fase 5

Se hai un @boardname@, collegalo con il cavo USB e clicca su `|Download|` per trasferire il tuo programma. Press button **A** on your @boardname@. Try button **B** and then **A** and **B** together.

## Fase 6

Nice! Now go and show it off to your friends!

```template
//
```