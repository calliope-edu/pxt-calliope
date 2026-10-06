# Spiele Note

Spiele eine Note über den `Lautsprecherpin` des @boardname@ ab solange du sagst.

## ~ hint

Diese Funktion funktioniert nur auf dem @boardname@ und in einigen Browsern.

## ~

```sig
music.playTone(440, 120)
```

## Parameter

* `Frequenz` ist die [Hertz-Zahl ](/types/number) (wie hoch oder niedrig der Ton ist).
* `ms` ist die [Anzahl](/types/number) der Millisekunden, die der Ton andauern soll

## Beispiel

Dieses Beispiel speichert die musikalische Note C in der Variable `freq`. Als nächstes spielt es die Note für 1000 Millisekunden (eine Sekunde).

```blocks
let freq = music.noteFrequency(Note.C)
music.playTone(freq, 1000)
```

## Andere Pins verwenden

Verwende [analogSetPitchPin](/reference/pins/analog-set-pitch-pin) um den Pin zu ändern, mit dem Musik erzeugt wird.

```blocks
pins.analogSetPitchPin(AnalogPin.P1);
```

## Siehe auch

[rest](/reference/music/rest), [ring tone](/reference/music/ring-tone) , [tempo](/reference/music/tempo), [set tempo](/reference/music/set-tempo), [change tempo by](/reference/music/change-tempo-by)