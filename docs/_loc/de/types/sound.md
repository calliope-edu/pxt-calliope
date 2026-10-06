# Sound

Ein Sound ist ein Datenobjekt, das aus einem Soundausdruck erstellt wird. Ein Soundausdruck ist eine Gruppe von Parametern, die einen Sound definieren, wie Wellenform, Lautstärke, Frequenz und Dauer.

Ein Sound wird aus einem Ausdruck basierend auf einer grundlegenden Wellenform oder Wellenform erzeugt. Um eine Schallwelle zu erzeugen, müssen die Sounddaten über einen Zeitraum von einem hohen Gipfel zu einem tiefen Tal wechseln und sich wiederholen. Die Gipfel und Täler sind die positiven und negativen Amplituden der Welle über der Nulllinie. Die Lautstärke steuert die Amplitude der Welle.

Wenn der Sound über einen Lautsprecher oder Kopfhörer abgespielt wird, erzeugen die Vibrationen den Druck, den unsere Ohren als Sound wahrnehmen.

### ~ hint

#### Sounds und Soundausdrücke

Im Code ist ein **Sound** Typ ein komplexes Datenobjekt, das Daten für alle Elemente enthält, die einen Ton repräsentieren. Dies umfasst Informationen über die Frequenzen und Lautstärken zu verschiedenen Zeitpunkten für die Dauer des Sounds. Ein **SoundExpression** ist ein weiterer Datentyp, der dazu beiträgt, einen **Sound** zu erstellen. Er hat die Elemente, wie man den Sound macht. Viele davon gibst du an, wenn du einen Sound bearbeitest.

Der Code zum Erstellen und Abspielen eines Sounds aus einem Soundausdruck könnte so aussehen:

```typescript-ignore
let mySound = music.createSoundExpression(WaveShape.Sine, 2000, 0, 1023, 0, 500, SoundExpressionEffect.None, InterpolationCurve.Linear)
music.play(mySound, music.PlaybackMode.UntilDone)
```

### ~

## Soundbearbeitung

When you click on the waveform in the `||music:play sound||` block, the sound editor will display. The sound editor defines the sound expression parameter with choices for the **waveform**, sound **duration** time, **frequency** range, **volume** range, **effect**, and **interpolation**.

![Sound Editor](https://makecode.com/not-found/HEAD/static/types/sound/sound-editor.png)

Sowohl die Frequenz als auch die Lautstärke können über die Dauer des Sounds mit unterschiedlichen Werten beginnen und enden.

## Wellenform

Die Wellenform wird gewählt, um einen natürlichen oder synthetischen Klang zu erzeugen. Einige Wellenformen können auch dazu dienen, Signale zu erzeugen, wenn sie an einen Pin gespielt werden, anstatt an einen Lautsprecher oder Kopfhörer.

### Sinuswelle

Die Wellenform, die dem natürlichen Klang entspricht, ist die Sinuswelle. Dies ist der Wellentyp in Musik und Stimme.

![Sine wave](https://makecode.com/not-found/HEAD/static/types/sound/sine-wave.png)

### Sägezahnwelle

Eine Sägezahnwelle hat eine vertikale ansteigende Kante und eine lineare abfallende Kante. Ihre Form ähnelt den Zähnen einer Säge.

![Sawtooth wave](https://makecode.com/not-found/HEAD/static/types/sound/sawtooth-wave.png)

### Dreieckswelle

Die Dreieckswelle hat symmetrische ansteigende und abfallende Kanten. Sie bildet die Form von Dreiecken in der Wellenform.

![Triangle wave](https://makecode.com/not-found/HEAD/static/types/sound/triangle-wave.png)

### Rechteckwelle

Eine Rechteckwelle hat sowohl vertikale ansteigende als auch abfallende Kanten mit einem flachen Abschnitt oben und unten. Die flachen Abschnitte entsprechen der eingestellten Lautstärke für den Klang. Rechteckwellen werden manchmal verwendet, um digitale Daten darzustellen und erzeugen einen "elektronischen" Klang.

![Square wave](https://makecode.com/not-found/HEAD/static/types/sound/square-wave.png)

### Rauschwelle

Die Rauschwelle wird mit zufälligen Frequenzen und Lautstärken erstellt. Das Einstellen der Frequenzparameter für den Soundausdruck schafft einen "Abstimmungsbereich" für den Rausch-Soundeffekt.

![Noise wave](https://makecode.com/not-found/HEAD/static/types/sound/noise-wave.png)

## Dauer

Der Sound hat eine Länge der Zeit, für die er abgespielt wird. Dies wird in Millisekunden (ms) festgelegt.

## Lautstärke

Die Lautstärke steuert die Lautheit (Amplitude) des Sounds. Der Sound kann mit einer Lautstärkeeinstellung beginnen und mit einer anderen enden. Er kann laut beginnen und leise enden oder umgekehrt. Die Lautstärkeregelung hat Start- und Endpunkte, die höher und niedriger eingestellt werden können. Greife sie und bewege sie nach oben oder unten.

### Von hoch nach niedrig

![Volume from high to low](https://makecode.com/not-found/HEAD/static/types/sound/volume-hilo.png)

### Von niedrig nach hoch

![Volume from low to high](https://makecode.com/not-found/HEAD/static/types/sound/volume-lohi.png)

### Konstante Lautstärke

![Constant volume](https://makecode.com/not-found/HEAD/static/types/sound/volume-constant.png)

## Frequenz

Die Frequenz ist, wie schnell eine Welle sich von der Nulllinie zu ihrem Gipfel, hinunter zu ihrem Tal und zurück zur Nulllinie wiederholt. Wenn sie dies 1000 Mal in einer Sekunde tut, dann hat die Frequenz 1000 Zyklen pro Sekunde und wird in Einheiten von Hertz (1000 Hz) gemessen. Die Frequenz des Sounds zu jedem Zeitpunkt ist seine aktuelle Tonhöhe. Musiknoten und Teile der Sprache sind unterschiedliche Frequenzen, die für kurze Zeiträume in einem Sound andauern.

Ein Soundausdruck hat sowohl eine Startfrequenz als auch eine Endfrequenz. Die Frequenz kann niedrig beginnen und hoch enden, hoch beginnen und niedrig enden oder für die Dauer des Sounds gleich bleiben.

### Von hoch nach niedrig

![Frequency from high to low](https://makecode.com/not-found/HEAD/static/types/sound/freq-hilo.png)

### Von niedrig nach hoch

![Frequency from low to high](https://makecode.com/not-found/HEAD/static/types/sound/freq-lohi.png)

### Effekt

Effekte fügen kleine Änderungen an der Wellenform hinzu, können aber eine große Veränderung darstellen, wie sie für einen Zuhörer klingt. Es gibt einige Effekte, die auf einen Sound angewendet werden können.

- \*\*Tremolo: fügt leichte Änderungen in der Lautstärke des Soundausdrucks hinzu.

> ![Tremolo effect setting](https://makecode.com/not-found/HEAD/static/types/sound/effect-tremolo.png)

- \*\*Vibrato: fügt leichte Änderungen in der Frequenz des Soundausdrucks hinzu.

> ![Vibrato effect setting](https://makecode.com/not-found/HEAD/static/types/sound/effect-vibrato.png)

- \*\*Warble: ähnlich wie Vibrato, aber mit schnelleren Variationen in den Frequenzänderungen.

> ![Warble effect setting](https://makecode.com/not-found/HEAD/static/types/sound/effect-warble.png)

### Interpolation

Interpolation ist die Art und Weise, wie der Soundausdruck die Änderungen in Frequenz oder Lautstärke des Sounds vornimmt. Diese Änderungen können während der Dauer des Sounds zu einer konstanten Rate oder plötzlicher am Anfang auftreten.

- \*\*Linear: Die Änderung der Frequenz ist konstant für die Dauer des Sounds.

> ![Frequency from low to high](https://makecode.com/not-found/HEAD/static/types/sound/interp-linear.png)

- \*\*Kurve: Die Änderung der Frequenz ist zu Beginn des Sounds schneller und verlangsamt sich zum Ende hin.

> ![Frequency from low to high](https://makecode.com/not-found/HEAD/static/types/sound/interp-curve.png)

- \*\*Logarithmisch: Die Änderung der Frequenz ist während des allerersten Teils des Sounds schnell.

> ![Frequency from low to high](https://makecode.com/not-found/HEAD/static/types/sound/interp-log.png)

## Siehe auch

[play](/reference/music/play),
[create sound expression](/reference/music/create-sound-expression)