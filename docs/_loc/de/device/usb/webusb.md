# WebUSB

[WebUSB](https://wicg.github.io/webusb/) ist ein neuer Webstandard mit dem du direkt von einer Webseite aus auf den @boardname@ zugreifen kannst. Es ermöglicht einen **Ein-Klick-Download**, direkt auf den Calliope mini, ohne zusätzliche App oder Software zu installieren! Es erlaubt auch Daten von @boardname@ zu erhalten.

## Support

* Chrome 79+ browser for Android, Chrome OS, Linux, macOS and Windows 10.
* Microsoft Edge 79+ browser for Android, Chrome OS, Linux, macOS and Windows 10.

## Bereiten den @boardname@ vor

Stelle sicher, dass dein @boardname@ die USB-Firmware Version **0249** oder höher verwendet. Aktualisieren ist so einfach wie das Ziehen einer Datei in einen Ordner und es dauert ein paar Sekunden, um es zu erledigen.

* [Schaue dir die -Anweisungen an, um deinen @boardname@ zu überprüfen und zu aktualisieren.](/device/usb/webusb/troubleshoot)

## Deinen @boardname@ koppeln

Hier sind die Schritte bei den unterstützten Browsern:

* schließe den @boardname@ mit einem USB-Kabel an deinen Computer an
* ein Projekt öffnen
* klicke auf das Drei-Punkt-Symbol neben der Schaltfläche **Herunterladen** und klicke dann auf **Gerät verbinden**
* klicke unten auf 'Gerät koppeln' und wähle 'Calliope mini' oder 'DAPLink CMSIS-DAP' aus der Liste.

Wenn du keine Geräte in der Liste sehen und der @boardname@ die richtige USB-Firmware hat (**0249** oder höher), kannst du ein [Support-Ticket](https://support.microbit.org/support/tickets/new) erstellen, um uns über das Problem zu informieren. Überspringe die restlichen Schritte.

![Geräteliste für WebUSB-Pairing](https://cdn.makecode.com/blob/effb8fdd4e6f171ed7a560053e3693765c5329af/static/mb/device/usb/no-pair.jpg)

* Wenn dein @boardname@ verbunden ist, siehst du das **mit dem Calliope mini verbunden** Nachrichtenfenster. Klicke auf **Fertig** und es kann losgehen!

![Verbindungs-Nachrichtenfenster](https://cdn.makecode.com/blob/f4b8e55753798da0e71d50f71ccded63491d471a/static/mb/device/usb/connected.jpg)

* Wenn die Verbindung zu deinem @boardname@ fehlgeschlagen ist, siehst du eine **Verbindung fehlgeschlagen** Nachricht. Du kannst **Neu versuchen** drücken, um die Verbindung erneut zu versuchen, oder das Fenster schließen und eine [Fehlersuche](/device/usb/webusb/troubleshoot) der  Verbindung durchführen.

![Verbindungsfenster fehlgeschlagen](https://cdn.makecode.com/blob/de585f60160a4506856da7cde99dce6fb8aa75c4/static/mb/device/usb/connect-fail.jpg)

## @boardname@ #unpair entkoppeln

You will need to unpair your device from the editor to disable WebUSB.

* klicke auf das Icon **Schließen** in der Adressleiste
* deaktiviere jeden **Calliope mini** bzw. jedes **DAPLink CMSIS-DAP** Gerät
* die Seite neu laden

![](https://cdn.makecode.com/blob/569ff83d8c1889c45f5efa9d649cd10590566041/static/webusb/unpair.gif)

## Ein-Klick-Download

Sobald der @boardname@ gekoppelt ist, wird MakeCode WebUSB verwenden, um den Code zu übertragen, ohne die Hex-Datei ziehen und ablegen zu müssen. Jetzt kannst du mit dem Programmieren loslegen!

## Konsolenausgabe

MakeCode kann den @boardname@ "hören" und Werte über die Konsolenausgabe anzeigen.