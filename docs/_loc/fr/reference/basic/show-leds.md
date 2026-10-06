# Montrer LEDs

Affiche une image sur l'[écran LED](/device/screen).

```sig
basic.showLeds(`
    . . . . .
    . # . # .
    . . # . .
    # . . . #
    . # # # .
    `
)
```

## Paramètres

* `leds` est une [chaîne](/types/string) qui contrôle quelles LEDs sont allumées ou éteintes.
* `interval` est un [nombre](/types/number) facultatif qui indique combien de millisecondes à attendre après avoir affiché une image. Si vous programmez en Blocs, `interval` est fixé à 400 millisecondes.

### ~ indice

#### Affichage LED

Regardez cette vidéo pour voir comment le @boardname@ affiche des chiffres, du texte et des images avec des [LED](/reference/led).

https://www.youtube.com/watch?v=qqBmvHD5bCw

### ~

## Exemple

Ce programme affiche une image avec la fonction `show leds`.

```blocks
basic.showLeds(`
    # # . # #
    # # . # #
    . # # # .
    . # . # .
    . # . # .
    `
)
```

## ~indice

Si vous programmez en JavaScript, `#` signifie qu'une LED est allumée et `.` qu'elle est éteinte.

## ~

## Voir Aussi

[show icon](/reference/basic/show-icon)