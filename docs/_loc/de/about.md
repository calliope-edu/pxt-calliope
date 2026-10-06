![](https://cdn.makecode.com/blob/413359adf5b1487dc4e538c190f8bcc5f0510e12/static/mb/device/calliope_website.jpg)

# Über

## @description Calliope mini – der kleine Computer für große Ideen! Der Calliope mini kann mit diesem Block/JavaScript-Code-Editor programmiert werden.

Der Calliope mini hat eine LED-Matrix, RGB-LED, Lautsprecher, Sensoren und Bluetooth.

Das Calliope mini bietet eine einfache und lustige Einführung in die Programmierung und das Erstellen von einschalten und direkt mit Spaß etwas programmieren tragen und anpassen. Genau wie ein Arduino kann auch der Calliope mini mit Sensoren, Displays und anderen Geräten verbunden werden und mit diesen interagieren.

* [Dokumentation](/docs)

## [Hardware: das Gerät](/device)

Der Calliope mini ist mit Sensoren, Funk und weiterem ausgestattet. Erfahre mehr zu den [Hardwarekomponenten]([/device](https://calliope.cc/en/calliope-mini/tech-facts)) des Calliope mini, um das Beste daraus zu machen!

## ~ hint

**Du möchtest einen Calliope mini kaufen?** Hier findest du [Geschäfte, bei denen du den Calliope mini direkt bestellen kannst](https://calliope.cc/en/shops).

## ~

## Programmierung: [Blocks](/blocks) oder [JavaScript](/javascript)

Du kannst den Calliope mini mit [Blocks](/blocks) oder [JavaScript](/javascript) im Webbrowser über die [Calliope mini APIs](/reference) programmieren:

```block
input.onButtonEvent(Button.A, input.buttonEventValue(ButtonEvent.Down), () => {
    basic.showString("Hi!");
})
```

```typescript
input.onButtonEvent(Button.A, input.buttonEventValue(ButtonEvent.Down), () => {
    basic.showString("Hi!");
})
```

Der Editor arbeitet in [modernsten Browsern](/browsers), einmal geladen funktioniert er [offline](/offline) und benötigt keine Installation.

## [Kompilieren und Flashen: Dein Programm!](/device/usb)

Wenn du deinen Code fertig hast, verbinde deinen Calliope mini über ein USB-Kabel mit dem Computer, so erscheint er als ein USB-Laufwerk (mit dem Namen MINI). Wenn du den Calliope mini REV2 verwendest, siehst du auch ein weiteres Laufwerk (FLASH).

Die Kompilierung zum ARM Maschinencode von [Blocks](/blocks) oder [JavaScript](/javascript) erfolgt im Browser. Du speicherst das ARM-Binärprogramm in eine Hex-Datei, die du dann auf das MINI-Laufwerk kopierst.

## Simulator: Teste deinen Code

Du kannst deinen Code mit dem Calliope mini-Simulator ausführen. Der Simulator unterstützt den LED-Bildschirm, Tasten sowie Kompass, Beschleunigungssensor und digitale I/O-Pins.

```sim
basic.forever(() => {
  basic.showString("Hi!");
})
input.onButtonEvent(Button.A, input.buttonEventValue(ButtonEvent.Down), () => {
    led.stopAnimation();
    basic.showLeds(`
. . . . .
. # . # .
. . . . .
# . . . #
. # # # .`);
});
input.onButtonEvent(Button.B, input.buttonEventValue(ButtonEvent.Down), () => {
    led.stopAnimation();
    basic.showLeds(`
. # . # .
# . # . #
# . . . #
. # . # .
. . # . .`);
});
```

## Lerne!

We have tons of [projects](/projects) and [examples](/examples) to get your started!

## C++ Runtime

Die [C++ Calliope mini runtime](http://lancaster-university.github.io/microbit-docs/), wurde an der [Lancaster Universität](http://www.lancaster.ac.uk/) erstellt, bietet Zugriff auf die Hardwarefunktionen des Calliope mini, sowie eine Reihe von Hilfsfunktionen (z. B. Anzeige von Zahlen, Bildern und Strings auf der LED-Matrix).

Die [Calliope mini-Bibliothek](/reference) spiegelt die Funktionen der C++-Bibliothek wieder. Wenn Code zu ARM-Maschinencode kompiliert wird, werden die Aufrufe von JavaScript Calliope mini Funktionen durch Aufrufe der entsprechenden C++-Funktionen ersetzt.

## [Kommandozeilentools](/cli)

Du möchtest @homeurl@ in deinem Lieblingseditor verwenden? Installiere die [Komandozeilentools](/cli) und los geht's!

## [Erweiterungen](/extensions)

Erstellen, bearbeiten und verteile deine eigenen Blöcke und JavaScripts mit [Paketen](/extensions). Die Pakete werden auf GitHub gehostet und können mit C++, JavaScript und/oder ARM Thumb geschrieben werden.

## [Open-Source](/open-source)

Der Code für den Calliope mini ist [Open Source](/open-source) auf GitHub. Mitwirkende sind willkommen!

```package
Funk
```