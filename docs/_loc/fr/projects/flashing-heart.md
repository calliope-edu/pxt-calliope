# Coeur clignotant

## Introduction @unplugged

Apprenez à utiliser les LEDs et faites un cœur clignotant ! (Voulez-vous apprendre comment fonctionnent les LED ? [Regardez cette vidéo](https://youtu.be/qqBmvHD5bCw)).


![Forme de coeur dans les LED](https://cdn.makecode.com/blob/4660572a6694f9b6b776367a67d28950f283c929/static/calliope/tutorials/01_flashing_heart_animation.gif)

## Step 1 @fullscreen

Placer le bloc `||basic:montrer leds||` dans le bloc `||basic:toujours||` et dessiner un cœur.

![An animation that shows how to drag a block and paint a heart](https://cdn.makecode.com/blob/a2f9cbba085d8b7155db3f033dbf5b823b117f3a/static/calliope/tutorials/add_show_led.gif)

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

Regardez le @boardname@ virtuel, vous devriez voir le cœur et votre dessin clignoter à l'écran.

![Forme de coeur dans les LED](https://cdn.makecode.com/blob/4660572a6694f9b6b776367a67d28950f283c929/static/calliope/tutorials/01_flashing_heart_animation.gif)

## Step 4 @fullscreen

Si vous avez un @boardname@ connecté, cliquez sur `|Télécharger|` pour transférer votre code et regarder les coeurs clignoter !

```template
basic.forever(function() {})
```