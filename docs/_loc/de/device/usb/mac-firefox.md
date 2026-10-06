# Hochladen von Firefox für Mac

Während du deine Programme schreibst und prüfst, wirst du diese meistens [im Simulator laufen lassen](/device/simulator), aber sobald du dein Programm fertiggestellt hast, kannst du es **compilieren** und auf deinem Calliope mini ausführen.

Die grundlegenden Schritte sind:

1. Schließe deinen Calliope mini über USB an deinen Computer an
2. Klicke auf **Herunterladen** und lade die `.hex`-Datei herunter
3. Kopiere die `.hex`-Datei vom Computer auf das Calliope mini-Laufwerk

## Voraussetzungen

Du benötigst die folgenden Dinge, um ein Programm auf deinen Calliope mini zu übertragen und auszuführen:

* Ein USB-Kabel um deinen Computer mit deinem Calliope mini zu verbinden. Das ist das gleiche Kabel, dass üblicherweise verwendet wird, um ein Smartphone mit einem Computer zu verbinden.
* Ein PC mit Windows 7 oder höher oder ein Mac mit OS X 10.6 oder höher

## Schritt 1: Verbinde deinen Calliope mini mit deinem Computer

Zunächst verbinde den Calliope mini:

1. Schließe das kleine Ende des USB-Kabels an den USB-Anschluss deines Calliope mini an.

2. Stecke das andere Ende des USB-Kabels in den USB-Port an deinem Computer.

Dein Computer sollte deinen Calliope mini als neues Laufwerk erkennen. Auf Computern, auf denen Windows läuft, wird `MINI` als Laufwerk unter Geräte und Laufwerke angezeigt. Auf einem Mac erscheint es als neues Laufwerk unter Laufwerke.

![](https://cdn.makecode.com/blob/16ee59aa14d97d3603fbbf565ff0a0d416c98946/static/mb/device/usb-osx-device.png)

## Schritt 2: Programm herunterladen

1. Öffne dein Projekt auf @homeurl@
2. Klicke auf **Herunterladen**
3. Wenn du dazu aufgefordert wirst, wähle **Speichern**, um die kompilierte Datei auf dem Computer zu speichern. Die Aufforderung unterscheidet sich je nachdem, welchen Browser du verwendest bzw. oder ob du einen Windows-Computer oder einen Mac verwendest

Es erscheint ein Dialogfenster, in dem du gefragt wirst, ob du die Hex-Datei öffnen oder speichern möchtest. Wähle **Datei speichern** und klicke auf **OK** und die Datei wird dann in angezeigt, in der oberen rechten Ecke des Browsers. Klicke mit der rechten Maustaste auf die Datei und wähle  **Im Finder anzeigen**, die Datei wird in deinem Download-Ordner angezeigt. Wähle die Datei aus und ziehe diese auf das `MINI` Laufwerk.

![](https://cdn.makecode.com/blob/eea0fad371b7cfbf3e7d2346c2dc6cfb301045f7/static/mb/device/usb-osx-firefox-1.jpg)

![](https://cdn.makecode.com/blob/97c38a688291e2f5b3f155da909a384b71ed10eb/static/mb/device/usb-osx-firefox-2.png)

## Schritt 3: Übertragen der Datei auf deinen Calliope mini

* Sobald du den Ordner gefunden hast, der die `.hex` Datei enthält, ziehen diese auf das `MINI` Laufwerk
* Die LED deines Calliope mini blinkt während der Übertragung (die nur ein paar Sekunden dauern sollte).
* Nach der Übertragung wird der Code automatisch auf deinem Calliope mini ausgeführt. Um dein Programm erneut auszuführen, drücke die Reset-Taste deines Calliope mini. Die Reset-Taste startet automatisch die Datei auf dem Calliope mini.

Indem du das Skript auf das `MINI` -Laufwerk kopiert hast, hast du es in den Flash-Speicher des Calliope mini programmiert, was bedeutet, dass auch nach dem Trennen des Calliope mini das Programm weiterhin ausgeführt wird, wenn der Calliope mini mit Batterie betrieben wird.

## ~hint

Transfer funktioniert nicht? Sieh dir einige [Tipps zur Fehlerbehebung](/device/usb/troubleshoot) an.

## ~