# Advertise UID Buffer

Advertises a UID via the Eddystone protocol over Bluetooth.

```sig
bluetooth.advertiseUidBuffer(pins.createBuffer(16), 7, true);
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

* `buffer` - a 16 bytes buffer containing the namespace (first 10 bytes) and instance (last 6 bytes).
* `power` - a [number](/types/number) representing the power level between 0 (short) and 7 (maximum range).
* `collegabile` - un [booleano](/blocks/logic/boolean) che indica se la @boardname@ dovrebbe accettare connessioni o no.


## Guarda anche

[interrompi-pubblicità](/reference/bluetooth/stop-advertising), [uid-pubblicità](/reference/bluetooth/advertise-uid)

```package
bluetooth
```