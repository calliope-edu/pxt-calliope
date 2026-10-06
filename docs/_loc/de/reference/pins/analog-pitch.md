# Analoge Tonhöhe einstellen

Sendet ein Signal durch Pulsweitenmodulation (PWM-Signal) an die Pin `P0</0.</p>

<pre><code class="sig">pins.analogPitch(440, 300)
`</pre> 

Das PWM-Signal wird an die aktuelle Pin-Tonhöhe gesendet. Verwende[analog set pitch pin](/reference/pins/analog-set-pitch-pin), um zuerst die aktuelle Pin-Tonhöhe einzustellen.

## Parameter

* Mit **Frequenz** ist eine [Anzahl](/types/number) der PWM-Signalfrequenz an einer Pin-Tonhöhe gemeint.
* Mit **ms** ist die [Anzahl](/types/number) der Perioden (in Millisekunden berechnet) beziehungsweise die Periodendauer des Signals an der Pin-Tonhöhe gemeint.

## Beispiel

Stelle den Pitch-Pin auf `P1` um einen 440-Hz-Ton für eine Sekunde zu senden.

```blocks
pins.analogSetPitchPin(AnalogPin.P0)
let frequency1 = 440
let duration = 1000
pins.analogSetPitchPin(AnalogPin.P1)
pins.analogPitch(frequency1, duration)
```

## Hinweise

* 440 = A4 auf dem Klavier
* siehe [Klaviertastenfrequenzen](https://en.wikipedia.org/wiki/Piano_key_frequencies) für weitere Informationen

## Siehe auch

[@boardname@ pins](/device/pins), [analog set period](/reference/pins/analog-set-period), [analog set pitch pin](/reference/pins/analog-set-pitch-pin)