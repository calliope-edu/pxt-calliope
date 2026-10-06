# Au démarrage

Un événement s'exécute lorsque le programme démarre.

```blocks
let thousand = 1000
```

`on start` est un événement spécial qui s'exécute lorsque le programme démarre, avant tout autre événement. Utilisez cet événement pour initialiser votre programme.

##  #exstart

Dans cet exemple, `on start` définit une luminosité plus faible sur l’écran et le gestionnaire de bouton affiche une chaîne de caractères.

```blocks
input.onButtonEvent(Button.A, input.buttonEventValue(ButtonEvent.Down), () => {
    basic.showString("Hello!")
})
led.setBrightness(50)
```

## Qu'en est-il en JavaScript?

Où est `on start`...?

```typescript
function onStart(){} //je n'existe pas
```

`on start` **n'existe que** dans l'éditeur de blocs. En JavaScript, tout le code s'exécute séquentiellement à partir de la première ligne.

## Hey, mes événements ont bougé! #eventsmoved

Lorsque nous transformons les blocs en JavaScript, nous avons plaçons toujours tous les déclaration d'événements (boutons, Shake,...) avant de lancer le code `on start` .

Si un bloc de `on start` s'interrompt, d'autres événements enregistrés auront également la possibilité de s'exécuter.

## #eventorder

## #examples