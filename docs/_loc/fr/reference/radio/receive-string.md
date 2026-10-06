# Récupérer une Chaîne de Caractères

Find the next string sent by radio from another @boardname@.

```sig
radio.receiveString()
```

### ~ alert

#### Deprecated

Cette API est obsolète! Utilisez plutôt [on received string](/reference/radio/on-received-string).

### ~

## Valeur retournée

* the first [string](/types/string) that was sent. If no string was sent, then this function returns an empty (blank) string.

## Exemple: Récepteur simple

Afficher la chaîne envoyée par un autre @boardname@.

```blocks
radio.onDataReceived(() => {
    basic.showString(radio.receiveString());
});
```

## Exemple: radio bidirectionnelle

Si vous chargez ce programme sur deux ou plus @ boardname @ s, vous pouvez envoyer un mot de code de l'un d'eux aux autres en appuyant sur le bouton ` A `. L'autre @boardname@s recevra le mot de code, puis le montrera.

```blocks
input.onButtonEvent(Button.A, input.buttonEventClick(), () => {
    radio.sendString("Codeword: TRIMARAN")
    basic.showString("SENT");
})

radio.onDataReceived(() => {
    basic.showString(radio.receiveString());
});
```

## ~indice

A radio that can both transmit and receive is called a *transceiver*.

## ~

## Exemple: radio d'humeur

Ceci est un programme simple pour envoyer que vous soyez heureux ou triste ```radio```. Utiliser le `La` ou `B` bouton pour sélectionner une émotion.

Ce programme recevra également l'humeur de votre ami.

```blocks
let data: string = "";
input.onButtonEvent(Button.A, input.buttonEventClick(), () => {
    radio.sendString("H");
});
input.onButtonEvent(Button.B, input.buttonEventClick(), () => {
    radio.sendString("S");
});
radio.onDataReceived(() => {
    data = radio.receiveString();
    if ("H" == data) {
        basic.showLeds(`
            . . . . .
            . # . # .
            . . . . .
            # . . . #
            . # # # .
            `);
    } else if ("S" == data) {
        basic.showLeds(`
            . . . . .
            . # . # .
            . . . . .
            . # # # .
            # . . . #
            `);
    } else {
        basic.showString("?");
    }
});
```

## Voir Aussi

[ Envoyer une chaîne ](/reference/radio/send-string), [ sur les données reçues ](/reference/radio/on-data-received)

```package
funk
```