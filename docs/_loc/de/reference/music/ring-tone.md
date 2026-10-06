# Note

Spielt einen Ton über den `Lautsprecherpin` mit der angegebenen Tonhöhe. Der Ton wird solange gespielt, bis du ihn stoppst.

```sig
music.ringTone(440)
```

## ~ hint

**Simulator**: Diese Funktion funktioniert nur auf dem @boardname@ und in einigen Browsern.

## ~

## Parameter

* `frequency` is a [number](/types/number) that says how high-pitched or low-pitched the tone is. Diese Zahl ist in **Hz** (**Hertz**), was ein Maß der Frequenz oder Tonhöhe ist.

## Beispiel

Dieses Programm prüft den **Beschleunigungsmesser** für die **Beschleunigung** des @boardname@'s (wie sehr der @boardname@ beschleunigt oder verlangsamt). Dann benutzt er diese Beschleunigung, um einen Ton zu erzeugen. Wenn die @boardname@ beschleunigt, wird die Tonhöhe höher, und wenn er sich verlangsamt, wird die Tonhöhe niedriger. Es macht Spaß -- versuche es!

```blocks
basic.forever(() => {
    music.ringTone(input.acceleration(Dimension.X))
})
```

## Andere Pins verwenden

Use [analogSetPitchPin](/reference/pins/analog-set-pitch-pin) to change that pin used to generate music.

```blocks
pins.analogSetPitchPin(AnalogPin.P1);
```

## Siehe auch

[rest](/reference/music/rest), [play tone](/reference/music/play-tone), [tempo](/reference/music/tempo), [set tempo](/reference/music/set-tempo), [change tempo by](/reference/music/change-tempo-by)