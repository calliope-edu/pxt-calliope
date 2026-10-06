# Dé

## Introduction @unplugged

Transformons la carte @boardname@ en dé ! (Tu veux savoir comment fonctionne l'accéléromètre ? [Regarde cette vidéo](https://youtu.be/byngcwjO51U)).

![A mini dice](https://cdn.makecode.com/blob/755f42a2ce868380446c926f957b1f1a9e53b7e3/static/calliope/tutorials/04_dice_animation.gif)

## Step 1 @fullscreen

Nous avons besoins de 3 bouts de code: un pour détecter un lancer (secouer), un autre pour choisir un nombre aléatoire, et un dernier pour montrer le nombre.

Use the `||input:on shake||` block you see in the editor workspace. Il exécute du code lorsque vous secouez le @boardname@.

```blocks
input.onGesture(Gesture.Shake, function() {

})
```

## Step 2 @fullscreen

Attrape un bloc `||base:montrer nombre||` et insère-le à l'intérieur du bloc `||Entrée:lorsque secoueur||` pour afficher un nombre.

```blocks
input.onGesture(Gesture.Shake, function() {
    basic.showNumber(0)
})
```

## Step 3 @fullscreen

Place un bloc `||Math:choisir au hasard||` dans le bloc `||base:montrer nombre||` pour choisir un nombre au hasard.

```blocks
input.onGesture(Gesture.Shake, function() {
    basic.showNumber(randint(0, 10))
})
```

## Step 4 @fullscreen

Un dé classique montre des valeurs de `1` à `6`. Donc, dans `||Math:choisir au hasard||` n'oublie pas de choisir la bonne valeur minimum et maximum!

```blocks
input.onGesture(Gesture.Shake, function() {
    basic.showNumber(randint(1, 6))
})
```

## Step 5

Utilise le simulateur pour essayer ton code. Montre-t-il le nombre que tu attendais?

## Step 6

Si tu as une carte @boardname@ connectée, clique sur le bouton `|Télécharger|` pour téléverser ton code dans ta carte @boardname@!

```template
input.onGesture(Gesture.Shake, function() {})
```