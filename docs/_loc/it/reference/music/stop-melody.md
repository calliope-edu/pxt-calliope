# stop Melody

Stop playing a musical melody.

```sig
music.stopMelody(MelodyStopOptions.All)
```

Melodies are played either in the _foreground_ or _background_. Questo consente che più di una melodia sia attiva in una volta. Se una melodia è impostata per suonare nel background, può essere interrotta o pausata temporaneamente mentre una serie di melodie in primo piano viene riprodotta. Se la melodia in primo piano non è impostata per riprodursi `persempre`, allora ricomincerà la melodia in background quando quella in primo piano finisce.

When a melody begins, it has an option set for how the melody is to play. The melody plays just one time, `once`, or it will keep repeating, `forever`. Con queste opzioni la melodia si riprodurrà in primo piano o una volta o continuamente. Of course, if you set `forever`, any melody that was started in background will never play unless you stop the foreground melody.

You can stop either a `foreground` melody, a `background` melody, or `all` melodies.

## ~ hint

**Simulator**: This function only works on the @boardname@ and in some browsers.

## ~

## Parametri

* **options**: specify which melodies (foreground, background or both) to stop: >* `all`: stop all melodies >* `foreground`: stop the foreground melody >* `background`: stop the background melody

## Esempio

Play the `Entertainer` built-in melody and then stop it after 5 seconds.

```blocks
music.beginMelody(music.builtInMelody(Melodies.Entertainer), MelodyOptions.Forever)
basic.pause(5000)
music.stopMelody(MelodyStopOptions.All)
```

## Vedi anche

[start melody](/reference/music/begin-melody)