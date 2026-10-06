# Stop Advertising

Interrompi la pubblicità URL tramite il protocollo Eddystone via Bluetooth.

## ~hint

## Eddystone

I fari Bluetooth sono usati per indicare la prossimità ad un luogo o oggetto di interesse. I beacon usano la pubblicità Bluetooth per diffondere una piccola quantità di dati, che può essere ricevuta ed attuata per tutti in un rapporto con un dispositivo adatot e software, tipicamente uno smartphone ed applicazione.

Ci sono vari formati di messaggio del faro, che definiscono come i pacchetti pubblicitari Bluetooth sono usati come contenitori per i dati del faro. iBeacon is Apple's beacon message format. Eddystone comes from Google.

Leggi di più a https://lancaster-universiti.github.io/microbit-docs/ble/eddystone/ .

## ~

```sig
bluetooth.stopAdvertising();
```

## Example: stop advertising on button pressed

```blocks
input.onButtonEvent(Button.A, input.buttonEventValue(ButtonEvent.Down), () => {
    bluetooth.stopAdvertising();
})
```

## Guarda anche

[advertise-url](/reference/bluetooth/advertise-url)

```package
bluetooth
```