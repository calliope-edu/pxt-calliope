# Helligkeit plotten

Schalte eine LED mit einer bestimmten Helligkeit auf dem [LED-Bildschirm](/device/screen) ein.

```sig
led.plotBrightness(0,0, 128);
```

### Parameter

* `x` ist eine [Zahl](/types/number), die den horizontalen Platz auf dem LED-Bildschirm angibt (von links nach rechts: 0, 1, 2, 3 oder 4)
* `y` ist eine [Zahl](/types/number), die den vertikalen Platz auf dem LED-Bildschirm angibt (von oben nach unten: 0, 1, 2, 3 oder 4)
* `brightness` ist eine [Zahl](/types/number), die die Helligkeit der LED darstellt, von 0 (aus) bis 255 (volle Helligkeit)

Wenn ein Parameter [außerhalb der Grenzen](/reference/out-of-bounds) liegt (ein Wert anders als 0 bis 4), dann wird diese Funktion nichts tun.

### ~hint

Der LED-Bildschirm ist ein solides Quadrat aus LEDs mit fünf LEDs auf jeder Seite. Um mehr darüber zu erfahren, wie man die LEDs mit den `x` und `y` Koordinaten nummeriert, siehe [LED-Bildschirm](/device/screen).

### ~

### Beispiel: Eine LED

Dieses Programm schaltet die LED in der unteren rechten Ecke mit 50% Helligkeit ein

```blocks
led.plotBrightness(2, 2, 128)
```


### Beispiel: Quadrat

Dieses Programm verwendet eine [for-Schleife](/blocks/loops/for) und die Funktion `plotBrightness`, um ein Quadrat um die Ränder des LED-Bildschirms zu erstellen.

```blocks
for (let i = 0; i < 5; i++) {
    led.plotBrightness(0, i, 64)
    led.plotBrightness(4, i, 128)
    led.plotBrightness(i, 0, 172)
    led.plotBrightness(i, 4, 255)
    basic.pause(500)
}
```

### ~hint

Verwende die Funktion [point](/reference/led/point), um herauszufinden, ob eine LED an oder aus ist.

### ~

### Siehe auch

[plot](/reference/led/plot), [unplot](/reference/led/unplot), [point](/reference/led/point), [LED-Bildschirm](/device/screen)