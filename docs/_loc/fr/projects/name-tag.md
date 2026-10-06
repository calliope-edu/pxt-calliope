# Étiquette

## Introduction @unplugged

Dis à tout le monde qui tu es. Affiche ton nom sur les LEDs.

![Name scrolling on the LEDs](https://cdn.makecode.com/blob/a5eb2f776c67e070a6bd1634a4b60769dae92aac/static/calliope/tutorials/02_nametag_animation.gif)

## Marche à suivre (1ᵉ étape)

Place le bloc `||basic:afficher text||` dans le bloc `||basic:toujours||` pour le répéter en boucle. Change le texte avec ton nom.

```blocks
basic.forever(() => {
    basic.showString("Emma");
});
```

## Marche à suivre (2ᵉ étape)

Jette un œil au simulateur et assure-toi qu'il affiche bien ton nom à l'écran.

![Name scrolling on the LEDs](https://cdn.makecode.com/blob/a5eb2f776c67e070a6bd1634a4b60769dae92aac/static/calliope/tutorials/02_nametag_animation.gif)


Place plus de blocs `||basic:afficher texte||` pour créer ta propre histoire.

```blocks
basic.forever(() => {
    basic.showString("Emma");
    basic.showString("<3<3<3");
})
```

## Marche à suivre (4ᵉ étape)

Si tu as une carte @boardname@ connectée, clique sur le bouton `|Download|`  pour téléverser ton code et regarder ton nom défiler !

```template
basic.forever(function() {})
```