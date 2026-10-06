# Dado

## Introduction @unplugged

Trasformiamo il @boardname@ in un dado! (Vuoi sapere come funziona l'accelerometro? [Guarda questo video](https://youtu.be/byngcwjO51U)).

![A mini dice](https://cdn.makecode.com/blob/755f42a2ce868380446c926f957b1f1a9e53b7e3/static/calliope/tutorials/04_dice_animation.gif)

## Step 1 @fullscreen

Il programma da creare può essere diviso in 3 parti: una per rilevare il lancio (scuotimento), un'altra per scegliere un numero casuale e infine quella per mostrare il numero scelto.

Use the `||input:on shake||` block you see in the editor workspace. Questo blocco permette di definire quali blocchi eseguire quando si scuote il @boardname@.

```blocks
input.onGesture(Gesture.Shake, function() {

})
```

## Step 2 @fullscreen

Per visualizzare un numero, prendi un blocco `||basic:mostra numero||` e trascinalo all'interno del blocco `||input:quando scuotimento||`.

```blocks
input.onGesture(Gesture.Shake, function() {
    basic.showNumber(0)
})
```

## Step 3 @fullscreen

Per scegliere un numero casuale, metti un blocco matematico `||Math:valore casuale||` nel blocco `||basic:mostra numero||`.

```blocks
input.onGesture(Gesture.Shake, function() {
    basic.showNumber(randint(0, 10))
})
```

## Passaggio 4 @fullscreen

Un dado normale mostra valori da `1` a `6`. Quindi, nel blocco `||Math:valore casuale||`, specifica correttamente il minimo e il massimo!

```blocks
input.onGesture(Gesture.Shake, function() {
    basic.showNumber(randint(1, 6))
})
```

## Fase 5

Usa il simulatore per testare il programma. Funziona tutto come ti aspettavi?

## Fase 6

Se hai una scheda @boardname@ connessa al PC, clicca su `|Download|` per trasferire il programma su @boardname@!

```template
input.onGesture(Gesture.Shake, function() {})
```