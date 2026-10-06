# Hochladen von Firefox unter Windows

Wie man ein Programm für den Calliope mini auf **Firefox** kompiliert, überträgt und ausführt.

Während du deine Programme schreibst und prüfst, wirst du diese meistens [im Simulator laufen lassen](/device/simulator), aber sobald du dein Programm fertiggestellt hast, kannst du es **compilieren** und auf deinem Calliope mini ausführen.

Die grundlegenden Schritte sind:

1. Schließe deinen Calliope mini über USB an deinen Computer an
2. Klicke auf **Herunterladen** und lade die `.hex`-Datei herunter
3. Klicke auf die Schaltfläche **Herunterladen** in der unteren Leiste und speicher die `.hex`-Datei auf das MINI-Laufwerk

## Voraussetzungen

Du benötigst die folgenden Dinge, um ein Programm auf deinen Calliope mini zu übertragen und auszuführen:

* Ein USB-Kabel um deinen Computer mit deinem Calliope mini zu verbinden. Das ist das gleiche Kabel, dass üblicherweise verwendet wird, um ein Smartphone mit einem Computer zu verbinden.
* Ein PC mit Windows 7 oder höher oder ein Mac mit OS X 10.6 oder höher

## Schritt 1: Verbinde deinen Calliope mini mit deinem Computer

Zunächst verbinde den Calliope mini:

1. Schließe das kleine Ende des USB-Kabels an den USB-Anschluss deines Calliope mini an.

2. Stecke das andere Ende des USB-Kabels in den USB-Port an deinem Computer.

Dein Computer sollte deinen Calliope mini als neues Laufwerk erkennen. Auf Computern, auf denen Windows läuft, wird `MINI` als Laufwerk unter Geräte und Laufwerke angezeigt. Auf einem Mac erscheint es als neues Laufwerk unter Laufwerke.

![](https://cdn.makecode.com/blob/ea3c2d68ddefdb82b3fc77660c3b2f05948e07c4/static/mb/device/usb-windows-device.jpg)

## Schritt 2: Programm herunterladen

1. Öffne dein Projekt auf @homeurl@.
2. Klicke auf **Herunterladen**.
3. Wenn du dazu aufgefordert wirst, wähle **Speichern**, um die kompilierte Datei auf dem Computer zu speichern. Die Aufforderung unterscheidet sich je nachdem, welchen Browser du verwendest bzw. oder ob du einen Windows-Computer oder einen Mac verwendest.

![Save download file dialog](https://cdn.makecode.com/blob/0af5484845e7a27cb97256c278bb9a90c66cff82/static/mb/device/usb/save-file-firefox.gif)

Es könnte ein Fenster erscheinen, mit der Frage, ob du die `.hex` Datei speichern oder öffnen möchtest. Wenn nicht, klicken auf das Download-Symbol oben im Browser.

![Save file prompt](https://cdn.makecode.com/blob/47003572cf109e200259f08b50683181f7255439/static/mb/device/usb/open-file-firefox.png)

Klicke auf das Ordnersymbol und kopiere die Datei aus der Liste der Downloads auf das **MINI** Laufwerk.

![Move hex file to MINI drive](https://cdn.makecode.com/blob/58a4a8883bcae0cfce2371ea53a65cb9ffe623aa/static/mb/device/usb/move-hex-file-firefox.png)

## Schritt 3: Übertragen der Datei auf deinen Calliope mini

* Die LED deines Calliope mini blinkt während der Übertragung (die nur ein paar Sekunden dauern sollte).
* Nach der Übertragung wird der Code automatisch auf deinem @boardname@ ausgeführt. Um das Programm erneut auszuführen, drücke die Reset-Taste auf der Rückseite deines @boardname@. Die Reset-Taste startet automatisch die Datei auf dem Calliope mini.

Indem du das Skript auf das `MINI` -Laufwerk kopiert hast, hast du es in den Flash-Speicher des Calliope mini programmiert, was bedeutet, dass auch nach dem Trennen des Calliope mini das Programm weiterhin ausgeführt wird, wenn der Calliope mini mit Batterie betrieben wird.

## ~hint

Transfer funktioniert nicht? Sieh dir einige [Tipps zur Fehlerbehebung](/device/usb/troubleshoot) an.

## ~