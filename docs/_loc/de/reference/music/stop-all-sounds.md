# Alle Soundeffekte anhalten

Stoppt alle Soundeffekte die gerade gespielt werden und alle anderen die warten abgespielt zu werden.

```sig
music.stopAllSounds()
```

Wenn du Sounds oder Soundeffekte mehrmals abspielst, müssen die Sounds, die später gespielt werden, warten, bis Vorherige abgespielt wurden. Du kannst den Sound stoppen, der jetzt abgespielt und alle kommenden wird `||music:stop all sounds||`.

## #simnote

### ~hint

#### Simulator

`||music:alle Soundeffekte anhalten||` funktioniert auf dem @boardname@. Abhängig von deinem Browser funktioniert es aber möglicherweise nicht im Simulator.

### ~

## Beispiel #example

Spielt einen Ton ab und stoppt ihn danach sofort.

```blocks
let freq = music.noteFrequency(Note.C);
music.playTone(freq, 1000)
music.stopAllSounds()
```

## Siehe auch #seealso

[play melody](/reference/music/play-melody), [play](/reference/music/play), [play tone](/reference/music/play-tone)