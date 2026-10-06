# spielt einen Ton

Überprüft, ob ein Ton über eine Ausgabe abgespielt wird.

```sig
music.isSoundPlaying()
```

### ~ reminder

Dieser Block benötigt den Calliope mini V3. Wenn Du diese Funktion mit einem Calliope mini V1/V2 verwendest, siehst du evtl. den <strong x-id="1">927</strong> Fehlercode auf dem Bildschirm.

### ~

Ein Ton wird am eingebauten Lautsprecher oder am ausgewählten Audioausgabe-Pin abgespielt. Du kannst prüfen, ob bei einem dieser Ausgänge gerade ein Ton abgespielt wird.

## Rückgabewert

- ein [boolean](/types/boolean) Wert, der `true` ist, wenn Klang am eingebauten Lautsprecher oder am Audio-Pin abgespielt wird. Der Wert ist sonst `false`.

## Beispiel #example

Stoppt alle Töne und Melodien, die gerade gespielt werden.

```blocks
if (music.isSoundPlaying()) {
    music.stopAllSounds()
}
```

## Siehe auch

[den integrierten Lautsprecher einschalten](/reference/music/set-built-in-speaker-enabled),
[einen Pin für die Tonausgabe definieren](/reference/pins/set-audio-pin)

```package
Musik
```