# setze Audiopin

Legt fest, welcher [Pin](/device/pins) (P1, P2) verwendet wird um Musik abzuspielen und Töne zu generieren.

```sig
pins.setAudioPin(AnalogPin.P0)
```

### ~ hint

#### Calliope mini Lautsprecher

Mit der [Calliope Mini V3](/device/v2) Hardware wird der eingebaute Lautsprecher die gleichen Töne und Musik abspielen, die an den Audio-Pin gesendet werden (parallel).

### ~

## Parameter

* **Name**: der Pin für Audio-Ausgabe: `P0`, `P1`, `P2` oder `P3`.

## Beispiel

Spielt einen Ton für die "A4" Note an Pin **P0** für 1 Sekunde.

```blocks
pins.setAudioPin(AnalogPin.P0)
let frequency = 440
let duration = 1000
pins.analogPitch(frequency, duration)
```

## Siehe auch

[@boardname@ pins](/device/pins), [setze analogen Tonpin](/reference/pins/analog-set-pitch-pin)