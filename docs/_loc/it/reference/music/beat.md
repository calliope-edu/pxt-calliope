# Beat

Restituisce la durata di una battuta in millisecondi.

```sig
music.beat(BeatFraction.Whole)
```

## ~ hint

**Simulator**: This function only works on the @boardname@ and in some browsers.

## ~

## Parametri

* `BeatFraction` means fraction of a beat (BeatFraction.Whole, BeatFraction.Sixteenth etc) 

## Returns

* a [number](/types/number) that means the amount of milli-seconds a beat fraction represents.

## Esempio

```blocks
music.playTone(Note.C, music.beat(BeatFraction.Quarter))
```

## Vedi anche

[play tone](/reference/music/play-tone), [ring tone](/reference/music/ring-tone), [rest](/reference/music/rest), [set tempo](/reference/music/set-tempo), [change tempo by](/reference/music/change-tempo-by)