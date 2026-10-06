# Montrer icône

Affiche l'icône sélectionnée sur l'écran LED

```sig
basic.showIcon(IconNames.Heart)
```

## Paramètres

* `icon`, l'identifiant de l'icône à afficher
* `interval` (optional), the time to display in milliseconds. default is 600.

## Exemple

Ce programme affiche un visage heureux puis un visage triste en utilisant la fonction `show icon`, espacé par une pause d'une seconde.

```blocks
basic.showIcon(IconNames.Happy)
basic.pause(1000)
basic.showIcon(IconNames.Sad)
```

## Cœur qui bat

Vous pouvez créer un cœur qui bat en utilisant le bloc "toujours" ainsi :

```blocks
basic.forever(function () {
    basic.showIcon(IconNames.Heart)
    basic.showIcon(IconNames.SmallHeart)
})
```

## Cœur qui bat rapidement

Vous pouvez ralentir l'animation précédente en insérant un bloc pause :

```block
basic.pause(1000)
```

... mais comment l'accélérer ?

Vous pouvez changer la valeur de pause par défaut, déterminée par le paramètre `interval`, pour qu'il soit plus petit que `600` en le modifiant dans l'éditeur JavaScript.

This JavaScript code creates a crazy fast heart beat! Did you know that a hamster's heart beats at a rate this fast?

```typescript
basic.forever(function () {
    basic.showIcon(IconNames.Heart, 60)
    basic.showIcon(IconNames.SmallHeart, 60)
})
```

## Voir Aussi

[showLeds](/reference/basic/show-leds)