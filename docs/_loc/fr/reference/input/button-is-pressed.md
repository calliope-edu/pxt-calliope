# Button Is Pressed

Check whether a button is pressed right now. The @boardname@ has two buttons: button `A` and button `B`.

```sig
input.buttonIsPressed(Button.A);
```

## Paramètres

* `button` is a [String](/types/string). You should store `A` in it to check the left button, `B` to check the right button, or `A+B` to check both at the same time.

## Valeur retournée

* a [boolean](/blocks/logic/boolean) value that is `true` if the button you are checking is pressed, `false` if it is not pressed.

## Exemple

This program uses an [`||logic:if||`](/blocks/logic/if) to run one part of the program if the `A` button is pressed, and another part if it is not pressed.

```blocks
basic.forever(() => {
    let pressed = input.buttonIsPressed(Button.A)
    if (pressed) {
        // cette partie s'exécute si le bouton A est pressé
        basic.showNumber(1)
    } else {
        // cette partie s'exécute si le bouton A n'est *pas* pressé
        basic.showNumber(0)
    }
})
```

Find out how buttons provide input to the @boardname@ in this video:

https://www.youtube.com/watch?v=t_Qujjd_38o

## Voir Aussi

[on button pressed](/reference/input/on-button-pressed), [if](/blocks/logic/if), [forever](/reference/basic/forever)