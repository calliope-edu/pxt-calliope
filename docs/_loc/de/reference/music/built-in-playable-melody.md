# integrierte Melodie

Erhalte ein abspielbares Klangobjekt für eine eingebaute Melodie.

```sig
music.builtInPlayableMelody(Melodies.Dadadadum)
```

Eine Sammlung von eingebauten Melodien sind als [playable](/types/playable) Soundobjekte verfügbar. Du wählst einen aus, indem du den Namen des Effekts auswählst.

## Parameter

- **melody**: Ein Melodiename. Die verfügbaren Melodien sind:

> * `Dadadum`
> * `Entertainer`
> * `Präludium`
> * `Ode`
> * `Nyan`
> * `Klingelton`
> * `Funk`
> * `Blues`
> * `Geburtstag`
> * `Hochzeit`
> * `funeral`
> * `punchline`
> * `baddy`
> * `chase`
> * `ba ding`
> * `wawawawaa`
> * `jump up`
> * `jump down`
> * `power up`
> * `power down`

## Rückgabewert

- a [playable](/types/playable) object that contains the melody.

## Beispiel

Play the built-in melody for **blues**.

```blocks
music.play(music.builtInPlayableMelody(Melodies.Blues), music.PlaybackMode.InBackground)
```

## Siehe auch

[string playable](/reference/music/string-playable)