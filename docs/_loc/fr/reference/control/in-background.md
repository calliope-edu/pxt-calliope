# Exécuter en arrière-plan

Exécute une partie d'un programme pendant que le reste de celui-ci fait quelque chose d'autre.

```sig
control.inBackground(() => {
})
```

## ~indice

Pour plus d'information, lisez [Le @boardname@ - un système réactif](/device/reactive). C'est assez avancé !

## ~

## Exemple

Ce programme montre comment l'exécution en arrière-plan peut dire ce qui est stocké dans une variable comme `num`, pendant qu'une autre partie (`sur pression d'un bouton`) change ce qui y est stocké.

```blocks
let num = 0
control.inBackground(() => {
    while (true) {
        basic.showNumber(num)
        basic.pause(100)
    }
})
input.onButtonEvent(Button.A, input.buttonEventValue(ButtonEvent.Down), () => {
    num++;
})
```

Ce programme fait la même chose, mais d'une façon plus habituelle, avec une boucle `forever`.

```blocks
let num = 0
basic.forever(() => {
    basic.showNumber(num)
})
input.onButtonEvent(Button.A, input.buttonEventValue(ButtonEvent.Down), () => {
    num++;
})
```

## Voir Aussi

[while](/blocks/loops/while), [forever](/reference/basic/forever), [sur pression d'un bouton](/reference/input/on-button-pressed)