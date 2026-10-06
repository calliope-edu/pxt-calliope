# Bluetooth

Supporto per servizi Bluetooth aggiuntivi.

## ~hint

![](https://cdn.makecode.com/blob/5479e652051b327fa86ef770a2e277dc72052dd2/static/bluetooth/Bluetooth_SIG.png)

Per un altro dispositivo come uno smartphone, per usare i "servizi" Bluetooth che ha la @boardname@, deve prima essere "accoppiato con la @boardname@</a>. Once paired, the other device may connect to the @boardname@ and exchange data relating to many of the @boardname@'s features.

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

## Advanced

Per ulteriori informazioni avanzate sul servizio @boardname@ Bluetooth UART incluse informazioni sull'uso di uno smartphone, vedi la [documentazione tecnica Lancaster University @boardname@ runtime](http://lancaster-university.github.io/microbit-docs/ble/uart-service/)

## Guarda anche

[startAccelerometerService](/reference/bluetooth/start-accelerometer-service), [startButtonService](/reference/bluetooth/start-button-service), [startIOPinService](/reference/bluetooth/start-io-pin-service), [startLEDService](/reference/bluetooth/start-led-service), [startMagnetometerService](/reference/bluetooth/start-magnetometer-service), [startTemperatureService](/reference/bluetooth/start-temperature-service), [startUartService](/reference/bluetooth/start-uart-service), [uartReadUntil](/reference/bluetooth/uart-read-until), [uartWriteLine](/reference/bluetooth/uart-write-line), [uartWriteString](/reference/bluetooth/uart-write-string), [uartWriteNumber](/reference/bluetooth/uart-write-number), [uartWriteValue](/reference/bluetooth/uart-write-value), [onBluetoothConnected](/reference/bluetooth/on-bluetooth-connected), [onBluetoothDisconnected](/reference/bluetooth/on-bluetooth-disconnected)

```package
bluetooth
```