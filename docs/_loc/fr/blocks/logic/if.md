# If

Exécutez le code selon qu'une condition [Booléenne](/blocks/logic/boolean) est vraie ou fausse.

```block
if(true) {
}
```

Le code à l'intérieur du bloc **`If`** s'exécute uniquement lorsque le bloc de condition est **true**. Vous pouvez comparer des variables à des valeurs ou des variables à des variables, pour une condition **true**.

```block
let reward = false;
let perfect = 0;
let myScore = 0;
if (myScore < 10) {
    myScore += 1;
}

if (myScore == perfect) {
    reward = true;
}
```

## Condition opposée: `else` #oppositecondition

Si vous souhaitez qu'un autre code s'exécute lorsque la condition opposée est **vraie**, vous la placez dans une zone de bloc supplémentaire appelée **`else`**.

```block
let colorMix = 0;
let favColor = "orange";

if (favColor == "blue")
{
    colorMix = 7;
} else {
    colorMix = 472;
}
```

## Condition opposée, mais vérifier une autre condition: `else if`

Une autre action conditionnelle consiste à ajouter un **`if`** à un **`else`** pour une **`else if`**. Il fonctionne comme ceci:

```block
let reward = false;
let nearPerfect = 0
let perfect = 0
let myScore = 0;
if (myScore < 10) {
    myScore += 1;
}

if (myScore == perfect) {
    reward = true;
} else if (myScore == nearPerfect) {
    reward = true;
}
```

Vous pourriez deviner qu'une manière plus longue de dire la même chose est ceci:

```block
let reward = false;
let nearPerfect = 0;
let perfect = 0;
let myScore = 0;
if (myScore < 10) {
    myScore += 1;
}

if (myScore == perfect) {
    reward = true;
} else {
    if (myScore == nearPerfect) {
        reward = true;
    }
}
```

## ~hint

Cliquez sur le symbole plus **(+)** pour ajouter un *else* ou un *else if* au bloc *if* actuel.

## ~

##  #examples

## Exemple : réglage de la luminosité de l’écran

Si le [niveau d'éclairage](/reference/input/light-level) est `< 100`, ce code définit la luminosité à `255` lorsque le bouton A est appuyé :

```blocks
input.onButtonEvent(Button.A, input.buttonEventValue(ButtonEvent.Down), () => {
    if(input.lightLevel()<100){
        led.setBrightness(255);
    }
})
```