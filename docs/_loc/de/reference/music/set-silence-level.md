# setze Stillepegel

Legt den Pegel für die Audio-Pin-Ausgabe während der Stillezeiten fest.

```sig
music.setSilenceLevel(1000)
```

### ~ reminder

![works with Calliope mini V3 only image](https://cdn.makecode.com/blob/9ed1220962526bdadb378e487c0f4879cd2aebd3/static/v2/v2-only.png)

This function requires the [Calliope mini V3](/device/v2) hardware. If you use this function with a previous Calliope mini board, you will see the **927** error code on the screen.

### ~

Normalerweise beträgt der Ausgabesignalpegel am Audiopin `0` wenn keine Klänge abgespielt werden. Dies ist der Stillepegel und er bleibt konstant, da die tatsächlichen Töne über einen Zeitraum hinweg unterschiedlich sind. Einige Geräte (Kopfhörer, externe Lautsprecher, etc.). die empfindlich für leichte Signaländerungen sind, können Klänge von Signalrauschen abspielen, die entlang der Verbindung zwischen dem Audiopin und dem Audiogerät auftreten.

Um die Wirkung dieses Signalgeräuschs zu verringern, kann es hilfreich sein, einen konstanten Signalpegel für Stille zu setzen, der größer als `0` ist.

## Parameter

* **level**: eine [Zahl](/types/number) zwischen `0` und `1024` zur Verwendung als Stillepegel für die Audio-Pin-Ausgabe, wenn keine Klänge abgespielt werden. Die Standardstufe ist `0`.

## Beispiel #example

Stelllt den Stillepegel für den aktuellen Audiopin auf `512`.

```typescript
pins.setAudioPin(AnalogPin.P1)
music.setSilenceLevel(512)
```

## Siehe auch

[volume](/reference/music/volume), [set audio pin](/reference/pins/set-audio-pin)

```package
Musik
```