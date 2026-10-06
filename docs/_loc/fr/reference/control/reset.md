# Remise à zéro

Réinitialise le @boardname@ et redémarre le programme.

Cette fonction revient à appuyer sur le bouton de remise à zéro à l'arrière du @boardname@.

```sig
control.reset()
```

## ~indice

**Simulateur**

La fonction **reset** ne fonctionne que sur un vrai @boardname@ et pas dans le simulateur.

## ~

## Exemple

Ce programme comptera autant que vous le souhaitez quand vous pressez le bouton `A`. Si vous êtes fatigué de compter, pressez le bouton `B` pour réinitialiser le @boardname@ et redémarrer le programme à zéro.

```blocks
let item = 0;
basic.showNumber(item);
input.onButtonEvent(Button.A, input.buttonEventValue(ButtonEvent.Down), () => {
    item = item + 1;
    basic.showNumber(item);
});
input.onButtonEvent(Button.B, input.buttonEventValue(ButtonEvent.Down), () => {
    control.reset();
});
```

## Voir Aussi

[effacer l'écran](/reference/basic/clear-screen),[partie terminée](/reference/game/game-over)