# Erste Schritte

## Anleitung @unplugged

### 1) Anschließen

Verbinde deinen mini mit deinem Computer über ein Mikro-USB-Kabel oder Bluetooth. Macs, PCs, Chromebooks, Linux-Systeme, Smartphones und Tablets werden unterstützt.

Dein Calliope mini wird auf deinem Computer als Laufwerk mit dem Namen 'MINI' angezeigt. Ein zweites Laufwerk mit dem Namen "FLASH" ist für die 25 Programme gedacht, die vorinstalliert auf dem Calliope mini enthalten sind (du kannst dieses Laufwerk natürlich auch mit eigenen Programmen bespielen).

Öffne deinen Lieblingsbrowser, besuche unsere Website und wähle in der Navigation unter dem Punkt "Programmieren" den Link "Editoren" aus.

Ziehe als Beispiel einige Blöcke und teste dein Programm auf dem Simulator innerhalb des Editors.

Klicke auf die Schaltfläche "Download" im Editor. Dies wird eine "hex" Datei herunterladen, die ein kompaktes Format deines Programms ist, das dein Calliope mini lesen kann. Sobald die Datei heruntergeladen wurde, kopieren sie einfach auf das Laufwerk "MINI", wie das Kopieren einer Datei auf einen USB-Stick. Der Calliope mini kopiert das Program direkt in den Prozessor, meldet sich dann von deinem Rechner ab (weil er neugestartet wird) und startet anschließend mit deinem Programm.

![Connecting Image](https://cdn.makecode.com/blob/9ea754eb1bfe159b0eb37eacf9ad297b735235bf/static/calliope/firststeps/connecting.jpg)


## Anleitung @unplugged

### 2) Stromversorgung

Der Calliope mini benötigt eine Stromquelle, um zu funktionieren. Du kannst Deinen Calliope mini entweder direkt an einen Computer mit einem Micro USB-Kabel anschließen oder mit einem Batteriepack versorgen. Hier sind die Anweisungen, wie man den Batteriekasten mit Deinem Calliope mini verbindet:

Der mitgelieferte Batteriehalter benötigt zwei AAA-Batterien.

Führe den kleinen weißen Kunststoffstecker des Batteriekastens vorsichtig in die Batteriesteckers des Calliope mini ein.

Achte darauf, dass der Kamm, also die kleine Nase auf dem Stecker nach oben gerichtet ist.

Wenn der Stecker leicht in den Konnektor gleitet, dann hast du es richtig gemacht. Andernfalls drehe den Stecker um und stecke ihn wieder in die Batteriesteckdose. Schieben ihn auf "on" und Dein Calliope mini wird durch die Batterien mit Strom versorgt.

![Powering Image](https://cdn.makecode.com/blob/4efa97d771cbb7e9c635e70b25851b401f91c2c2/static/calliope/firststeps/powerItUp.png)


## Anleitung @unplugged

### 3) Spielen!

Du kannst jetzt herumspielen oder einige unserer anderen geführten Erste-Schritte-Anleitungen ausprobieren...

[Lerne deinen Namen auf der LED-Matrix zu schreiben](#tutorial:/calliope/firststeps/5x5LED)

[Spiele mit Farben und Klang](#tutorial:/calliope/firststeps/Output)

[Erfahre, wie du deinen Mini mit den Tasten und Pins steuerst](#tutorial:/calliope/firststeps/Inputs)


## Schritt 1

Spielen!

Du kannst jetzt herumprobieren oder einige unserer anderen geführten Erste-Schritte-Anleitungen ausprobieren...

[Lerne deinen Namen auf der LED-Matrix zu schreiben](#tutorial:/calliope/firststeps/5x5LED)

[Spiele mit Farben und Klang](#tutorial:/calliope/firststeps/Output)

[Erfahre, wie du deinen Calliope mini mit den Tasten und Pins steuerst](#tutorial:/calliope/firststeps/Inputs)

```blocks
basic.showLeds(`
    . # . # .
    # # # # #
    # # # # #
    . # # # .
    . . # . .`);
```