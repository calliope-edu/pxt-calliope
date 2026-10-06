# Cartellino col nome

## Introduction @unplugged

Fai sapere a tutti chi sei. Mostra il nome sullo schermo a LED.

![Name scrolling on the LEDs](https://cdn.makecode.com/blob/a5eb2f776c67e070a6bd1634a4b60769dae92aac/static/calliope/tutorials/02_nametag_animation.gif)

## Fase 1

Posiziona il blocco `||basic:mostra stringa||` all'interno del blocco `||basic:per sempre||` per farlo ripetere all'infinito. Sostituisci il testo con il tuo nome.

```blocks
basic.forever(() => {
    basic.showString("Emma");
});
```

## Fase 2

Look at the simulator and make sure it shows your name on the screen.

![Name scrolling on the LEDs](https://cdn.makecode.com/blob/a5eb2f776c67e070a6bd1634a4b60769dae92aac/static/calliope/tutorials/02_nametag_animation.gif)


Place more `||basic:show string||` blocks to create your own story.

```blocks
basic.forever(() => {
    basic.showString("Emma");
    basic.showString("<3<3<3");
})
```

## Fase 4

If you have a @boardname@ connected, click `|Download|` to transfer your code and watch your name scroll!

```template
basic.forever(function() {})
```