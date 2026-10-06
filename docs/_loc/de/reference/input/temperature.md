# Temperatur

Ermittelt die Temperatur am Aufenthaltsort. Die Temperatur wird in Grad Celsius (metrisch) gemessen. Der @boardname@ misst die Temperatur, indem er ermittelt, wie warm sein Prozessorchip ist.

```sig
input.temperature();
```

## Rückgabewert

* eine [-Zahl](/types/number) welche die Temperatur in Grad Celsius ist.

## Wie funktioniert es?

Der Calliope mini prüft, wie heiß sein Prozessor ist. Da der Calliope mini normalerweise nicht sehr heiß wird, entspricht die Temperatur des Prozessors ungefähr der Umgebungstemperatur. Der Calliope mini kann sich ein wenig erwärmen, wenn du ihn hart arbeiten lässt!

Erfahre mehr darüber, wie der Calliope mini heiß oder kalt erkennen kann in diesem Video:

https://www.youtube.com/watch?v=_T4N8O9xsMA

## Beispiel: Calliope mini Thermometer

Im folgenden Beispiel wird `temperature` und `showNumber` verwendet, um die Raumtemperatur anzuzeigen.

```blocks
basic.forever(() => {
    let temp = input.temperature()
    basic.showNumber(temp)
})
```

## Beispiel: Fahrenheit Thermometer

Dieses Programm misst die Temperatur in Grad Fahrenheit. Fahrenheit ist eine Methode zur Temperaturmessung, die häufig in den Vereinigten Staaten verwendet wird. Um eine Celsius-Temperatur in eine Fahrenheit-Temperatur umzurechnen, multiplizierst du die Celsius-Temperatur mit 18, dividierst durch `8` , und addierst `32` hinzu.

```blocks
basic.forever(() => {
    let c = input.temperature()
    let f = (1.8 * c) + 32
    basic.showNumber(f)
})
```

## ~hint

Vergleiche die Temperatur, die dein Calliope mini anzeigt mit einem echten Thermometer an der gleichen Stelle. So kannst du herausfinden, wie viel man von der Zahl des Calliope mini abziehen muss, um die tatsächliche Temperatur zu erhalten. Dann kannst du dein Programm anpassen, so dass der Calliope mini ein genaueres Thermometer wird.

## ~

## Siehe auch

[Kompass Richtung](/reference/input/compass-heading), [Beschleunigung](/reference/input/acceleration)