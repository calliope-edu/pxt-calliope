# Hochladen von Chrome für Windows

## ~ hint

Ab Chrome 65 unter Windows 10, kannst du mit  **WebUSB** mit einem Klick herunterladen. [Erfahre mehr über WebUSB...](/device/usb/webusb).

## ~

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

![](https://cdn.makecode.com/blob/ea3c2d68ddefdb82b3fc77660c3b2f05948e07c4/static/mb/device/usb-windows-device.jpg)

## Schritt 2 (optional): Konfigurieren von Chrome, um zu Fragen, wo die Datei gespeichert werden soll

Du musst dies nur einmal tun.

1. Öffne die **Einstellungen** für Chrome.
2. Klicke auf **Update release** (Release aktualisieren) am Ende der Seite.
3. Klicke auf den **Herunterladen** Button.
4. Aktiviere die Einstellung **Frage, wo jede Datei gespeichert werden soll, bevor sie heruntergeladen wird.**

## Schritt 3: Programm herunterladen

1. Öffne dein Projekt auf @homeurl@
2. Klicke auf **Herunterladen**
3. Wenn du Schritt 2 oben gemacht hast, wird Chrome fragen, wo die `hex-Datei gespeichert werden soll.` Speichere diese auf das `MINI` Laufwerk. Ansonsten fahre mit einer der folgenden Optionen in Schritt 4 fort.

## Schritt 4: Übertragen der Datei auf deinen Calliope mini

Wenn die Datei auf deinem Computer gespeichert wurde, musst du sie auf den Calliope mini übertragen.

## Manuelle Übertragung

Deine `.hex` Datei (oben in Schritt 3 erstellt) erscheint als Download am unteren Rand des Browsers. Klicke auf den Pfeil neben dem Dateinamen und dann auf **Im Ordner anzeige**.

![](https://cdn.makecode.com/blob/89eb9a94944bc441687d7326feecd2427fb0b88f/static/mb/device/usb-windows-chrome.png)

Ziehe im Datei-Explorer die `.hex` Datei aus dem Download-Ordner auf das `MINI` Laufwerk.

Alternativ klicke mit der rechten Maustaste auf die Hex-Datei, wähle **senden an** und dann **MINI**.

![](https://cdn.makecode.com/blob/5ffb02b4bf4869e9740d9222127e0eff4b2fb3f5/static/mb/device/usb-windows-sendto.jpg)

## Schritt 5: nach der Übertragung der Datei

* Die LED deines Calliope mini blinkt während der Übertragung (die nur ein paar Sekunden dauern sollte).
* Nach der Übertragung wird der Code automatisch auf deinem Calliope mini ausgeführt. Um dein Programm erneut auszuführen, drücke die Reset-Taste deines Calliope mini. Die Reset-Taste startet automatisch die Datei auf dem Calliope mini.
* Indem du das Skript auf das `MINI` -Laufwerk kopiert hast, hast du es in den Flash-Speicher des Calliope mini programmiert, was bedeutet, dass auch nach dem Trennen des Calliope mini das Programm weiterhin ausgeführt wird, wenn der Calliope mini mit Batterie betrieben wird.

## ~hint

Transfer funktioniert nicht? Sieh dir einige [Tipps zur Fehlerbehebung](/device/usb/troubleshoot) an.

## ~