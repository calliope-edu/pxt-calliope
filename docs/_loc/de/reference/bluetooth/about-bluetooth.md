# Über Bluetooth

![](https://cdn.makecode.com/blob/5479e652051b327fa86ef770a2e277dc72052dd2/static/bluetooth/Bluetooth_SIG.png)

## Einführung

Bluetooth ist eine drahtlose Kommunikationstechnologie, die es Geräten ermöglicht, miteinander zu kommunizieren, ohne dass ein zentrales Gerät wie ein Router oder Access Point benötigt wird.

Bluetooth verfügt über eine spezielle "Niedrigenergie-Funktion", d. h. es kann ohne großen Stromverbrauch der Geräte genutzt werden. Genau diese Bluetooth Niedrigenergie-Funktion wird von @boardname@ verwendet.

In der Welt der Bluetooth Niedrigenergie, hat ein Gerät etwas, das als "Profil" bezeichnet wird, das die Art und Weise definiert, wie andere Geräte über Bluetooth mit ihm kommunizieren können. In gewisser Weise definiert das Bluetooth-Profil die Art und Weise, wie ein Gerät anderen Geräten in Bezug auf seine Eigenschaften und Möglichkeiten, die es bietet, erscheint.

Anders ausgedrückt: Ein Bluetooth-Profil ist eigentlich eine Schnittstellenspezifikation. Es definiert die Daten, die ein Gerät hat, was ein anderes Gerät mit diesen Daten über eine Bluetooth-Verbindung machen kann und wie das Gerät mit dem Profil reagieren soll, wenn ein verbundenes Gerät auf seine Daten in irgendeiner Weise reagiert. Schauen wir uns diese Beschreibung etwas genauer unter technischen Aspekten an.

## Grundlegende Konzepte

Ein Bluetooth-Gerät enthält eine Tabelle mit Daten, die Attribut-Tabelle genannt wird, auf die andere angeschlossene Geräte auf verschiedene Arten zugreifen können. Diese Tabelle der Daten und die Art und Weise, wie sie genutzt werden kann, fällt in einen technischen Bereich von Bluetooth, genannt das generische Attribut-Profil oder kurz "GATT" und du kannst den Begriff GATT in einigen der Dokumentation für APIs sehen, wie die von der Android-Plattform.

Die Attributtabelle enthält so etwas wie eine Reihe von Datensätzen verschiedener Typen. Die wichtigsten Typen sind Services, Merkmale und Deskriptoren. Schauen wir uns alle diese Begriffe nacheinander an.

## Attribute

Dienstleistungen, Eigenschaften und Beschreibungen sind alles Arten von Attributen. Hence Generic Attribute Profile, Attribute Table und etwas dass Attribute Protocol genannt wird. Alle Attribute haben einen Typ, der durch eine UUID (Universally Unique Identifer) identifiziert wird. Einige Attribute sind durch die Bluetooth SIG definiert, das technische Standardgremium für Bluetooth und diese haben UUIDs, die 16 Bit lang sind. Einige Attribute sind benutzerdefiniert für ein bestimmtes Gerät vom Produktteam und haben 128 Bit UUIDs. Der @boardname@ verwendet eine Mischung aus 16 Bit und 128 Bit UUIDs.

## Struktur

Services, Characteristics und Deskriptoren sind in einer Hierarchie organisiert mit Services an der Spitze und Deskriptoren unten. Dienste (services) enthalten ein oder mehrere Merkmale. Eine Charakteristik besitzt Null oder mehr Beschreiber. Null, weil Deskriptoren vollständig optional sind, während ein Service mindestens ein Zeichen enthalten muss.

![](https://cdn.makecode.com/blob/d5171d3a8bddcb5a1b3ff76bdb02b2d73fb89a33/static/bluetooth/gatt_hierarchy.png)

## Dienste

Ein Service ist ein Behälter (Container) für logisch relevante Bluetooth-Datenelemente. Diese Datenelemente werden faktisch als Merkmale bezeichnet. Ein Service kann als Eigentümer der Eigenschaften in ihm angesehen werden. Oft stellt ein Service ein bestimmtes Feature (z.B. eine Hardwarefunktion) eines Geräts wie die Tasten oder eines bestimmten Sensors dar. Ein Beispiel für einen Bluetooth SIG definierten Dienst ist der Geräteinformationsdienst der, wie der Name andeutet, ist ein Container für verschiedene Informationen über das Gerät wie seinen Hersteller und Seriennummer. Der @boardname@ hat diesen Service.

## Merkmale

Merkmale sind Datenelemente, die sich auf einen bestimmten internen Zustand des Geräts beziehen, oder vielleicht auf einen bestimmten Zustand der Umgebung, den das Gerät mit einem Sensor messen kann. Der aktuelle Akkustand ist ein Beispiel für interne Zustandsdaten, während die Umgebungstemperatur vielleicht mit einem Sensor gemessen werden könnte. Manchmal stellen Merkmale Konfigurationsdaten wie die Frequenz dar, an der etwas gemessen werden soll. In jedem dieser Fälle ist die Art und Weise, wie ein Gerät solche Daten anderen Geräten zur Verfügung stellen kann, indem sie sie als Merkmal zur Verfügung stellt. Ein Beispiel für eine Bluetooth SIG definierte Zeichenfolge ist der Serial Number String, den du innerhalb des Geräteinformationsdienstes findest.

Merkmale enthalten verschiedene Teile. Sie haben einen Typ, einen Wert, einige Eigenschaften und einige Berechtigungen.

Typ ist etwas bereits oben erläutert, ein UUID-Wert, der angibt, welche Art von Charakteristika ein Attribut ist. Wert ist der Wert des zugehörigen Zustandsdaten-Elements.

Eigenschaften definieren, was ein anderes Gerät mit der Eigenschaft über Bluetooth in Bezug auf verschiedene definierte Operationen wie READ, WRITE oder NOTIFY tun kann. Das Lesen einer Eigenschaft bedeutet, den aktuellen Wert von der Attributtabelle auf das angeschlossene Gerät über Bluetooth zu übertragen. Schreiben erlaubt es dem angeschlossenen Gerät, diesen Wert in der Zustandstabelle zu ändern. Benachrichtigungen sind ein spezieller Nachrichtentyp, den ein Gerät wie der @boardname@ an ein angeschlossenes Gerät senden kann, wenn sich der Wert des zugehörigen Merkmals ändert oder vielleicht periodisch von einem Timer kontrolliert. Nicht alle Eigenschaften unterstützen alle Operationen. Die Eigenschaften des Charakters geben an, welche Operationen unterstützt werden.

Manchmal wurde das Gerät so programmiert, dass es auf eine spezielle Weise reagiert, wenn es eine Operation wie das Lesen oder Schreiben eines Wertes aus der Attributtabelle verarbeitet, so dass mehr Operationen geschehen können als die einfache Übertragung von Daten über die Verbindung. Vielleicht führt die Änderung des Wertes eines Merkmals dazu, dass das Gerät die Frequenz ändert, mit der es beispielsweise Messwerte aus dem Gerätebeschleunigungsmesser abgibt.

Berechtigungen beziehen sich auf die Sicherheit und beschreiben die Sicherheitsbedingungen, die erfüllt sein müssen, bevor Lese- oder Schreibzugriff auf das Merkmal gewährt werden soll.

## Deskriptoren

Deskriptoren enthalten Metadaten, die entweder die Details zu dem Merkmal erweitern, zu dem der Deskriptor gehört, oder die Konfiguration eines Verhaltens ermöglicht, das dieses Merkmal betrifft. Benachrichtigungsnachrichten werden mit einem speziellen Deskriptor ein- oder ausgeschaltet, der zum Beispiel den Client Characteristic Configuration Descriptor genannt wird.

## Profil

Ein Bluetooth-Profil ist eine Spezifikation, die alle erforderlichen Informationen über das Verhalten eines Geräts zusammenfasst. Wie man auf sie zugreifen kann in Bezug auf ihre Dienste, Merkmale und Deskriptoren, Sicherheitsregeln, Einschränkungen der Gleichwertigkeit usw.

## Client-Server-Architektur

Wenn eine Smartphone-Anwendung mit einem Gerät wie dem @boardname@ über eine Bluetooth-Verbindung interagiert, haben wir eine Client/Server-Architektur. Die Telefon-Anwendung ist in der Regel der GATT-Client und die @boardname@ ist in der Regel der GATT-Server. Sie kommunizieren mittels eines Protokolls namens Attributprotokoll oder einfach nur ATT. Als Smartphone-Entwickler arbeitest du mit der APIs und musst dir keine Sorgen um die Formulierung von ATT-Protokoll-Einheiten usw. machen.

![](https://cdn.makecode.com/blob/7fd212d04222a1d19e38f049f6345e16d22a8d39/static/bluetooth/services_and_GATT.png)

## Geräteerkennung

Alles, was oben beschrieben ist, bezieht sich auf Geräte, die als GATT-Client und -Server verbunden sind und kommunizieren. Aber es gibt eine Phase, in der die beiden Geräte noch nicht angeschlossen sind. Wie finden sie sich gegenseitig und verbinden sich? Die Antwort auf diese Frage wird als 'Device Discovery' bezeichnet und liegt in der Verantwortung eines anderen Teils der Bluetooth-Architektur, genannt Generic Access Profile (GAP).

In GAP wirbt ein Gerät und gibt regelmäßig kleine Datenpakete aus. Diese Pakete enthalten Informationen über das Gerät, das die Werbung ausgibt. Andere Geräte, die nach Geräten suchen, die eine Verbindung herstellen können, um etwas zu ermöglichen, das als Scannen, Empfangen und Verarbeiten von Werbepaketen bezeichnet wird, filtern diejenigen heraus, die von Geräten eines Typs stammen, die nicht von Interesse sind. Normalerweise werden dem Benutzer Informationen über Geräte gegeben, die entdeckt wurden und die dann eines auswählen, mit dem er verbunden werden soll. Das angezeigte Gerät wird als Bluetooth Peripheral bezeichnet, während es sich bei dem Scannen um ein Bluetooth Central Gerät handelt. Der @boardname@ ist eine Bluetooth-Peripherie.

Bluetooth auf dem @boardname@

Vollständige Dokumentation für das @boardname@ Bluetooth-Profil, wie es von dieser Anwendung verwendet wird, findest du auf der [Lancaster University Dokumentation](http://lancaster-university.github.io/microbit-docs/ble/profile/) Webseite.

Der Beschleunigungsmesser des @boardname@ (Bewegungsmelder), Magnetometer (digitaler Kompass), zwei Tasten vorne, LED-Display, IO-Pins an den Ecken und an der Erweiterungsleiste, interner Nachrichtenbus und interner Temperatursensor werden alle als Services bereitgestellt, so dass Anwendungen diese Funktionen des Geräts ausnutzen können. Ergänzend:

* der Bluetooth SIG definierte Geräteinformationsdienst ist enthalten, damit Anwendungen Informationen wie Firmware-Versionsinformationen über Bluetooth abrufen können
* gibt es einen Device Firmware Update (DFU) Dienst, der es ermöglicht, dass der neue @boardname@ Code über Bluetooth auf das Gerät übertragen wird anstatt über USB
* es gibt einen UART-Service, der den Austausch beliebiger Daten mit dem @boardname@ in einer Art und Weise ermöglicht, die der traditionellen seriellen Kommunikation ähnelt.

Alles, was du mit dem @boardname@ über Bluetooth tun kannst, wird durch Lese-, Schreib- und Benachrichtigungsoperationen erreicht. Nicht alle Merkmale unterstützen alle drei, also überprüfe die Profildokumentation. Oft gibt es Eigenschaften, deren Zweck es ist, dir zu erlauben, Konfigurationswerte zu schreiben, die anderes Verhalten kontrolliert. Technisch werden diese Kontrollpunkte genannt. Zum Beispiel kannst du angeben, mit welcher Frequenz Beschleunigungsdaten gesampelt werden, bevor sie als Benachrichtigungsnachricht an deine Anwendung übertragen werden.

## Du möchtest mehr erfahren?

Die Bluetooth SIG Website unter http://www.bluetooth.com ist ein guter Ort für weitere Informationen über Bluetooth im Allgemeinen. Dort findest du alle SIG definierten Profile, Dienstleistungen, Eigenschaften und Deskriptoren sowie die Kernspezifikation für alle Bluetooth-Technologien.

Das war's! Viel Spaß mit Bluetooth auf dem @boardname@!

Martin Woolley, Bluetooth SIG. Twitter: @bluetooth_mdw

### Video

https://www.youtube.com/watch?v=aep_GVowKfs

## Siehe auch

[Über Bluetooth](/reference/bluetooth/about-bluetooth), [@boardname@ Bluetooth-Profilübersicht ](http://lancaster-university.github.io/microbit-docs/ble/profile/), [@boardname@ Bluetooth-Profil-Referenz](http://lancaster-university.github.io/microbit-docs/resources/bluetooth/microbit-profile-V1.9-Level-2.pdf), [Bluetooth auf @boardname@ Ressourcen](http://bluetooth-mdw.blogspot.co.uk/p/-microbit.html), [Bluetooth SIG](https://www.bluetooth.com)

```package
Bluetooth
```