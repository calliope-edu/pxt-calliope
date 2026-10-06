# UID senden

Sendet eine UID über das Eddystone-Protokoll über Bluetooth an.

```sig
bluetooth.advertiseUid(42, 1, 7, true);
```

### ~ reminder

#### Veraltet

Diese API ist veraltet. Der Eddystone-Becon wird nicht mehr unterstützt, siehe [Google Beacon Format (Deprecated)](https://developers.google.com/beacons/eddystone).

### ~

## ~hint

## Eddystone

Bluetooth-Beacons werden verwendet, um die Nähe zu einem Ort oder Objekt von Interesse anzuzeigen. Beacons verwenden Bluetooth-Signale, um eine kleine Datenmenge zu übertragen, die von jedem empfangen und bearbeitet werden können, der sich in Reichweite mit einem geeigneten Gerät und einer geeigneten Software, typischerweise auf einem Smartphone, befindet.

Es gibt verschiedene Signalformate für Beacons, die die Art und Weise definieren, wie Bluetooth als Container verwendet werden kann. iBeacon ist Apples Beacon-System für Nachrichten. Eddystone kommt von Google.

Erfahre mehr unter https://lancaster-university.github.io/microbit-docs/ble/eddystone/.

## ~

## Parameter

* `namespace` letzte 4 Bytes des Namensraums uid (6 bis 9)
* `instance` letzte 4 Bytes des Namensraums uid (2 bis 5)
* `power` - eine [Zahl](/types/number) die repräsentiert die Leistungsstärke zwischen 0 (kurz) und 7 (maximaler Bereich).
* `connectable` - ein [boolescher](/blocks/logic/boolean) Wert der anzeigt, ob der @boardname@ Verbindungen akzeptieren soll oder nicht.

## Kodierung

Die Bytes von `namespace` und `instance` sind kodiert, um den 10 Bytes UID-Namensraum und die 6 Bytes UID-Instanz zu erzeugen.

```
UID-Namensraum: [0, ..., namespace]
UID-Instanz: [0, ..., instance]
```

## Siehe auch

[Stopp - Keine Werbung](/reference/bluetooth/stop-advertising), [Werbung-uid-Pufferspeicher](/reference/bluetooth/advertise-uid-buffer)

```package
Bluetooth
```