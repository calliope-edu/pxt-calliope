# On Event

Raises events for melodies or music events.

```sig
music.onEvent(MusicEvent.MelodyNotePlayed, () => {})
```

## Parametri

* `value` the kind of event
* `handler` the code to run when the event is raised.

## Esempio

Questo esempio stampa tutti gli eventi all'output seriale.

```blocks
music.onEvent(MusicEvent.MelodyRepeated, () => {
    serial.writeLine("melody repeated")
})
music.onEvent(MusicEvent.MelodyEnded, () => {
    serial.writeLine("melody ended")
})
music.onEvent(MusicEvent.MelodyStarted, () => {
    serial.writeLine("melody started")
})
music.onEvent(MusicEvent.MelodyRepeated, () => {
    serial.writeLine("background melody repeated")
})
music.onEvent(MusicEvent.BackgroundMelodyStarted, () => {
    serial.writeLine("background started")
})
music.onEvent(MusicEvent.BackgroundMelodyEnded, () => {
    serial.writeLine("background ended")
})
music.onEvent(MusicEvent.BackgroundMelodyPaused, () => {
    serial.writeLine("background paused")
})
music.onEvent(MusicEvent.BackgroundMelodyResumed, () => {
    serial.writeLine("background resumed")
})
music.onEvent(MusicEvent.BackgroundMelodyRepeated, () => {
    serial.writeLine("background repeated")
})
input.onButtonEvent(Button.A, input.buttonEventClick(), () => {
    music.beginMelody(music.builtInMelody(Melodies.BaDing), MelodyOptions.Once)
})
music.setTempo(100)
music.beginMelody(music.builtInMelody(Melodies.Ringtone), MelodyOptions.ForeverInBackground)
```

## Melodia in Background

Gli eventi correlati alla melodia in background sono innescati da una melodia riprodotta durante un'esecuzione in blocco di background.

```
control.inBackground(function () {
    basic.pause(randint(0, 5000))
    music.beginMelody(music.builtInMelody(Melodies.Entertainer), MelodyOptions.Once)
})
music.onEvent(MusicEvent.BackgroundMelodyStarted, function () {
    basic.showIcon(IconNames.EigthNote)
})
```