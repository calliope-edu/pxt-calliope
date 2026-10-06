# Eingebauter Soundeffekt

Hole einen Soundausdruck-String für einen eingebauten Soundeffekt.

```sig
music.builtinSoundEffect(soundExpression.giggle)
```

Eine Sammlung von eingebauten Soundeffekten ist als Soundausdrücke verfügbar. Du wählst einen aus, indem du den Namen des Effekts auswählst.

## Parameter

* **soundExpression**: Ein Name für einen Soundausdruck. Die verfügbaren Effekte sind: >* `giggle` >* `happy` >* `hello` >* `mysterious` >* `sad` >* `slide` >* `soaring` >* `spring` >* `twinkle` >* `yawn`

## Rückgabewert

* ein [sound](/types/sound) Ausdruck [string](/types/string) mit dem benannten Soundeffekt.

## Beispiel

Spiele den eingebauten Soundeffekt für `giggle`.

```blocks
music.playSoundEffect(music.builtinSoundEffect(soundExpression.giggle), SoundExpressionPlayMode.UntilDone)
```

## Siehe auch

[play sound effect](/reference/music/play-sound-effect), [create sound effect](/reference/music/create-sound-effect)