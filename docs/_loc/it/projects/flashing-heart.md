# Cuore lampeggiante

## Introduction @unplugged

Learn how to use the LEDs and make a flashing heart! (Want to learn how lights work? [Watch this video](https://youtu.be/qqBmvHD5bCw)).


![Figura del cuore nei LED](https://cdn.makecode.com/blob/4660572a6694f9b6b776367a67d28950f283c929/static/calliope/tutorials/01_flashing_heart_animation.gif)

## Step 1 @fullscreen

Posiziona il blocco `||basic:mostra LED||` all'interno del blocco `||basic:per sempre||` e disegna un cuore.

![Un'animazione che mostra come trascinare un blocco e disegnare un cuore](https://cdn.makecode.com/blob/a2f9cbba085d8b7155db3f033dbf5b823b117f3a/static/calliope/tutorials/add_show_led.gif)

## Step 2 @fullscreen

Place another `||basic:show leds||` block. You can leave it blank and draw what you want.

```blocks
basic.forever(function() {
    basic.showLeds(`
        . # . # .
        # # # # #
        # # # # #
        . # # # .
        . . # . .`);
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        . . . . .`);
})
```

## Step 3 @fullscreen

Guarda il simulatore della scheda @boardname@, dovresti vedere il cuore e il tuo disegno lampeggiare sullo schermo.

![Figura del cuore nei LED](https://cdn.makecode.com/blob/4660572a6694f9b6b776367a67d28950f283c929/static/calliope/tutorials/01_flashing_heart_animation.gif)

## Passaggio 4 @fullscreen

If you have a @boardname@ connected, click `|Download|` to transfer your code and watch the hearts flash!

```template
basic.forever(function() {})
```