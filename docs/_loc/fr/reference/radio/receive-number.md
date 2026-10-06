# receive Number

Receive the next number sent by a @boardname@ in the same `radio` group.

```sig
radio.receiveNumber();
```

### ~ alert

#### API obsolète

Cette API est obsolète! Utilisez plutôt [on received number](/reference/radio/on-received-number).

### ~

## Valeur retournée

* the first [number](/types/number) that the @boardname@ received. If it did not receive any numbers, this function will return `0`.

## Exemple: récepteur de nombres simples

Cet exemple reçoit le numéro diffusé un autre @boardname@ et l'affiche comme graphique à barres.

```blocks
radio.onDataReceived(() => {
    led.plotBarGraph(radio.receiveNumber(), 1023);
})
```

## Exemple: Récepteur de niveau de lumière

Cet exemple montre le niveau de luminosité de l'[exemple d'émetteur de niveau de luminosité](/reference/radio/send-number) sous forme de nombre.

```blocks
radio.setGroup(99)
basic.forever(() => {
    let level = radio.receiveNumber()
    basic.showNumber(level)
})
```

## Exemple: Mailbot

Cet exemple reçoit le niveau de luminosité de l'[exemple d'émetteur de niveau de luminosité](/reference/radio/send-number) et affiche une chaîne de texte telle que **ALERTE** si le niveau de luminosité augmente considérablement. Pour savoir quand votre courrier arrive, placez l'émetteur lumineux dans votre boîte aux lettres et il vous avertira lorsque quelqu'un l'ouvre. Vous pouvez aussi essayer avec une boîte classique, comme un cadeau pour un ami.

```blocks
radio.setGroup(99)
let max = 0
basic.forever(() => {
    let level = radio.receiveNumber()
    if (level > max) {
        max = level
    }
    if (max > 10) {
        basic.showString("ALERT")
    }
})
```

## Voir Aussi

[numéro d'envoi](/reference/radio/send-number), [sur les données reçues](/reference/radio/on-data-received)

```package
funk
```