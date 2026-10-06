# Schlag

Gibt die Dauer eines Schlages in Milli-Sekunden aus

```sig
music.beat(BeatFraction.Whole)
```

## ~ hint

**Simulator**: Diese Funktion funktioniert nur auf dem @boardname@ und in einigen Browsern.

## ~

## Parameter

* `BeatFraction` bedeutet Bruchteil eines Beats (BeatFraction.Whole, BeatFraction.Sixteenth usw.) 

## Rückgabewert

* eine [Zahl](/types/number), die angibt, wie viele Millisekunden ein Schlagbruchteil darstellt.

## Beispiel

```blocks
music.playTone(Note.C, music.beat(BeatFraction.Quarter))
```

## Siehe auch

[play tone](/reference/music/play-tone), [ring tone](/reference/music/ring-tone), [rest](/reference/music/rest), [set tempo](/reference/music/set-tempo), [change tempo by](/reference/music/change-tempo-by)