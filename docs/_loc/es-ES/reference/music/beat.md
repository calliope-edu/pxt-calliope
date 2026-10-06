# Beat

Devuelve la duración de un pulso en milisegundos

```sig
music.beat(BeatFraction.Whole)
```

## ~ notas

**Simulator**: This function only works on the @boardname@ and in some browsers.

## ~

## Parameters

* `BeatFraction` means fraction of a beat (BeatFraction.Whole, BeatFraction.Sixteenth etc) 

## Devuelve

* a [number](/types/number) that means the amount of milli-seconds a beat fraction represents.

## Ejemplo

```blocks
music.playTone(Note.C, music.beat(BeatFraction.Quarter))
```

## Ver también

[play tone](/reference/music/play-tone), [ring tone](/reference/music/ring-tone), [rest](/reference/music/rest), [set tempo](/reference/music/set-tempo), [change tempo by](/reference/music/change-tempo-by)