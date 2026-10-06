# toujours

Laisse s'exécuter une partie d'un programme [en arrière-plan](/reference/control/in-background).

```sig
basic.forever(() => {
})
```

Vous pouvez avoir une partie d'un programme qui s'exécute en continu en la plaçant dans une boucle **toujours**. La boucle **toujours** va également *céder* le temps d'exécution au reste du code de votre programme cependant, permettant ainsi à ce code d'avoir du temps pour s'exécuter lorsque nécessaire.

### ~ reminder

#### Event-based loops

La boucle **toujours** et la boucle **chaque** sont des boucles *basées sur des événements* où le code à l'intérieur est exécuté dans le cadre d'une fonction. These are different from the [for](/blocks/loops/for) and [while](/blocks/loops/while) loops. Those are loops are part of the programming language and can have [break](/blocks/loops/break) and [continue](/blocks/loops/continue) statements in them. Vous ne pouvez PAS utiliser **break** ou **continue** dans une boucle **toujours** ou **chaque**.

### ~

## Exemples

### Example: compass

L'exemple suivant vérifie en permanence le [cap de la boussole](/reference/input/compass-heading) et met à jour l'écran avec la bonne direction.

```blocks
let degrees = 0
basic.forever(() => {
    degrees = input.compassHeading()
    if (degrees < 45) {
        basic.showString("N")
    } else if (degrees < 135) {
        basic.showString("E")
    } else if (degrees < 225) {
        basic.showString("S")
    } else if (degrees < 315) {
        basic.showString("O")
    } else {
        basic.showString("N")
    }
})
```

### Exemple : compteur

L'exemple suivant affiche en permanence des [nombres](/types/number) stockés dans une variable globale. Lorsque vous pressez le bouton `A`, le nombre augmente. Vous pouvez utiliser un programme comme celui-ci pour compter des choses avec votre @boardname@.

```blocks
let num = 0
basic.forever(() => {
    basic.showNumber(num)
})
input.onButtonEvent(Button.A, input.buttonEventClick(), () => {
    num = num + 1
})
```

## Conflits d'affichage sur l'écran LED

Si les différentes parties d'un programme essaient toutes d'afficher quelque chose sur l'écran LED au même moment, il peut se produire des résultats inattendus. Essayez ceci sur votre @boardname@ :

```blocks
basic.forever(() => {
    basic.showNumber(6789)
})
input.onButtonEvent(Button.A, input.buttonEventClick(), () => {
    basic.showNumber(2)
})
```

## Voir Aussi

[while](/blocks/loops/while), [in background](/reference/control/in-background), [every](/reference/loops/every-interval)