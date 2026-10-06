# Symbol anzeigen

Zeigt das ausgewählte Symbol auf dem LED-Bildschirm an

```sig
basic.showIcon(IconNames.Heart)
```

## Parameter

* `icon`, der Bezeichner des anzuzeigenden Symbols
* `intervall` (optional), die Anzeigedauer in Millisekunden. Standard ist 600.

## Beispiel

Dieses Programm zeigt ein glückliches Gesicht und dann ein trauriges Gesicht mit der Funktion `show icon`, mit einer Pause von einer Sekunde dazwischen.

```blocks
basic.showIcon(IconNames.Happy)
basic.pause(1000)
basic.showIcon(IconNames.Sad)
```

## Schlagendes Herz

Du kannst ein schlagendes Herz erstellen, indem Du den Dauerhaft-Block wie folgt verwendest:

```blocks
basic.forever(function () {
    basic.showIcon(IconNames.Heart)
    basic.showIcon(IconNames.SmallHeart)
})
```

## Schnell schlagendes Herz

Du kannst die vorherige Animation verlangsamen, indem Du einen Pausenblock einfügst:

```block
basic.pause(1000)
```

...aber wie würdest du es beschleunigen?

Du kannst den Standard-Pausewert, der im `Intervall` Parameter festgelegt ist, so ändern, dass er kleiner als `600` ist, indem Du ihn im JavaScript-Editor änderst.

Dieser JavaScript-Code erzeugt einen verrückten schnellen Herzschlag! Wusstest du, dass das Herz eines Hamsters so schnell schlägt?

```typescript
basic.forever(function () {
    basic.showIcon(IconNames.Heart, 60)
    basic.showIcon(IconNames.SmallHeart, 60)
})
```

## Siehe auch

[showLeds](/reference/basic/show-leds)