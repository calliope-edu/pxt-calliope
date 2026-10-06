# Magnetstärke

Ermittelt die Stärke des Magnetfeldes in eine der drei Richtungen.

```sig
input.magneticForce(Dimension.X);
```

## ~hint

Der @boardname@ misst magnetische Feldstärke in der Einheit Mikro-**Tesla**.

Du wirst aufgefordert, [den Kompass](https://support.microbit.org/support/solutions/articles/19000008874-calibrating-the-micro-bit-compass) zu kalibrieren, wenn du das erste Mal den Kompass in deinem Programm verwendest.

## ~

## Parameter

* **dimension** bedeutet, für welche Richtung du die Beschleunigung ermitteln willst. Entweder `Dimension.X` (links und rechts), `Dimension.Y` (vorwärts und rückwärts), or `Dimension.Z` (hoch und runter)

## Rückgabewert

* ein [Wert](/types/number) von Mikrotesla, die die Stärke des Magneten bedeutet

## Beispiel

Erstelle einen Metalldetektor, der die Stärke der Magnetkraft in die `X` Richtung misst. Zeigt einen Balkengraphen an, der den aktuellen Stand der vom Magnetometer gemessenen Magnetkraft anzeigt.

```blocks
basic.forever(function() {
    led.plotBarGraph(input.magneticForce(Dimension.X) / 2000, 0)
})
```

## Siehe auch

[Kompass Richtung](/reference/input/compass-heading)