# Modifier une valeur

Modifier signifie ici l'augmentation de la valeur d'une variable par un certain montant.

```block
let x = 0
x += 2
```

Les blocs de modification augmentent la valeur de la variable selon le montant souhaité. Ceci est également connu sous le nom d'opération d' *affectation d'addition* .

### Modifier une variable déclarée

Utilisez l'opérateur de modification pour définir une nouvelle valeur supérieure à une [variable](/blocks/variables/var). Si vous **`définissez`** une variable avec la valeur `1`, le bloc de modification effectue la modification de valeur par `2` comme ceci:

```block
let x = 1
x += 2
```

### ~ hint

Vous pouvez utiliser l'opérateur de modification avec des variables de chacun des [types](/types)pris en charge.

### ~

##  #examples

## Exemple : afficher la valeur d’une variable

Utilisez l’opérateur d’assignation pour définir la valeur d’une [variable](/blocks/variables/var). Modifiez la valeur d’une variable de 0 à 1 en utilisant le bloc de changement d'élément. Puis affichez la nouvelle valeur de la variable sur l’écran LED. Comme ça:

```blocks
let x = 0;
x += 1;
basic.showNumber(x);
```

## Voir aussi

[Variables](/blocks/variables/var), [Assignment operator](/blocks/variables/assign)