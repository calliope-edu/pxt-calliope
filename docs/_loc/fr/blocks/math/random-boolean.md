# Booléen aléatoire

Renvoie une valeur booléenne pseudo-aléatoire qui est soit `vraie` soit `fausse`.

```sig
Math.randomBoolean()
```

## Valeur retournée

* une valeur [booléenne](types/boolean) pseudo-aléatoire qui est soit `vraie` soit `fausse`.

## Exemple

Faites votre @boardname@ lancer une pièce quand il est tombé doucement. Faire en sorte que les LEDs affichent « pile » ou « face » comme résultat des lancées.

```blocks
input.onGesture(Gesture.FreeFall, () => {
    if (Math.randomBoolean()) {
        basic.showIcon(IconNames.Happy)
    } else {
        basic.showIcon(IconNames.Sword)
    }
})
```

## Voir Aussi

[random](/reference/math/random)