# For Of

Exécuter une partie du programme pour chaque élément d'une liste.

```block
for(let value of [""]) {

}
```

##  #examples

## Exemple: Trouver le nombre le plus élevé

Trouvez le nombre le plus élevé dans une liste de nombres. Afficher le nombre le plus élevé à l'écran.

```blocks
let list: number[] = []
let highest = 0
highest = 0
list = [5, 8, 6, 2, 4, 3, 7, 1]
for (let value of list) {
    if (value > highest) {
        highest =  value
    }
}
basic.showNumber(highest)
```