# play Sound Effect

Spiele einen Sound ab, der aus einem Klangausdruck generiert wird.

```sig
music.playSoundEffect("", SoundExpressionPlayMode.UntilDone)
```

Dies wird ein **[Sound](/types/sound)** Objekt abspielen, das aus einem Klangausdruck erstellt wurde. Der Sound wird für die Dauer abgespielt, die im Klangausdruck festgelegt wurde. The sound can play on the speaker or at a pin that is set for sound output.

Dein Programm kann warten bis der Sound beendet ist, bevor der nächste Schritt ausgeführt wird. Setze dazu den Abspielmodus auf ` bis es fertig ist`. Andernfalls verwende `-Hintergrund` um das Programm sofort nach dem Start des Sounds fortzusetzen.

### ~ reminder

#### Works with Calliope mini V3

![works with Calliope mini V3 only image](https://cdn.makecode.com/blob/9ed1220962526bdadb378e487c0f4879cd2aebd3/static/v2/v2-only.png)

Dieser Block benötigt den [Calliope mini V3](/device/v2). Wenn du diesen Block mit einem vorherigen Calliope Miniboard verwendest, siehst du den **927** Fehlercode auf dem Bildschirm.

### ~

## Parameter

* **sound**: a [string](/types/string) that is the sound expression for the sound you want to play.
* **mode**: the play mode for the sound, either `until done` or `background`.

## Beispiel

Play a sound from a sound expression for `1` second.

```blocks
music.playSoundEffect(music.createSoundEffect(WaveShape.Sine, 2000, 0, 1023, 0, 1000, SoundExpressionEffect.None, InterpolationCurve.Linear), SoundExpressionPlayMode.UntilDone)
```

## Siehe auch

[create sound effect](/reference/music/create-sound-effect), [built-in sound effect](/reference/music/builtin-sound-effect), [analog set pitch pin](/reference/pins/analog-set-pitch-pin)