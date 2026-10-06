# inizia Melodia

Inizia a riprodurre una melodia musicale tramite `P0` pin del @boardname@.

```sig
music.beginMelody(music.builtInMelody(Melodies.Entertainer), MelodyOptions.Once)
```

## ~ hint

**Simulator**: This function only works on the @boardname@ and in some browsers.

## ~

Ci sono melodie integrate che puoi scegliere dal blocco `||start melody||`. These are already composed for you and are easy to use by just selecting the one you want. Se vuoi riprodurre la tua melodia, puoi [comporne](/reference/music/making-melodies) una ed usarla invece di una di quelle integrate.

Melodies are a sequence of notes, each played for some small amount time, one after the other. Le note in una melodia sono mantenute in un[insieme](/types/array) di [stringhe](/types/string). Ogni stringa nell'insieme è una nota della melodia. You make a melody by assembling the notes along with the _duration_ that the note plays for. La melodia è [formata](/reference/music/making-melodies) così:

`NOTE[octave][:duration] eg: ['g5:1']`

```block
music.beginMelody(['g4:1', 'c5', 'e', 'g:2', 'e:1', 'g:3'], MelodyOptions.Once)
```

Melodies are played either in the _foreground_ or _background_. Questo consente che più di una melodia sia attiva in una volta. Se una melodia è impostata per suonare nel background, può essere interrotta o pausata temporaneamente mentre una serie di melodie in primo piano viene riprodotta. Se la melodia in primo piano non è impostata per riprodursi `persempre`, allora ricomincerà la melodia in background quando quella in primo piano finisce.

Puoi impostare opzioni per come vuoi riprodurre la melodia. Puoi chiedere che la melodia sia riprodotta una sola volta, `once`, o farla ripetere continuamente, `forever`. Con queste opzioni la melodia si riprodurrà in primo piano o una volta o continuamente. Di certo, se configuri `forever`, ogni melodia avviata in background non sarà mai riprodotta a meno che non [fermi](/reference/music/stop-melody) quella in primo piano. Per fare una melodia in background, configura l'opzione a `once in background` o `forever in background`.

## Parametri

* **melody**: A built-in melody or an [array](/types/array) representation of a [melody](reference/music/making-melodies) you wish to play.
* **options**: the play option for the melody: >* `once`: play the melody in the foreground one time >* `forever`: play the melody in the foreground and keep repeating it >* `once in background`: play the melody in the background one time >* `forever in background`: play the melody in the background and keep repeating it

## Esempi

### Riproduci l'"Entertainer"

Questo esempio riproduce la melodia integrata `Entertainer`.

```blocks
music.beginMelody(music.builtInMelody(Melodies.Entertainer), MelodyOptions.Once)
```

### Riproduci per sempre una melodia composta

Riproduci una melodia composta in background per sempre.

```blocks
music.beginMelody(['g4:1', 'c5', 'e', 'g:2', 'e:1', 'g:3'], MelodyOptions.ForeverInBackground)
```

## Vedi anche

[stop melody](/reference/music/stop-melody), [play tone](/reference/music/play-tone), [rest](/reference/music/rest), [ring tone](/reference/music/ring-tone), [tempo](/reference/music/tempo), [set tempo](/reference/music/set-tempo), [change tempo by](/reference/music/change-tempo-by)

[Making Melodies](/reference/music/making-melodies)