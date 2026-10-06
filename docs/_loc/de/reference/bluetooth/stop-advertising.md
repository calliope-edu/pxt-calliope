# Stop Advertising

Dadurch wird die URL-Werbung über das Eddystone-Protokoll über Bluetooth gestoppt.

## ~hint

## Eddystone

Bluetooth-Beacons werden zum Anzeigen der Ortsnähe und des Interessenobjektes verwendet. Eines der nützlichsten Service-Beacons ist, dass es für Werbung verwendet werden kann, um regelmäßig einen Bluetooth Code an alle umliegenden Endusergeräte mit entsprechender Software zu senden, zum Beispiel dem Smartphone oder einer Anwendung.

Es gibt verschiedene Beacon-Dateiformate, die die Möglichkeit der Weiterverarbeitung des Inhalts eines Bluetooth-Werbepaketes bestimmen, das als Behälter für Beacon-Dateien verwendet werden kann. iBeacon ist ein von Apple entwickeltes Beacon-Dateiformat. Eddystone wurde von Google eingeführt.

Erfahre mehr unter https://lancaster-university.github.io/microbit-docs/ble/eddystone/.

## ~

```sig
bluetooth.stopAdvertising();
```

## Beispiel: Stoppen der Werbung bei gedrückter Taste

```blocks
input.onButtonEvent(Button.A, input.buttonEventValue(ButtonEvent.Down), () => {
    bluetooth.stopAdvertising();
})
```

## Siehe auch

[advertise-url](/reference/bluetooth/advertise-url)

```package
Bluetooth
```