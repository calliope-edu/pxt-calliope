# Melodien komponieren

Das Komponieren von Klängen oder vielleicht Musik wird durch das Aneinanderreihen von Tönen erreicht. Eine _Melodie_ ist eine Abfolge dieser Töne, wobei jeder Ton für eine kurze Zeit gespielt wird, einer nach dem anderen, bis alle Noten gespielt wurden.

## Musiknoten

Eine _Note_ ist ein Ton, der als Teil der Musik erkannt wird. Eine Note hat einen Namen wie '**C**'. Eine Note wird für eine bestimmte Zeit gespielt, die als ihre _Dauer_ bezeichnet wird.

Auf deinem @boardname@ wird eine Note auf dem Lautsprecher gespielt, indem ein Signal mit einer bestimmten _Frequenz_ namens [Hertz](http://wikipedia.org/Hertz) gesendet wird. Frequenz ist, wie schnell etwas innerhalb einer Sekunde vibriert. Wenn du eine Glocke läutest, die dazu gemacht wurde, eine '**A**'-Note zu spielen, wird die Glocke mit 440 Hertz vibrieren (440 Mal pro Sekunde). Noten sind also nur bestimmte Frequenzen, die spezielle Namen haben.

### ~ hint

#### Musik mit Kopfhörern hören

Sieh dieses Video, um zu sehen, wie Lautsprecher und Kopfhörer klingen, wenn Sie mit deinem @boardname@ verbunden sind.

https://www.youtube.com/watch?v=cxfPNc4Wefo

### ~

In der Geschichte entstand Musik aus Tönen, die angenehm zu hören waren. Die Töne wurden auf Holz, Saiten, Metall und Häuten gespielt. Diese Töne bekamen Namen und wurden zu dem, was wir heute als Musiknoten kennen. Noten wurden benannt, damit wir sie aufschreiben und uns später erinnern konnten, wie sie gespielt werden.

## Wie werden Noten benannt?

Grundnoten haben Namen, die einen der ersten neun Buchstaben des Alphabets verwenden. Sie sind:

`|A|`, `|B|`, `|C|`, `|D|`, `|E|`, `|F|`, `|G|`

Es gibt andere Noten, die wie die Grundnoten benannt sind, aber zusätzliche Teile im Namen haben, die _Kreuz_ und _B_ genannt werden. Diese anderen Noten sind nur ein wenig anders als die Grundnoten und haben Frequenzen, die ein wenig höher oder niedriger als die Grundnote sind. Das macht die Musik ein wenig komplizierter, aber viel interessanter!

Einige dieser anderen Noten sehen so aus:

`|C#|`, `|Eb|`

Wenn eine kleine Menge Musik oder sogar ein Lied aufgeschrieben wird, nennt man das [Notenblatt](https://wikipedia.org/wiki/Sheet_music).

### ~ hint

#### Notennamen in verschiedenen Sprachen

Viele Sprachen außer Englisch verwenden unterschiedliche Namen für einige oder alle Musiknoten. MakeCode verwendet Englisch für Namen im Code.

### ~

## Klänge und Musik im Code

Natürlich können wir keine geschriebene Musik in unserem Code verwenden. Wir können Musik auf eine andere Weise machen. Der Weg dazu ist, Namen von Noten in [Zeichenketten](/types/string) zu setzen. Wir erstellen unsere Noten mit Buchstaben, Symbolen und Zahlen. Die Noten einer Melodie werden in einem Array zusammengefügt wie:

```block
let melody = ['E3:3', 'R:1', 'D#:3', 'R:1', 'D:4', 'R:1', 'C#:8']
```

Im JavaScript-Code sieht es so aus:

```typescript
let melody = ['E3:3', 'R:1', 'D#:3', 'R:1', 'D:4', 'R:1', 'C#:8']
```

Was du hier siehst, ist keine fremde Sprache, sondern eine Reihe von Noten mit ihrer Dauer. Die Form einer einzelnen Note ist **Note : Dauer** oder `'C:2'`. Das bedeutet, die Note '**C**' für **2** Schläge zu spielen. Die Noten werden nacheinander in einem Array platziert, mit einem Komma dazwischen, wie `'B:2', 'C#:6'`. Wenn du möchtest, dass eine Note für **4** Schläge gespielt wird, brauchst du keine Dauernummer zu verwenden (eine Note mit 4 Schlägen wird als _ganze_ Note bezeichnet). Sage einfach so etwas wie `'E'` ohne Doppelpunkt (lass das `':'` weg) und ohne Dauernummer.

Du wirst vielleicht bemerken, dass die Klangkette ein `'R:1'` enthält. Das '**R**' bedeutet _Pause_ und steht für eine Pause von einem Schlag. Eine Pause ist eine Unterbrechung oder eine Zeit der Stille im Klang.


### ~ hint

#### Dauer

Die Zeit, die eine Note gespielt wird (Dauer), wird in _Schlägen_ gemessen. Die Standardanzahl von _Schlägen pro Minute_ (bpm) in der Musik ist 120 bpm, was einer halben Sekunde Zeit entspricht. Eine _ganze_ Note dauert 4 Schläge und eine _Viertel_note dauert nur einen Schlag.

### ~

## Beispiel

Komponiere die ersten paar Noten von Beethovens 5.

```blocks
let beet5 = ['G:1', 'G:1', 'G:1', 'Eb', 'F:1', 'F:1', 'F:1', 'D']
```

## Siehe auch

[begin melody](/reference/music/begin-melody)

[Tempo](https://wikipedia.org/wiki/Tempo)