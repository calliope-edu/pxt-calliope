# Booléen aléatoire

Renvoie une valeur booléenne pseudo-aléatoire qui est soit `vraie` soit `fausse`.

```sig
Math.randomBoolean()
```

## Valeur retournée

* une valeur [booléenne](types/boolean) pseudo-aléatoire qui est soit `vraie` soit `fausse`.

### ~ indice

#### What is pseudo-random?

Random numbers generated on a computer are often called pseudo-random. This because the method to create the number is based on some starting value obtained from the computer itself. The formula for the random number could use some amount of mathematical operations on a value derived from a timer or some other input. The resulting "random" number isn’t considered entirely random because it started with some initial value and a repeatable set of operations on it. Therefore, it’s called a pseudo-random number.

A random boolean is created by choosing a [random int](/reference/math/randint) ranging from `0` to `1`.

### ~

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

[random int](/reference/math/randint)