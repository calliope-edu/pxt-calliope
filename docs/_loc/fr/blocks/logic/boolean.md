# Boolean

Un booléen peut prendre deux valeurs: `vrai` ou `faux`. Les opérateurs booléens (logiques) (*and*, *or*, *not*) prennent des booléens en entrée et retourne une nouvelle valeur booléenne. Les opérateurs de comparaison sur d'autres types ([Number](/types/number)s, [String](/types/string)s) retourne aussi des valeurs booléennes.

Ces blocs représentent les valeurs booléennes `true` et `false`, qui peuvent se placer dans n'importe quel endroit où une valeur booléenne est attendue:

```block
let on = true;
```

Les trois blocs suivants représentent les opérateurs booléens (logiques):

```block
let and = true && false;
let or = true || false;
let not = !true;
```

Les six blocs suivants représentent des opérateurs de comparaison qui donnent une valeur booléenne. La plupart des comparaisons ici impliquent des [nombres](/types/number):

```block
let equality = 42 == 42;
let inequality = 42 != 42;
let lowerThan = 42 < 0;
let greaterThan = 42 > 0;
let lowerOrEqualThan =42 <= 0;
let greaterOrEqualThan = 42 >= 0;
```

Les valeurs booléennes et les opérateurs associés sont souvent utilisés avec une instruction [If](/blocks/logic/if) ou [while](/blocks/loops/while) pour déterminer le code qui s'exécutera ensuite. Par exemple:

```block
let a = 5
let b = 87

if (a < b) {
    a += 1
}

while (a < b) {
    a += 1
}
```

## Fonctions qui renvoient un booléen

Certaines fonctions renvoient une valeur booléenne, que vous pouvez stocker dans une variable booléenne. Par exemple, le code suivant obtient l'État on/off de `point (1, 2)` et le stocke dans la variable booléenne nommée `on`. Ensuite, le code efface l'écran si `on` a la `valeur true`:

## Opérateurs booléens

Les opérateurs booléens prennent des entrées booléennes et retourne une nouvelle valeur booléenne:

## Conjonction: `A et B`

`A et B` s'évalue à `true` si et seulement si A et B sont vrais :

```block
let off = false && false;
let off2 = false && true;
let off3 = true && false;
let on = true && true;
```

## Disjonction: `A ou B`

`A ou B` s'évalue à `true` si `A` est vrai ou `B` est vrai, ou si `A` et `B` sont vrais :

```block
let off = false || false;
let on = false || true;
let on2 = true || false;
let on3 = true || true;
```

## Négation: `non A`

`non A` est le contraire (négation) de A:

```block
let on = !false;
let off = !true;
```

##  #examples

## Exemple : Opérateur `ET`

Cet exemple montre comment activer la LED `3, 3`, si les LED `1, 1` et `2, 2` sont allumées :

```blocks
if (led.point(1,1) && led.point(2,2)) {
   led.plot(3,3)
}
```

## Exemple : Comparaison de nombres et de chaînes

Lorsque vous comparez deux nombres, vous obtenez une valeur booléenne, par exemple la comparaison `x < 5` dans le code ci-dessous :

```blocks
input.onButtonEvent(Button.A, input.buttonEventValue(ButtonEvent.Down), () => {
    let x = randint(0, 5)
    if(x < 5) {
    basic.showString("low");
    } else {
    basic.showString("high");
    }
})
```

Consultez la documentation sur les [nombres](/types/number) pour plus d’informations sur la comparaison de deux nombres.