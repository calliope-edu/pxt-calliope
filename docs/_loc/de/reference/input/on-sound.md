# bei Tonmessung

Code wird ausgeführt, wenn das Mikrofon einen Ton hört.

```sig
input.onSound(DetectedSound.Loud, function () {})
```

Das Mikrofon kann Geräusche erkennen, die leise oder laut sind. Du kannst das Mikrofon so einstellen, dass es ein Geräusch auf einem bestimmten Pegel erkennt und bei diesem Ereignis Code ausführt, wenn es das Geräusch hört. Es gibt zwei Geräuschbereiche, die du erkennen kannst: `laut` oder `leise`.

### ~ reminder

![works with Calliope mini V3 only image](https://cdn.makecode.com/blob/9ed1220962526bdadb378e487c0f4879cd2aebd3/static/v2/v2-only.png)

Dieser Block benötigt den [Calliope mini V3](/device/v2). Wenn du diesen Block mit einem vorherigen Calliope Miniboard verwendest, siehst du den **927** Fehlercode auf dem Bildschirm.

### ~

## Parameter

* **sound**: die Art des zu erkennenden Geräuschs: `laut` oder `leise`.
* **handler**: der Code, der ausgeführt wird, wenn ein Geräusch gehört wird.

## Beispiel

Zeige eine Icon-Animation, wenn das Mikrofon ein Geräusch erkennt.

```blocks
input.onSound(DetectedSound.Loud, function () {
    basic.showIcon(IconNames.Square)
    basic.showIcon(IconNames.SmallSquare)
    basic.showIcon(IconNames.SmallDiamond)
    basic.clearScreen()
})
```

# Siehe auch #seealso

[Geräuschpegel](/reference/input/sound-level), [Geräuschschwelle einstellen](/reference/input/sound-level)

```package
microphone
```