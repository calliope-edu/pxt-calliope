# Hochladen vom Internet Explorer auf Windows

Während du deine Programme schreibst und prüfst, wirst du diese meistens [im Simulator laufen lassen](/device/simulator), aber sobald du dein Programm fertiggestellt hast, kannst du es **compilieren** und auf deinem Calliope mini ausführen.

Die grundlegenden Schritte sind:

1. Schließe deinen Calliope mini über USB an deinen Computer an
2. Klicke auf **Herunterladen** und lade die `.hex`-Datei herunter
3. **Klicke auf den Pfeil neben Speichern**  in der unteren Leiste und wähle **Speichern unter**.
4. Speicher im Dialog die `.hex` Datei auf dem MINI Laufwerk

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

1. Öffne dein Projekt auf @homeurl@
2. Klicke auf **Herunterladen**
3. Wenn du dazu aufgefordert wirst, wähle **Speichern**, um die kompilierte Datei auf dem Computer zu speichern. Die Aufforderung unterscheidet sich je nachdem, welchen Browser du verwendest bzw. oder ob du einen Windows-Computer oder einen Mac verwendest

Am unteren Rand des Browsers wird eine Meldung angezeigt, in der du gefragt wirst, was du mit der Datei tun möchtest. Klicke **auf den Pfeil neben Speichern** und klicke auf **Speichern unter**

![Save download file dialog](https://cdn.makecode.com/blob/4a008f50f16de66cdf7b2612d028e7421a6071d9/static/mb/device/usb/save-as-ie.gif)

Speicher im Dialog die `.hex`-Datei auf dem MINI Laufwerk.

![Save hex file to MINI drive](https://cdn.makecode.com/blob/727efe769e951f9e5ce82c4339c344e77f00a5a4/static/mb/device/usb/save-as-windows.png)

## Schritt 3: Übertragen der Datei auf deinen Calliope mini

* Die LED deines Calliope mini blinkt während der Übertragung (die nur ein paar Sekunden dauern sollte).
* Nach der Übertragung wird der Code automatisch auf deinem @boardname@ ausgeführt. Um das Programm erneut auszuführen, drücke die Reset-Taste auf der Rückseite deines @boardname@. Die Reset-Taste startet automatisch die Datei auf dem Calliope mini.

Indem du das Skript auf das `MINI` -Laufwerk kopiert hast, hast du es in den Flash-Speicher des Calliope mini programmiert, was bedeutet, dass auch nach dem Trennen des Calliope mini das Programm weiterhin ausgeführt wird, wenn der Calliope mini mit Batterie betrieben wird.


## ~hint

Transfer funktioniert nicht? Sieh dir einige [Tipps zur Fehlerbehebung](/device/usb/troubleshoot) an.

## ~