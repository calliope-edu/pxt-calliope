# Mostra Icona

Mostra l'icona selezionata sullo schermo LED

```sig
basic.showIcon(IconNames.Heart)
```

## Parametri

* `icon`, the identifier of the icon to display
* `interval` (optional), the time to display in milliseconds. default is 600.

## Esempio

Questo programma mostra un volto felice e poi un volto triste utilizzando la funzione `mostra icona`, con una pausa di un secondo tra l'uno e l'altro.

```blocks
basic.showIcon(IconNames.Happy)
basic.pause(1000)
basic.showIcon(IconNames.Sad)
```

## Cuore Pulsante

Puoi creare un cuore pulsante usando il blocco forever come segue:

```blocks
basic.forever(function () {
    basic.showIcon(IconNames.Heart)
    basic.showIcon(IconNames.SmallHeart)
})
```

## Cuore che batte veloce

È possibile rallentare l'animazione precedente inserendo un blocco di pausa:

```block
basic.pause(1000)
```

... ma come lo accelereresti?

È possibile modificare il valore di pausa predefinito, impostato nel parametro `intervallo`, in modo che sia inferiore a `600` modificandolo nell'editor JavaScript.

This JavaScript code creates a crazy fast heart beat! Did you know that a hamster's heart beats at a rate this fast?

```typescript
basic.forever(function () {
    basic.showIcon(IconNames.Heart, 60)
    basic.showIcon(IconNames.SmallHeart, 60)
})
```

## Vedi anche

[showLeds](/reference/basic/show-leds)