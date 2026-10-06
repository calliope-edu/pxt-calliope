# Pause

Met en pause le programme pendant le nombre de millisecondes spécifiées. Vous pouvez utiliser cette fonction pour ralentir votre programme.

```sig
basic.pause(400)
```

## Paramètres

* `ms` est le nombre de millisecondes que vous voulez mettre en pause (100 millisecondes = 1/10 de seconde, et 1000 millisecondes = 1 seconde).

## Exemple : ligne diagonale

Cet exemple dessine une ligne diagonale en allumant les LED `0, 0` (haut gauche) à `4, 4` (bas droit). Le programme se met en pause pendant 500 millisecondes après chaque allumage d'une LED. Sans la `pause`, le programme s'exécuterait si rapidement que vous n'aurez pas le temps de voir chaque LED s'allumer.

```blocks
for (let i = 0; i < 5; i++) {
    led.plot(i, i)
    basic.pause(500)
}
```

## Avancé

Si `ms` est `NaN` (not a number), la valeur par défaut sera de `20` ms.

## Voir Aussi

[while](/blocks/loops/while),[temps d'exécution](/reference/input/running-time),[for](/blocks/loops/for)