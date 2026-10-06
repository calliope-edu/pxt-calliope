# Beat

Renvoie la durée d'un temps en millisecondes

```sig
music.beat(BeatFraction.Whole)
```

## ~ indice

**Simulator**: This function only works on the @boardname@ and in some browsers.

## ~

## Paramètres

* `BeatFraction` means fraction of a beat (BeatFraction.Whole, BeatFraction.Sixteenth etc) 

## Valeur retournée

* a [number](/types/number) that means the amount of milli-seconds a beat fraction represents.

## Exemple

```blocks
music.playTone(Note.C, music.beat(BeatFraction.Quarter))
```

## Voir Aussi

[play tone](/reference/music/play-tone), [ring tone](/reference/music/ring-tone), [rest](/reference/music/rest), [set tempo](/reference/music/set-tempo), [change tempo by](/reference/music/change-tempo-by)