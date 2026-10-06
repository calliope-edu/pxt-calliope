# play Until Done

Play a sound expression until it finishes.

```sig
soundExpression.giggle.playUntilDone()
```

A sound expression is a preformatted set of tones that create a certain sound. There are several sounds to choose from. The sound is started and your program waits until the sound stops playing.

### ~ reminder

![works with Calliope mini V3 only image](https://cdn.makecode.com/blob/9ed1220962526bdadb378e487c0f4879cd2aebd3/static/v2/v2-only.png)

This block requires the [Calliope mini](/device/v2) hardware. If you use this block with a previous Calliope mini board, you will see the **927** error code on the screen.

### ~

## Paramètres

In blocks, the sound is selected from the list in the `||music:play sound until done||` block.

```block
soundExpression.giggle.playUntilDone()
```

When coding in JavaScript or Python, the sound is a `soundExpression` object which from which you run the `playUntilDone()` function from. For example, to play the `soaring` sound, select `soaring` from the `soundExpression` namespace and run `playUntilDone()`:

```typescript
soundExpression.soaring.playUntilDone()
```

## Exemple

Play the `twinkle` sound on the speaker and wait until it finishes.

```blocks
soundExpression.twinkle.playUntilDone()
basic.showString("twinkle has stopped")
```

## Voir Aussi

[lire](/reference/music/play)