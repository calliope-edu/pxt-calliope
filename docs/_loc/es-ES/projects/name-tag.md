# Etiqueta de nombre

## Introduction @unplugged

Tell everyone who you are. Show you name on the LEDs.

![Desplazamiento del nombre en los LEDs](https://cdn.makecode.com/blob/a5eb2f776c67e070a6bd1634a4b60769dae92aac/static/calliope/tutorials/02_nametag_animation.gif)

## Paso 1

Place the `||basic:show string||` block in the `||basic:forever||` block to repeat it. Change the text to your name.

```blocks
basic.forever(() => {
    basic.showString("Emma");
});
```

## Paso 2

Look at the simulator and make sure it shows your name on the screen.

![Desplazamiento del nombre en los LEDs](https://cdn.makecode.com/blob/a5eb2f776c67e070a6bd1634a4b60769dae92aac/static/calliope/tutorials/02_nametag_animation.gif)


Place more `||basic:show string||` blocks to create your own story.

```blocks
basic.forever(() => {
    basic.showString("Emma");
    basic.showString("<3<3<3");
})
```

## Step 4

If you have a @boardname@ connected, click `|Download|` to transfer your code and watch your name scroll!

```template
basic.forever(function() {})
```