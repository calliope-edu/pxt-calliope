# UID-Pufferspeicher anzeigen

Bekanntgabe einer UID über das Eddystone-Protokoll per Bluetooth.

```sig
bluetooth.advertiseUidBuffer(pins.createBuffer(16), 7, true);
```

### ~ reminder

#### Veraltet

Diese API ist veraltet. Der Eddystone-Becon wird nicht mehr unterstützt, siehe [Google Beacon Format (Deprecated)](https://developers.google.com/beacons/eddystone).

### ~

## ~hint

## Eddystone

Bluetooth-Beacons werden zum Anzeigen der Ortsnähe und des Interessenobjektes verwendet. Eines der nützlichsten Service-Beacons ist, dass es für Werbung verwendet werden kann, um regelmäßig einen Bluetooth Code an alle umliegenden Endusergeräte mit entsprechender Software zu senden, zum Beispiel dem Smartphone oder einer Anwendung.

Es gibt verschiedene Beacon-Dateiformate, die die Möglichkeit der Weiterverarbeitung des Inhalts eines Bluetooth-Werbepaketes bestimmen, das als Behälter für Beacon-Dateien verwendet werden kann. iBeacon ist ein von Apple entwickeltes Beacon-Dateiformat. Eddystone wurde von Google eingeführt.

Erfahre mehr unter https://lancaster-university.github.io/microbit-docs/ble/eddystone/.

## ~

## Parameter

* `buffer` - ein an 16 Bytes auszurichtender Puffer, der den Namensraum (die ersten 10 Bytes) und die Instanz (die letzten 6 Bytes) enthält.
* `power` - eine [Zahl](/types/number), die das Leistungsniveau zwischen 0 (kurz) und 7 (maximale Reichweite) darstellt.
* `connectable` - ein [boolescher Wert](/blocks/logic/boolean), der angibt, ob der @boardname@ Verbindungen akzeptieren soll oder nicht.


## Siehe auch

[Anzeigen blockieren](/reference/bluetooth/stop-advertising), [UID-Werbung](/reference/bluetooth/advertise-uid)

```package
Bluetooth
```