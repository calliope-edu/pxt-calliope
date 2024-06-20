# Flashing Heart

## Code a Flashing Heart @unplugged

Code the lights on the micro:bit into a flashing heart animation! 💖

![Heart shape in the LEDs](/static/mb/projects/flashing-heart/sim.gif)

## {Step 1 @fullscreen}

Click on the ``||basic:Basic||`` category in the Toolbox. 
Drag the ``||basic:show leds||`` block into the ``||basic:forever||`` block. 
Then in the ``||basic:show leds||`` block, click on the squares to draw a heart design.

Place the ``||basic:show leds||`` block in the ``||basic:forever||`` block and draw a heart.

![An animation that shows how to drag a block and paint a heart](/static/calliope/tutorials/add_show_led.gif)

## {Step 2}

Drag another ``||basic:show leds||`` block underneath the first.

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

## {Step 3}

Look at the @boardname@ on the screen. Do you see a flashing heart animation? ⭐ Great job! ⭐ 

![Heart shape in the LEDs](/static/calliope/tutorials/01_flashing_heart_animation.gif)

## {Step 4}

If you have a @boardname@ device, connect it to your computer and click the ``|Download|`` button. Follow the instructions to transfer your code onto the @boardname@ and watch the hearts flash! 

## {Step 5}

Go further - try adding more ``||basic:show leds||`` blocks to create a longer animation! Learn more about how the @boardname@ lights work by watching [this video](https://youtu.be/qqBmvHD5bCw).

```template
basic.forever(function() {})
```