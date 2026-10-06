# Play Tone

Play a musical tone through pin `P0` of the @boardname@ for as long as you say.

## ~ hint

This function only works on the @boardname@ and in some browsers.

## ~

```sig
music.playTone(440, 120)
```

## Parametri

* `frequency` is the [number](/types/number) of Hertz (how high or low the tone is).
* `ms` is the [number](/types/number) of milliseconds that the tone lasts

## Esempio

This example stores the musical note C in the variable `freq`. Next, it plays that note for 1000 milliseconds (one second).

```blocks
let freq = music.noteFrequency(Note.C)
music.playTone(freq, 1000)
```

## Using other pins

Use [analogSetPitchPin](/reference/pins/analog-set-pitch-pin) to change that pin used to generate music.

```blocks
pins.analogSetPitchPin(AnalogPin.P1);
```

## Vedi anche

[rest](/reference/music/rest), [ring tone](/reference/music/ring-tone) , [tempo](/reference/music/tempo), [set tempo](/reference/music/set-tempo), [change tempo by](/reference/music/change-tempo-by)