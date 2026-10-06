# Bluetooth

Support pour les services bluetooth additionnels.

## ~indice

![](https://cdn.makecode.com/blob/5479e652051b327fa86ef770a2e277dc72052dd2/static/bluetooth/Bluetooth_SIG.png)

Pour qu'un autre appareil comme un smartphone puisse utiliser l'un des "services" Bluetooth que le @boardname@ propose, il doit d'abord être [appairé avec le @boardname@](/reference/bluetooth/bluetooth-pairing). Once paired, the other device may connect to the @boardname@ and exchange data relating to many of the @boardname@'s features.

## ~

```cards
bluetooth.startAccelerometerService();
bluetooth.startButtonService();
bluetooth.startIOPinService();
bluetooth.startLEDService();
bluetooth.startMagnetometerService();
bluetooth.startTemperatureService();
bluetooth.onBluetoothConnected(() => {});
bluetooth.onBluetoothDisconnected(() => {});
bluetooth.setTransmitPower(7);
```

## UART

```cards
bluetooth.startUartService();
bluetooth.uartReadUntil("");
bluetooth.uartWriteLine("");
bluetooth.uartWriteString("");
bluetooth.uartWriteNumber(0);
bluetooth.uartWriteValue("", 0);
bluetooth.onUartDataReceived(",", () => {})
```

## Avancé

Pour des informations plus avancées sur le service UART Bluetooth du @boardname@ incluant les informations sur l'utilisation d'un smartphone, consultez la [documentation technique d'exécution du @boardname@ à l'Université de Lancaster](http://lancaster-university.github.io/microbit-docs/ble/uart-service/)

## Voir Aussi

[startAccelerometerService](/reference/bluetooth/start-accelerometer-service), [startButtonService](/reference/bluetooth/start-button-service), [startIOPinService](/reference/bluetooth/start-io-pin-service), [startLEDService](/reference/bluetooth/start-led-service), [startMagnetometerService](/reference/bluetooth/start-magnetometer-service), [startTemperatureService](/reference/bluetooth/start-temperature-service), [startUartService](/reference/bluetooth/start-uart-service), [uartReadUntil](/reference/bluetooth/uart-read-until), [uartWriteLine](/reference/bluetooth/uart-write-line), [uartWriteString](/reference/bluetooth/uart-write-string), [uartWriteNumber](/reference/bluetooth/uart-write-number), [uartWriteValue](/reference/bluetooth/uart-write-value), [onBluetoothConnected](/reference/bluetooth/on-bluetooth-connected), [onBluetoothDisconnected](/reference/bluetooth/on-bluetooth-disconnected)

```package
bluetooth
```