# Wenn...

Führe Code aus, je nachdem, ob eine [boolean](/blocks/logic/boolean) -Bedingung wahr (true) oder falsch (false) ist.

```block
if(true) {
}
```

Der Code im **`wenn`**-Block wird nur ausgeführt, wenn der Bedingungsblock **wahr (true)** ist. Für eine **true**-Bedingung kannst du Variablen mit Werten oder Variablen mit Variablen vergleichen.

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

## Entgegengesetzte Bedingung: `ansonsten` #oppositecondition

Wenn ein anderer Code ausgeführt werden soll, wenn die entgegengesetzte Bedingung **true** ist, füge diesen in einen zusätzlichen Blockbereich mit dem Namen **`ansonten`** ein.

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

## Entgegengesetzte Bedingung, aber noch einmal etwas prüfen: `sonst wenn...`

Eine weitere bedingte Aktion wäre das Hinzufügen eines **`wenn...`** zu einem **`dann...`** für ein **`sonst wenn...`**. Es funktioniert so:

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

Du könntest erraten das eine längere Art, das Gleiche zu sagen, dies ist:

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

Ein Klick auf das Plussymbol **(+)** fügt *dann...* oder *sonst wenn...* Abschnitte zum aktuellen *wenn...* Block hinzu.

## ~

##  #examples

## Beispiel: Anpassen der Bildschirmhelligkeit

Wenn die Taste A gedrückt wird und wenn dann die [Lichtstärke](/reference/input/light-level) `< 100` ist, wird durch diesen Code die Helligkeit auf `255` festgelegt:

```blocks
input.onButtonEvent(Button.A, input.buttonEventValue(ButtonEvent.Down), () => {
    if(input.lightLevel()<100){
        led.setBrightness(255);
    }
})
```