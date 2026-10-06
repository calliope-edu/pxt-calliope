# Pause

Pausiert (kein Ton abspielen) über den `Lautsprecher` für die angegebene Zeit.

```sig
music.rest(400)
```

### ~ hint

**Simulator**: Diese Funktion funktioniert nur auf dem @boardname@ und in einigen Browsern.

## ~

## Parameter

* `ms` is a [number](/types/number) saying how many milliseconds the @boardname@ should rest. One second is 1000 milliseconds.

## Beispiel

```blocks
let frequency = music.noteFrequency(Note.C)
music.playTone(frequency, 1000)
music.rest(1000)
```

## Siehe auch

[play tone](/reference/music/play-tone), [ring tone](/reference/music/ring-tone) , [tempo](/reference/music/tempo), [set tempo](/reference/music/set-tempo), [change tempo by](/reference/music/change-tempo-by)