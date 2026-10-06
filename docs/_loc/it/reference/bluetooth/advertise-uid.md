# Advertise UID

Advertises a UID via the Eddystone protocol over Bluetooth.

```sig
bluetooth.advertiseUid(42, 1, 7, true);
```

### ~ reminder

#### Obsoleto

This API is deprecated. The Eddystone beacon format is no longer supported, see [Google Beacon format (Deprecated)](https://developers.google.com/beacons/eddystone).

### ~

## ~hint

## Eddystone

I fari Bluetooth sono usati per indicare la prossimità ad un luogo o oggetto di interesse. I beacon usano la pubblicità Bluetooth per diffondere una piccola quantità di dati, che può essere ricevuta ed attuata per tutti in un rapporto con un dispositivo adatot e software, tipicamente uno smartphone ed applicazione.

Ci sono vari formati di messaggio del faro, che definiscono come i pacchetti pubblicitari Bluetooth sono usati come contenitori per i dati del faro. iBeacon is Apple's beacon message format. Eddystone comes from Google.

Leggi di più a https://lancaster-universiti.github.io/microbit-docs/ble/eddystone/ .

## ~

## Parametri

* `namespace` last 4 bytes of the namespace uid (6 to 9)
* `instance` last 4 bytes of the instance (2 to 5)
* `power` - a [number](/types/number) representing the power level between 0 (short) and 7 (maximum range).
* `collegabile` - un [booleano](/blocks/logic/boolean) che indica se la @boardname@ dovrebbe accettare connessioni o no.

## Encoding

The bytes of `namespace` and `instance` are encoded to generate the 10 bytes UID namespace and 6 bytes UID instance.

```
UID namespace: [0, ..., namespace]
UID instance: [0, ..., instance]
```

## Guarda anche

[interrompi-pubblicità](/reference/bluetooth/stop-advertising), [buffer-uid-pubblicità](/reference/bluetooth/advertise-uid-buffer)

```package
bluetooth
```