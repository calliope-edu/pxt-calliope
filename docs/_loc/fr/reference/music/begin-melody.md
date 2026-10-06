# begin Melody

Begin playing a musical melody through pin `P0` of the @boardname@.

```sig
music.beginMelody(music.builtInMelody(Melodies.Entertainer), MelodyOptions.Once)
```

## ~ indice

**Simulator**: This function only works on the @boardname@ and in some browsers.

## ~

There are built-in melodies that you can choose from the `||start melody||` block. These are already composed for you and are easy to use by just selecting the one you want. If you want to play your own melody, you can [compose](/reference/music/making-melodies) one and use it instead of one of the built-in ones.

Melodies are a sequence of notes, each played for some small amount time, one after the other. The notes in a melody are held in an [array](/types/array) of [strings](/types/string). Each string in the array is a note of the melody. You make a melody by assembling the notes along with the _duration_ that the note plays for. The melody is [formed](/reference/music/making-melodies) like this:

`NOTE[octave][:duration] eg: ['g5:1']`

```block
music.beginMelody(['g4:1', 'c5', 'e', 'g:2', 'e:1', 'g:3'], MelodyOptions.Once)
```

Melodies are played either in the _foreground_ or _background_. This allows more than one melody to be active at once. If a melody is set to play in the background, it can be interrupeted, or paused, temporarily while a melody set for the foreground is played. If the foreground melody is not set to play `forever`, then the background melody resumes when the foreground melody is finished.

You can set options for how you want the melody to play. Vous pouvez demander que la mélodie soit jouée juste une fois, `une fois`, ou qu'elle continue de se répéter, `indéfiniment`. Avec ces options, la mélodie sera jouée au premier plan soit une fois soit elle continuera de se répéter. Of course, if you set `forever`, any melody that was started in background will never play unless you [stop](/reference/music/stop-melody) the foreground melody. To make a background melody, set the option to `once in background` or `forever in background`.

## Paramètres

* **melody**: A built-in melody or an [array](/types/array) representation of a [melody](reference/music/making-melodies) you wish to play.
* **options**: the play option for the melody: >* `once`: play the melody in the foreground one time >* `forever`: play the melody in the foreground and keep repeating it >* `once in background`: play the melody in the background one time >* `forever in background`: play the melody in the background and keep repeating it

## Exemples

### Play the "Entertainer"

This example plays the `Entertainer` built-in melody.

```blocks
music.beginMelody(music.builtInMelody(Melodies.Entertainer), MelodyOptions.Once)
```

### Play a composed melody forever

Play a made-up melody in the background forever.

```blocks
music.beginMelody(['g4:1', 'c5', 'e', 'g:2', 'e:1', 'g:3'], MelodyOptions.ForeverInBackground)
```

## Voir Aussi

[arrêt de la mélodie](/reference/music/stop-melody), [jouer dans une tonalité](/reference/music/play-tone), [suspension de la tonalité](/reference/music/rest), [tonalité](/reference/music/ring-tone), [tempo](/reference/music/tempo), [définir un tempo](/reference/music/set-tempo), [changer le tempo par](/reference/music/change-tempo-by)

[Making Melodies](/reference/music/making-melodies)