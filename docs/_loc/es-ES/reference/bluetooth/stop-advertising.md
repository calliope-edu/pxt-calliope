# Detener publicidad

Stops advertising URL via the Eddystone protocol over Bluetooth.

## ~nota

## Eddystone

Bluetooth beacons are used to indicate proximity to a place or object of interest. Beacons use Bluetooth advertising to broadcast a small amount of data, which can be received and acted upon by anyone in range with a suitable device and software, typically a smartphone and application.

There are various beacon message formats, which define the way Bluetooth advertising packets are used as containers for beacon data. iBeacon is Apple's beacon message format. Eddystone proviene de Google.

Read more at https://lancaster-university.github.io/microbit-docs/ble/eddystone/ .

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

## Ver también

[url-de-publicidad](/reference/bluetooth/advertise-url)

```package
bluetooth
```