# Gerät

### ~ hint

#### Möchtest du einen Calliope mini kaufen?

Siehe die [Liste der offiziellen Produkte](https://webshop.calliope.cc).

### ~

Alle Details, aus denen sich der Calliope mini zusammensetzt

![micro:bit board layout](https://makecode.com/not-found/HEAD/static/mb/device-v2.jpg)

### ~ hint

#### Die aktuelle Version des Calliope mini ist V3

Die Version von @boardname@ ist jetzt bei **V3**. See the what's new in MakeCode for programming the [@boardname@ v2](/device/v2).

### ~

## LED-Bildschirm und Status-LED

Die roten Leuchten sind [LEDs](/device/screen) (Leuchtdioden) und bilden eine 5 x 5 LED-Matrix.
Sie können auf Ein-/Ausschalten eingestellt werden und die Helligkeit kann gesteuert werden.

Das gelbe Licht des Calliope mini ist die Status-LED.
Sie blinkt gelb, wenn das System dem Benutzer sagen will, dass etwas passiert ist.

Siehe Dir das Video über LEDs an, um zu erfahren wie durch @boardname@ Texte, Zahlen und Bilder angezeigt werden:

https://www.youtube.com/watch?v=qqBmvHD5bCw

## Knöpfe

Die Tasten A und B dienen als eine Form der Eingabe.  Wenn eine Taste gedrückt wird, schließt sie den Stromkreis.
Die Erkennungsfähigkeiten eines Micro:bits ermöglichen es, Ereignisse zu programmieren um darauf reagieren zu können, wenn eine seiner beiden Tasten gedrückt/losgelassen wird.

Die kleine, weiße Taste ist eine System-Taste. Sie hat verschiedene Anwendungen.
Wenn du den Code heruntergeladen und auf deinen Calliope mini übertragen hast, drückst du diese Taste, um das Programm neu zu starten und von Anfang an auszuführen.

Find out how buttons provide input to the @boardname@ in this video:

https://www.youtube.com/watch?v=t_Qujjd_38o

## Berührung

Die Pins 0, 1, 2, 3 und das Logo auf der Rückseite können als Berührungstasten arbeiten, wenn sie sich als Eingabetasten programmieren lassen.

## USB-Anschluss

Wenn du deinen Calliope mini über USB anschließt, sollte dieser als MINI-Laufwerk angezeigt werden.

Wenn du versehentlich den Reset-Knopf drücktst, während der Calliope mini einsteckt wird,
erscheint das MAINTENANCE-Laufwerk anstelle von MINI\`\`. Dies wird als Wartungsmodus bezeichnet.

Um mit der Programmierung des Calliope mini fortzufahren, MUSST du den USB-Anschluss trennen und ihn wieder anschließen. Überprüfe, ob das Laufwerk jetzt als `MINI` angezeigt wird.

### ~ hint

#### Anzeigen des Versionsverlaufs einer Datei

Gehe damit äußert vorsichtig um!
Wenn du auf das Laufwerk klickst, während es als MAINTENANCE angezeigt wird,
kannst du sehen, welche Betriebssoftware-Version du auf deinem Calliope mini hast.
Du solltest deine Betriebssoftware auf deinem Calliope mini bereits auf dem neuesten Stand halten.
Die Version der Betriebssoftware findest du in der Datei 'version.txt' auf dem Calliope mini. Schau dir die @boardname@ **[firmware](https://docs.calliope.cc/)** Seite an, um mehr über die Firmware-Version deines Calliope mini zu erfahren.

### ~

## Kompass

Der Kompass kann Magnetfelder wie das Magnetfeld der Erde erkennen.
Dank des eingebauten Kompasses, ist es dem Micro:bit möglich, die Bewegungserkennung automatisch zu aktivieren.
Der Micro:bit kann zum Erfassen der Ausrichtung und der Bewegung in Grad (°) verwendet werden.
Diese Daten können entweder in einem Programm erfasst oder an ein anderes Gerät gesendet werden.

## Beschleunigungssensor

Dein Micro:bit verfügt über einen Beschleunigungsmesser, der in der Lage ist, Änderungen der Geschwindigkeit des Micro:bits zu erkennen.
Er wandelt analoge Informationen in eine digitale Form um, sodass sie von Programmen des Micro:bits verarbeitet werden können.
Die Ausgabe erfolgt in Milli-g. Das Gerät erkennt auch eine kleine Anzahl von Standardaktionen, wie zum Beispiel für die Aktion "Schütteln", "Kippen" und "Freifall".

Sieh Dir dieses Video an, um zu erfahren, wie der Beschleunigungsmesser taktet:

https://www.youtube.com/watch?v=byngcwjO51U

## Pins

Die Pins können eine Form der elektrischen Ein- oder Ausgabe sein.
Es gibt Beschriftungen für die Eingangs-/Ausgangspins P0, P1, P2, P3 die zum Anschließen von externen Sensoren wie Thermometer oder Feuchtigkeitsdetektoren dienen.

## Mikrofon

Mit dem Mikrofon können Programme vorhandene Sounds erkennen. Du kannst nach lauten oder stillen Klängen suchen und herausfinden, was ihr Klang ist.

## Lichtstärke

Der Bildschirm kann auch als Helligkeitssensor verwendet werden (ein echt cooler Trick).

Erfahre mehr darüber, wie Licht erkannt und gemessen wird, in diesem Lichtsensor Video:

https://www.youtube.com/watch?v=TKhCr-dQMBY

## Temperatur

Die Temperatur wird am @Bordname@ gemessen, indem festgestellt wird, wie heiß der Prozessor (CPU) ist. Während bei der Luftkühlung die Vorrichtung dafür sorgt, dass der PC nicht überhitzt und dass jedes herumliegende Element gekühlt wird, ist die Temperatur, die der Prozessor selbst misst, ein guter Näherungswert für die Umgebungstemperatur (die Temperatur in der Nähe und um ihn herum).

Sieh Dir das Video zur Messung der Wärme und Kälte in der Umgebung an, um zu erfahren, wie der @boardname@ Temperaturunterschiede erkennen kann:

https://www.youtube.com/watch?v=_T4N8O9xsMA

## Laufzeit

Der Calliope mini verkörpert viele grundlegende Konzepte in der Informatik. Um mehr zu erfahren, lese [Calliope mini - ein reaktives System](/device/reactive).

Manchmal zeigt dein Calliope mini einen Fehlercode an. Weitere Informationen findest Du unter:

- [die Fehlercodes](/device/error-codes)

## Wie kann ich den Micro:bit an meinen PC anschließen?

Die Verbindung zwischen deinem Calliope mini und deinem PC kann über ein USB-C-Kabel erfolgen.
Du kannst Daten via USB-Datenverbindung zwischen dem Calliope mini und dem PC übertragen, sodass Dir Programme von Windows, Macs und Chromebooks auf dem Calliope mini zum Herunterladen zur Verfügung stehen.

## Energieversorgung für deinen Calliope mini

Wenn dein @boardname@ über das USB-C-Kabel mit dem Computer verbunden ist, wird keine andere Stromquelle benötigt.  
Falls er nicht an Ihren Computer, Tablet oder Mobiltelefon angeschlossen ist, benötigst du 2 x AAA 1,5 V Batterien, um ihn mit Strom zu versorgen.

Die Pins **+** und **-** sind die Stromversorgungspins.
Du kannst ein externes Gerät wie einen Motor an diese anschließen und mit dem Akku oder USB anschalten.

## Serielle Kommunikation

Die Datenübertragung des Calliope mini kann über [serielle Kommunikation](/device/serial) erfolgen. Diese Daten können über [USB](/reference/serial/redirect-to-usb), BLE oder [zu Pins](/reference/serial/redirect) übertragen werden.

## Bluetooth-Low-Energy (BLE)-Antenne

Auf der Rückseite Deines micro:bit findest Du die Beschriftung BLE ANTENNA. Sie ist für einen Nachrichtendienst bestimmt,
damit die Geräte miteinander kommunizieren können. Der Calliope mini ist ein Peripheriegerät, das mit einem zentralen Gerät wie einem Smartphone oder einem Tablet mit Bluetooth Low Energy (BLE) kommunizieren kann.
Der Calliope mini kann Signale senden und Signale von einem BLE Central konfigurierbaren Gerät empfangen, so dass ein anderes BLE-Gerät
den Calliope mini steuern kann oder der Calliope mini ein anderes BLE-Gerät steuern kann.

## Technische Dokumentation

Der Calliope mini wurde als Mikrocontroller für Kinder und Jugendliche ab 8 Jahren entwickelt.
Weitere Informationen findest du auf der [Calliope Webseite](https://calliope.cc).