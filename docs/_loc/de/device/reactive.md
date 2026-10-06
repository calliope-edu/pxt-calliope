# Der Calliope mini - ein reaktives System

## Computing-Systeme

Was für eine Art von *Computing-System* ist der Calliope mini?

### ~hint

#### Arten von Rechnersystemen

Es gibt verschiedene Arten von Rechnersystemen, um verschiedene Arten von Problemen anzugehen, die in der Praxis auftreten: *Transaktionssysteme* werden von Banken verwendet, um eine große Anzahl von Finanztransaktionen durch ihre Kunden zu verwalten; *verteilte Systeme* lassen einen Satz vernetzter Computer als einen großen Computer erscheinen (wie die Suchmaschine von Google); es gibt auch *parallele Systeme*, wie Grafikkarten, die eine große Anzahl primitiver Operationen gleichzeitig mit einer großen Anzahl kleiner Verarbeitungskerne durchführen.

### ~

Der Calliope mini ist ein *reaktives System* – es reagiert kontinuierlich auf externe Ereignisse B. eine Person, die die **A** Taste des Calliope mini drückt, oder das Gerät schütteln. Die Reaktion auf ein Ereignis kann sein, dass eine Berechnung, Veränderung von Variablen oder Änderung der Anzeige durchgeführt wird.  Nachdem das Gerät auf ein Ereignis reagiert hat, ist es bereit, auf das nächste zu reagieren. Wenn das nach einem Computerspiel klingt, dann liegt das daran, dass die meisten Computerspiele auch reaktive Systeme sind!

## Reaktionsfähigkeit

Wir wollen, dass reaktive Systeme reagieren, also rechtzeitig auf Ereignisse zu reagieren. Wenn du beispielsweise ein Computerspiel spielst, ist es frustrierend, wenn du einen Knopf drückst, um einen Charakter zu bewegen, dieser sich dann aber nicht direkt bewegt. Eine Verzögerung der Reaktion oder mangelnde Reaktionsfähigkeit kann der Unterschied zwischen Leben und Tod sowohl in der realen als auch in der virtuellen Welt sein.

Nehmen wir ein einfaches Beispiel: Du möchtest deinen Calliope mini programmieren, um die Anzahl der Male, die die **A** Taste gedrückt wurde, genau zu erfassen und die aktuelle Anzahl auf der 5x5 [LED-Matrix](/device/screen) kontinuierlich anzeigen.   Da die LED-Matrix klein ist, können wir nur eine Ziffer einer Zahl gleichzeitig darauf anzeigen. Die [zeige Zahl](/reference/basic/show-number) Funktion scrollt die Ziffern einer Zahl über die Matrix, so dass du diese lesen kannst.

Nehmen wir an, dass der aktuelle Zähler 42 ist und die Zahl 42 über die LED-Matrix scrollt. Das bedeutet, dass es einen Code gibt, der ausgeführt wird, um das Scrollen durchzuführen. Was sollte also passieren, wenn du während des Scrolls die **A** Taste drückst? Es wäre eine schlechte Idee, die Taste zu ignorieren, so dass der Code das Auftreten der Tastendruck aufzeichnen sollte. Aber wir haben gerade gesagt, es läuft bereits Code, um die Nummer 42 anzuzeigen! Wenn wir warten, bis der Code mit dem Scrollen der 42 fertig ist und dann nach einem Knopfdruck gesucht wird, verpassen wir den Tastendruck. Wir wollen eine solche Unnachgiebigkeit vermeiden.

## Parallelität

Um reagieren zu können, muss ein reaktives System in der Lage sein, mehrere Dinge gleichzeitig zu tun (gleichzeitig), genau wie du es kannst.  Aber der Calliope mini hat nur eine CPU für die Ausführung des Programms, das heißt, er kann nur eine Programmanweisung gleichzeitig ausführen. Er kann jedoch Millionen von Anweisungen in nur einer Sekunde ausführen. Dies weist den Weg zu einer Lösung.

Stell dir vor, dass er wie ein Kino-Projektor funktioniert - er erstellt nur 24 Frames pro Sekunde, aber dies reicht, um die Illusion der flüssigen Bewegung auf Leinwand wiederzugeben. Der Calliope mini kann Millionen von Anweisungen pro Sekunde ausführen, so scheint es durchaus möglich, dass das Gerät sowohl die Zahl 42 über die LED-Matrix scrollen kann und dazu Ausschau nach einem Tastendruck halten kann und die Anzahl der Betätigungen speichert.

Stellen wir uns drei Abläufe von Anweisungen vor:

* Sequenz **S1**: enthält die Anweisungen (sagen wir einige Hunderttausend oder so), die die Nummer 42 über die LED-Matrix scrollen.
* Sequenz **S2**: enthält ein paar Anweisungen um zu überprüfen, ob Button **A** gedrückt wird.
* Sequenz **S3**: enthält ein paar Anweisungen, um einen Zähler zu erhöhen.

Um schnell reagieren zu können, möchten wir die Ausführung der Sequenz **S1** *periodisch* *unterbrechen*  um die Sequenz **S2**auszuführen. Diese überprüft, ob die Taste **A** gedrückt wird und wie folgt aussieht:

![Execution sequence diagram: S1 and S2](https://cdn.makecode.com/blob/d0b9aaebcb5c60acc8c90736f608cbf6ab3c1d31/static/mb/device/reactive-0.png)

Das Ergebnis ist, dass die Sequenz **S1** etwas länger dauert, bis sie fertig ist. Aufgrund der Unterbrechungen, die die Sequenz **S2**ausführen sollen, aber wir überprüfen oft genug, um die gedrückte Taste **A** zu erkennen. Wenn **S2** eine Tastendruck auf Taste **A**erkennt , dann kann die Sequenz **S3** ausgeführt werden, bevor **S1** wieder fortfährt:

![Execution sequence diagram: S1 and S2 with interrupt and one S3 slice](https://cdn.makecode.com/blob/00c61ffb633cf9f92597b149c4bf2207364de3a8/static/mb/device/reactive-1.png)

Wie wir bald sehen werden, gibt es weitere Möglichkeiten, wie die Sequenzen geordnet werden können, um das gewünschte Ergebnis zu erzielen.

## Der Calliope mini Zeitplaner und die Warteschlange für Unterprogramme

Der Calliope mini *Zeitplaner* bietet die Möglichkeit, gleichzeitig verschiedene Code-Sequenzen auszuführen und uns von einer Menge Low-Level-Programmierung zu befreien.   Tatsächlich ist der Zeitplaner so nützlich, dass er Teil jedes *-Betriebssystems* ist!

Der erste Auftrag des Zeitplaners besteht darin, mehrere *Unterprogramme* für eine spätere Ausführung in die Warteschlange zu stellen. Für unsere Zwecke ist ein Unterprogramm nur eine Anweisung oder eine Abfolge von Anweisungen im Kontext eines größeren Programms. Betrachten Sie das folgende Programm für die Zählung der Tastendrucke.

```typescript-ignore
let count = 0

input.onButtonEvent(Button.A, input.buttonEventValue(ButtonEvent.Down), () => {
    count++;
})

basic.forever(() => {
    basic.showNumber(count)
})
```

Das obige Programm enthält drei Anweisungen, die in der Reihenfolge von oben nach unten ausgeführt werden. Die erste Anweisung initialisiert die globale Variable `count` auf Null.

```typescript-ignore
// Anweisung 1
let count = 0
```

Die zweite Anweisung teilt dem Zeitplaner mit, dass bei jedem Ereignis der **A** Taste gedrückt wird ein Unterprogramm (Event-Handler) sollte zur Ausführung in der Warteschlange stehen. Der Event-Handler-Code ist in den Klammern `{...}`enthalten; er erhöht die globale Variable `count` um eins.

```typescript-ignore
// Anweisung 1
let count = 0
// Anweisung 2
input.onButtonEvent(Button.A, input.buttonEventValue(ButtonEvent.Down), () => {
    count++;
})
```

Die dritte Anweisung wartet eine `dauerhaft` Schleife für eine spätere Ausführung durch den Zeitplaner; der Körper dieser Schleife (auch innerhalb der Klammern `{...}`) zeigt den aktuellen Wert der globalen Variable `count` auf der LED-Matrix an.

```typescript-ignore
// Anweisung 1
let count = 0
// Anweisung 2
input.onButtonEvent(Button.A, input.buttonEventValue(ButtonEvent.Down), () => {
    count++;
})
// Anweisung 3
basic. orever(() => {
    basic.showNumber(count)
})
```

Es gibt keine weiteren Anweisungen nach der Ausführung dieser drei Anweisungen, aber dies ist nicht das Ende der Programmausführung! Das liegt daran, dass das Programm die `dauerhaft` Schleife zur Ausführung durch den Zeitplaner eingereiht hat (und einen Ereignis-Handler für Tastendruck A registriert hat).

Die zweite Aufgabe des Zeitplaners besteht darin, die Ausführung regelmäßig zu unterbrechen, um die verschiedenen Eingänge des Calliope mini (die Tasten, Pins usw.) zu lesen (polling) und Ereignisse auszulösen (z. B. "Taste A gedrückt"). Denke daran, dass das Abfeuern eines Ereignisses dazu führt, dass das mit diesem Ereignis verbundene Ereignis-Handler-Unterprogramm für eine spätere Ausführung in der Warteschlange steht. Der Zeitplaner verwendet einen in den Calliope mini eingebauten Timer, um die Ausführung alle 6 Millisekunden zu unterbrechen und die Eingaben zu befragen, die mehr als schnell genug ist, um das schnellste Drücken eines Knopfes zu erhalten.

## Kontrolle der Ausführung übergeben

Wie wird die `dauerhaft` Schleife gestartet? Wenn die `dauerhaft`-Schleife einmal läuft, wie kann dann ein anderes Unterprogramm (z.B. der Event-Handler, der die Zählung erhöht) jemals ausgeführt werden?

Die Antwort lautet „Zusammenarbeit“ und „Weitergehen“. Stelle dir eine Fußballmannschaft vor, die eine Übung durchführt - es gibt einen Ball, und jeder Fußballspieler darf den Ball eine bestimmte Anzahl von Berührungen dribbeln und ihn dann an einen anderen Fußballspieler weitergeben. Ein Fußballspieler, der nie passt, hindert alle anderen Fußballer daran, zu dribbeln. Ein Fußballer mit Sinn für Zusammenarbeit gibt den Ball immer an einen anderen Fußballer weiter, nachdem er ein paar Berührungen gemacht hat.

Falls du es noch nicht erraten hast: Ein Fußballspieler stellt ein Unterprogramm dar, und das Dribbeln des Balls entspricht der Ausführung dieses Unterprogramms. Nur ein Unterprogramm wird gleichzeitig ausgeführt, da es nur einen Ball (Prozessor) gibt. Wenn die Fußballspielerin Alice dem Fußballspieler Bob den Ball zuspielt, wird die Ausführung von Alices Unterprogramm gestoppt (und die Stelle, an der es gestoppt wurde, gespeichert) und die Ausführung von Bobs Unterprogramm gestartet/fortgesetzt.

Wir nennen dies "Kontrolle der Ausführung übergeben" und nicht "den Ball übergeben".  In der Welt des Calliope mini wissen die gleichzeitig ausgeführten Unterprogramme jedoch nichts voneinander, so dass sie die Kontrolle nicht direkt aneinander weitergeben.  Vielmehr geben sie die Ausführungskontrolle an den Zeitplaner zurück, und der Zeitplaner bestimmt, an welches Unterprogramm er die Kontrolle als nächstes weitergibt.  Der Programmierer fügt einen Aufruf der Funktion `Pause` ein, um einen Punkt im Unterprogramm anzugeben, an dem die Kontrolle über die Ausführung an den Scheduler übergeht. Wenn ein Unterprogramm die Ausführung beendet, wird die Kontrolle an den Zeitplaner übergeben.

Werfen wir einen Blick auf die Implementierung der `basic.forever` Funktion, um ein Beispiel für kooperative Zeitplanung zu sehen:

```typescript-ignore
function forever_(body: () => void) {
    control.inBackground(() => {
        while(true) {
            body()
            basic.pause(20)
        }
    })
}
```

Die `dauerhaft` Schleife ist eine Funktion, die ein Unterprogramm (eine andere Funktion) als Parameter verwendet. Die Funktion verwendet die `control.inBackground` Funktion der Calliope mini Laufzeit zur Warteschlange eines `while true` Schleife zur Ausführung durch den Zeitplaner verwendet wird. Die while Schleife hat zwei Anweisungen. Die erste Anweisung führt das Unterprogramm aus, das durch den `Körper` Parameter repräsentiert wird. Die zweite Anweisung übergibt die Kontrolle an den Zeitplaner (fordert 20 Millisekunden „sleep“ an).

Obwohl die `while true` Schleife wiederholt das Unterprogramm des Körpers ausführt, zwischen jeder Ausführung des Körpers erlaubt es dem Zeitplaner, andere Unterprogramme auszuführen. Wenn die while-Schleife nicht den Aufruf von `pause` enthielte, würde die Kontrolle, sobald sie in die while-Schleife gelangt ist, nicht mehr an den Zeitplaner zurückgegeben, und kein anderes Unterprogramm könnte ausgeführt werden (es sei denn, das Unterprogramm enthält selbst einen Aufruf von `pause`).

### ~hint

#### Pausen innerhalb von Blöcken

Bestimmte Blöcke können in ihrem Code eine `Pause` enthalten, damit die Ausführungssteuerung an den Scheduler zurückgegeben wird. Wenn beispielsweise ein Gerät mit dem Code in einem Block interagiert, kann die Steuerung an den Scheduler zurückgegeben werden, damit andere Unterprogramme ausgeführt werden können, während das Gerät Zeit für die Antwort benötigt.

### ~

## Round-Robin-Planung

Jetzt kommen wir zur dritten und letzten Aufgabe des Zeitplaners, diese Aufgabe ist es zu bestimmen, welches Unterprogramm die Kontrolle an die nächste übergeben wird. Der Zeitplaner verwendet zwei Warteschlangen, um diese Aufgabe auszuführen, die Sleep-Warteschlange und die Run-Warteschlange. Die Sleep-Warteschlange enthält die Unterprogramme, die die Pause-Funktion aufgerufen haben und noch Zeit zum Schlafen haben. Die Run-Warteschlange enthält alle nicht-schlafenden Unterprogramme, wie zum Beispiel die Ereignis-Handler, die durch das Abfeuern eines Ereignisses in der Warteschlange stehen.

Der Zeitplaner verschiebt das gerade pausierte Unterprogramm in die Schlaf-Warteschlange und entfernt dann das Unterprogramm an der Spitze der Warteschlange und setzt seine Ausführung fort. Sobald die Ruhezeit eines Unterprogramms abgelaufen ist, verschiebt der Zeitplaner sie von der Schlaf-Warteschlange an das Ende der Warteschlange.

Die Eigenschaft einer solchen Round-Robin-Zeitplanung liegt in der Annahme, dass jedes Unterprogramm regelmäßig in die Schlaf-Warteschlange eintritt. Dann erhält jedes Unterprogramm in regelmäßigen Abständen eine Möglichkeit zur Ausführung.

## Und jetzt alles zusammen

Gehen wir zum `-Tasten-Zählen` Programm zurück und überprüfen die Ausführung anhand dessen, was wir über den Calliope mini Zeitplaner erfahren haben. Wie bereits erwähnt, führt das Programm drei Schritte aus:

1. Die erste Anweisung initialisiert die globale Variable `count` auf Null
2. Ereignis-Handler für jeden druck auf Taste **A** einrichten
3. Die dauerhaft-Schleife zur laufenden Warteschlange anfügen

Das Programm beendet dann die Ausführung und die Kontrolle geht an den Zeitplaner zurück. Nehmen wir an, die Benutzerin oder der Benutzer hat keine Tasten gedrückt. Der Zeitplaner findet die `dauerhaft` Schleife in der Warteschlange und übergibt die Kontrolle an sie. Die Schleife ruft zuerst `basic.showNumber(0)` auf. Im folgenden Diagramm verwenden wir "Zeige 0", um auf die Ausführung dieser Funktion zu verweisen:

![Execution sequence diagram: display loop with increment and interrupt](https://cdn.makecode.com/blob/f9f6f4b7a6b3de5f3586af9ddf365e7ab70cd371/static/mb/device/reactive-3.png)


Während "Show 0" (die blaue Sequenz) läuft, werden periodische Unterbrechungen durch den Zeitplaner (alle 6 Millisekunden) auf Tastendrücke abgefragt und ein Event-Handler für jeden Druck auf die Taste **A** in die Warteschlange gestellt. Nehmen wir an, dass während dieser Zeit eine Taste gedrückt wird, wie oben gezeigt. Dies wird dazu führen, dass ein Ereignishandler (als „inc“ bezeichnet) für eine spätere Ausführung durch den Planer in der Warteschlange steht. Sobald die "Show 0" abgeschlossen ist, ruft die Schleife `basic.pause(20)` um die dauerhaft Schleife für 20 Millisekunden zu pausieren und dem Zeitplaner die Möglichkeit zu geben, jeden neu eingereihten Event-Handler auszuführen. Die Steuerung wird an den "inc" Ereignis-Handler übergeben, der die globale Variable `count` von 0 auf 1 erhöht und dann vervollständigt, gibt die Kontrolle an den Planer zurück. Irgendwann wechselt die `dauerhaft`-Schleife von der sleep-Warteschlange in die run-Warteschlange; die `dauerhaft`-Schleife wird dann wieder aufgenommen und ruft `basic.showNumber(1)` auf.

## Schlusskommentare

Anhand dieses Beispiels haben wir gesehen, dass der Calliope mini Zeitplaner es dir ermöglicht, ein Programm zu erstellen, das aus gleichzeitigen Unterprogrammen besteht. Im Wesentlichen muss die Programmiererin oder der Programmierer nur daran denken, dass die nebenläufigen Unterprogramme die Kontrolle kooperativ an den Zeitplaner zurückgeben und sicherstellen, dass kein Unterprogramm die Kontrolle zu lange an sich reißt (oder "den Ball dribbelt, ohne ihn abzugeben"). Während ein Unterprogramm läuft, fragt der Zeitplaner die Tasten und andere IO-Peripheriegeräte in hoher Frequenz ab, um Ereignisse auszulösen und Event-Handler für die spätere Ausführung in eine Warteschlange zu stellen.

So kannst du dem Calliope mini ganz einfach eine neue Funktionalität hinzufügen, indem du einfach ein neues Unterprogramm hinzufügst. Wenn du beispielsweise dem Zählerprogramm eine Rücksetzfunktion hinzufügen möchtest, musst du lediglich einen neuen Event-Handler für das Drücken der Taste **B** hinzufügen, der die globale Variable "count" auf Null setzt, wie unten gezeigt:

```typescript-ignore
let count = 0

input.onButtonEvent(Button.A, input.buttonEventValue(ButtonEvent.Down), () => {
    count = count + 1
})

basic.forever(() => {
    basic.showNumber(count)
})

input.onButtonEvent(Button.B, input.buttonEventValue(ButtonEvent.Down), () => {
    count = 0
})
```