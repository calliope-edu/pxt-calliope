# Affiche une chaîne

Affiche une chaîne sur l'[écran LED](/device/screen). Elle glissera vers la gauche si elle est plus grande que l'écran.

```sig
basic.showString("hi!")
```

## Paramètres

* `text` est une [Chaîne](/types/string). Il peut contenir des lettres, des nombres et de la ponctuation.
* `interval` est un [nombre](/types/number) facultatif. Il indique le nombre de millisecondes avant de faire glisser la [chaîne](/types/string) à gauche d'une LED à chaque fois. De plus grands intervalles ralentissent le glissement.

## Examples:

Pour afficher le mot **Bonjour** :

```blocks
basic.showString("Bonjour")
```

Pour afficher ce qui est stocké dans une variable [chaîne](/types/string) :

```blocks
let s = "Hi"
basic.showString(s)
```

## D'autres fonctions d'affichage

Utilisez [affichage de chiffres](/reference/basic/show-number) pour afficher un chiffre sur l'écran [LED](/device/screen).

## Voir Aussi

[String](/types/string), [show number](/reference/basic/show-number)