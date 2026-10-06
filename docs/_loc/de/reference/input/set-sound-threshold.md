# Schwellenwert für Lautstärke festlegen

Gib an, wie laut es sein muss, damit deine Platine einen lauten Ton erkennt.

```sig
input.setSoundThreshold(SoundThreshold.Loud, 0)
```

Wenn das Mikrofon einen Ton hört, weist es eine Zahl zu, die angibt, wie laut der Ton in diesem Moment war. Diese Zahl ist der Schallpegel und hat einen Wert von `0` (leiser Ton) bis `255` (lauter Ton). Du kannst eine Schallpegelzahl als _Schwellenwert_ (genau die richtige Menge an Ton) verwenden, um das Ereignis [on sound](/reference/input/on-sound) auszulösen. Um einen Schwellenwert festzulegen, wählst du die Art des zu erkennenden Tons, `laut` oder `leise`, und dann den Schallpegel für diesen Typ.

### ~ reminder

![works with Calliope mini only image](https://cdn.makecode.com/blob/9ed1220962526bdadb378e487c0f4879cd2aebd3/static/v2/v2-only.png)

Dieser Block benötigt den [Calliope mini](/device/v2). Wenn du diesen Block mit einem vorherigen Calliope Miniboard verwendest, siehst du den **927** Fehlercode auf dem Bildschirm.

### ~

## Parameter

* **sound**: die Art des zu erkennenden Tons: `laut` oder `leise`.
* **threshold**: die Schallpegelzahl [number](/types/number), die ein Tonereignis auslöst.

## Beispiel #example

Show an icon animation when the microphone detects a sound louder than a sound level of `200`.

```blocks
input.setSoundThreshold(SoundThreshold.Loud, 200)
input.onSound(DetectedSound.Loud, function () {
    basic.showIcon(IconNames.Square)
    basic.showIcon(IconNames.SmallSquare)
    basic.showIcon(IconNames.SmallDiamond)
    basic.clearScreen()
})
```

# Siehe auch #seealso

[on sound](/reference/input/on-sound), [sound level](/reference/input/sound-level)

```package
microphone
```