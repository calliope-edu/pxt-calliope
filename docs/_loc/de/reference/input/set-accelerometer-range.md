# Stelle den Bereich des Beschleunigungsmessers ein

Stellt den Teil des @boardname@ ein, der die [Beschleunigung](/reference/input/acceleration) misst (wie viel der @boardname@ beschleunigt oder verlangsamt), falls du eine hohe oder niedrige Beschleunigung messen möchtest.

```sig
input.setAccelerometerRange(AcceleratorRange.OneG);
```

## Parameter

* `Bereich` bedeutet der größte Beschleunigungswert, den du messen wirst (entweder `1G`, `2G`, `4G`oder `8G`). Jede größere Zahl wird vom @boardname@ ignoriert, sowohl bei der Bestimmung der Schwerkraft als auch bei Messung der Beschleunigung.

## Beispiel

Dieses Programm sagt, dass die höchste Beschleunigung, die der @boardname@ messen wird, ist 4G. Dann misst es die seitliche Beschleunigung, bis du das Programm stoppst.

```blocks
input.setAccelerometerRange(AcceleratorRange.FourG);
basic.forever(() => {
    basic.showNumber(input.acceleration(Dimension.X));
});
```

### ~hint

Dieses Programm funktioniert nicht im Simulator, nur mit einem @boardname@.

### ~

## Siehe auch

[Kompass Richtung](/reference/input/compass-heading), [Lichtstärke](/reference/input/light-level)