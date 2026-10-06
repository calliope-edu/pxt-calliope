# builtin Sound Effect

Get a sound expression string for a built-in sound effect.

```sig
music.builtinSoundEffect(soundExpression.giggle)
```

A collection of built-in sound effects are available as sound expressions. You choose one by selecting the name of the effect

## Parameters

* **soundExpression**: A sound expression name. The available effects are: >* `giggle` >* `happy` >* `hello` >* `mysterious` >* `sad` >* `slide` >* `soaring` >* `spring` >* `twinkle` >* `yawn`

## Devuelve

* a [sound](/types/sound) expression [string](/types/string) with the the named sound effect.

## Ejemplo

Play the built-in sound effect for `giggle`.

```blocks
music.playSoundEffect(music.builtinSoundEffect(soundExpression.giggle), SoundExpressionPlayMode.UntilDone)
```

## Ver también

[play sound effect](/reference/music/play-sound-effect), [create sound effect](/reference/music/create-sound-effect)