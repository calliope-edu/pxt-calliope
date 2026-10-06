# Beschleunigung

Ermittelt den Beschleunigungswert (Kraft in milli-g) in einer der drei Dimensionen oder die kombinierte Kraft in allen Richtungen (x, y und z).

Ermittelt die Beschleunigung des @boardname@ (wie schnell er beschleunigt oder verlangsamt).

```sig
input.acceleration(Dimension.X);
```

## ~hint

Man mißt die Beschleunigung in **milli-g**, das ist 1/1000 eines **g**. Ein **g** ist so viel Beschleunigung, die man durch die Erdanziehungskraft errreicht.

## ~

Sieh dir dieses Video an, um zu erfahren, wie der Beschleunigungsmesser auf dem @boardname@ funktioniert:

https://www.youtube.com/watch?v=byngcwjO51U

## Parameter

* **dimension**: die Richtung, in der die Beschleunigung oder die Gesamtstärke der Kraft geprüft wird. >`x`: Beschleunigung in linker und rechter Richtung.  
    `y`: Beschleunigung in Vorwärts- und Rückwärtsrichtung.   
    `z`: Beschleunigung in Auf- und Abwärtsrichtung.   
    `Stärke`: die resultierende Beschleunigungsstärke aus allen drei Dimensionen (Richtungen).

### ~hint

**Kräfte im Weltraum**

Da wir nicht auf einer flachen Welt leben, gibt es Kräfte im dreidimensionalen Raum. Wenn die Bewegung eines Objekts nicht genau in Richtung einer Achse ist, brauchen wir einen Weg, um seine Beschleunigung aus den Werten zu berechnen, die sich aus der Messung der Werte von allen Achsen zusammen ergibt.

Wenn du deinen @boardname@ auf einen Ebenen Tisch legst und ihn diagonal bewegst, hast du eine Beschleunigung in zwei Dimensionen. Du kannst die Beschleunigung in diese Richtung bestimmen so wie du mit dem Satz des Pythagoras die lange Seite eines Dreiecks aus den beiden kürzeren Seiten berechnest (**X** und **Y**):

    strength2D = Math.sqrt((accelX * accelX) + (accelY * accelY))

Wenn du deinen @boardname@ vom Tisch heben möchtest, dann hast du gerade eine andere Dimension hinzugefügt, füge den Beschleunigungswert für die **Z** Achse in die Gleichung ein:

    strength3D = Math.sqrt((accelX * accelX) + (accelY * accelY) + (accelZ * accelZ))

Diese Berechnung wird [Euklidische Norm](https://en.wikipedia.org/wiki/Euclidean_norm) der Beschleunigung genannt.

### ~

## Rückgabewert

* eine [Zahl](/types/number) mit der Größe der Beschleunigung. Wenn der @boardname@ flach auf einer Fläche liegt und der Bildschirm nach oben zeigt, ist `x` gleich `0`, `y` ist `0`, `z` ist `-1023` und `Stärke` ist `1023`.

## Beispiel: Balkendiagramm

Dieses Beispiel zeigt die Beschleunigung des @boardname@ in einem Balkendiagramm.

```blocks
basic.forever(() => {
    led.plotBarGraph(input.acceleration(Dimension.X), 1023)
})
```

### Beispiel: Erdbebenmessgerät

Alle 5 Sekunden, mit dem @boardname@ nach oben auf einer ebenen Fläche, zeigen wir an, wie stark die Erde zittert (wenn überhaupt).

```blocks
basic.forever(() => {
    basic.showNumber(input.acceleration(Dimension.Strength))
    basic.pause(5000)
})
```

## Siehe auch

[set accelerometer range](/reference/input/set-accelerometer-range), [compass heading](/reference/input/compass-heading), [light level](/reference/input/light-level)