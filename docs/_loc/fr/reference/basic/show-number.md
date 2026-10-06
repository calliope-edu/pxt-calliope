# Afficher un nombre

Affiche un nombre sur l'[écran LED](/device/screen). Il glissera vers la gauche s'il y a plus d'un chiffre.

```sig
basic.showNumber(2)
```

## Paramètres

* `value` est un [Nombre](/types/number). S'il ne s'agit pas d'un nombre à un seul chiffre, alors il défilera sur l'affichage.
* `interval` est un [nombre](/types/number) facultatif. Il indique le nombre de millisecondes avant de faire glisser la `valeur` à gauche d'une LED à chaque fois. De plus grands intervalles ralentissent le glissement.

## Examples:

Pour afficher le nombre 10 :

```blocks
basic.showNumber(10)
```

Pour afficher le nombre stocké dans une variable :

```blocks
let x = 1
basic.showNumber(x)
```

## Exemple : compter jusque 5

Cet exemple utilise une boucle [for](/blocks/loops/for) pour afficher des nombres de `0` à `5` sur l'écran :

```blocks
for (let i = 0; i < 6; i++) {
    basic.showNumber(i)
    basic.pause(200)
}
```

## Avancé

Si `value` est `NaN` (not a number), `?` s'affiche.

## D'autres fonctions d'affichage

Utilisez [afficher une chaîne de caractères](/reference/basic/show-string) pour afficher une [chaîne de caractères](/types/string) composée de lettres à l'écran.

## Voir Aussi

[afficher une chaîne de caractères](/reference/basic/show-string), [Chiffre](/types/number), [mathématiques](/blocks/math)