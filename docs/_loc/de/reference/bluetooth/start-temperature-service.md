# Bluetooth Temperatur Service

## ~hint

![](https://cdn.makecode.com/blob/5479e652051b327fa86ef770a2e277dc72052dd2/static/bluetooth/Bluetooth_SIG.png)

Um einen der Bluetooth-"Dienste" des @boardname@ mit einem anderen Gerät wie einem Smartphone zu nutzen, muss es zunächst [mit dem @boardname@ gekoppelt werden](/reference/bluetooth/bluetooth-pairing). Nach dem Koppeln kann das andere Gerät eine Verbindung zum @boardname@ herstellen und Daten über viele der @boardname@-Funktionen austauschen.

## ~

Ein @boardname@ ist in der Lage, ein grobe Messung der aktuellen Umgebungstemperatur zu liefern. Es handelt sich nur um eine Annäherung, da der Temperaturwert von der Temperatur des Hauptprozessors abgeleitet wird. Der Bluetooth-Temperaturdienst ermöglicht es einem anderen Gerät wie einem Smartphone drahtlos die aktuelle Temperaturmessung vom @boardname@, oder einen konstanten Strom von Temperaturdaten zu empfangen. Die Temperaturwerte werden in Grad Celsius ausgedrückt.

Mit dem Bluetooth-Temperatur-Service kannst du dein Smartphone oder Tablet mit deinem @boardname@ als Sensor in ein grafisches Thermometer verwandeln.

Auf dem @boardname@ wird kein zusätzlicher Code benötigt, um den Bluetooth-Temperaturdienst von einem anderen Gerät zu verwenden.

```sig
bluetooth.startTemperatureService();
```

## Beispiel: Starten des Bluetooth-Temperaturdienstes

Der folgende Code zeigt den Start des Bluetooth-Temperaturdienstes:

```blocks
bluetooth.startTemperatureService();
```

## Video - Temperaturdienst-Demo - Beginn um 3:05

http://www.youtube.com/watch?v=aep_GVowKfs

## Fortgeschritten

Für erweiterte Informationen zum @boardname@ Bluetooth-Temperatur-Service einschließlich Informationen zur Verwendung eines Smartphones siehe die [Lancaster University @boardname@ Laufzeit-technische Dokumentation](http://lancaster-university.github.io/microbit-docs/ble/temperature-service/)

## Siehe auch

[Über Bluetooth](/reference/bluetooth/about-bluetooth), [@boardname@ Bluetooth-Profilübersicht ](http://lancaster-university.github.io/microbit-docs/ble/profile/), [@boardname@ Bluetooth-Profil-Referenz](http://lancaster-university.github.io/microbit-docs/resources/bluetooth/microbit-profile-V1.9-Level-2.pdf), [Bluetooth auf @boardname@ Ressourcen](http://bluetooth-mdw.blogspot.co.uk/p/-microbit.html), [Bluetooth SIG](https://www.bluetooth.com)

```package
Bluetooth
```