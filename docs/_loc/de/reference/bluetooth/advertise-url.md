# Advertise Url

Kündigt eine URL über das Eddystone-Protokoll über Bluetooth an.

```sig
bluetooth.advertiseUrl("https://makecode.microbit.org/", 7, true);
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

* `Url` - ein [String](/types/string) mit der zu übertragenden URL höchstens 17 Zeichen lang, ohne das Protokoll (z. B.: `https://`), das als 1 Byte kodiert wird.
* `power` - eine [Zahl](/types/number), die das Leistungsniveau zwischen 0 (kurz) und 7 (maximale Reichweite) darstellt.
* `connectable` - ein [Boolescher Wert](/blocks/logic/boolean), der angibt, ob der @boardname@ Verbindungen akzeptieren soll oder nicht.

## Beispiel: Einen geheimen Code übertragen

```blocks
bluetooth.advertiseUrl("https://pxt.io?secret=42", 7, true);
```

## Siehe auch

[stop-advertising](/reference/bluetooth/stop-advertising), [advertise-uid](/reference/bluetooth/advertise-uid)

```package
Bluetooth
```