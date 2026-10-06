# Bluetooth

Unterstützung für zusätzliche Bluetooth-Dienste.

## ~hint

![](https://cdn.makecode.com/blob/5479e652051b327fa86ef770a2e277dc72052dd2/static/bluetooth/Bluetooth_SIG.png)

Um einen der Bluetooth-"Dienste" des @boardname@ mit einem anderen Gerät wie einem Smartphone zu nutzen, muss es zunächst [mit dem @boardname@ gekoppelt werden](/reference/bluetooth/bluetooth-pairing). Nach dem Koppeln kann das andere Gerät eine Verbindung zum @boardname@ herstellen und Daten über viele der @boardname@-Funktionen austauschen.

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

## Fortgeschritten

Weiterführende Informationen zum @boardname@ Bluetooth UART-Dienst, einschließlich Informationen zur Verwendung eines Smartphones, finden Sie in der [@boardname@ technischen Dokumentation der Universität Lancaster](http://lancaster-university.github.io/microbit-docs/ble/uart-service/)

## Siehe auch

[startAccelerometerService](/reference/bluetooth/start-accelerometer-service), [startButtonService](/reference/bluetooth/start-button-service), [startIOPinService](/reference/bluetooth/start-io-pin-service), [startLEDService](/reference/bluetooth/start-led-service), [startMagnetometerService](/reference/bluetooth/start-magnetometer-service), [startTemperatureService](/reference/bluetooth/start-temperature-service), [startUartService](/reference/bluetooth/start-uart-service), [uartReadUntil](/reference/bluetooth/uart-read-until), [uartWriteLine](/reference/bluetooth/uart-write-line), [uartWriteString](/reference/bluetooth/uart-write-string), [uartWriteNumber](/reference/bluetooth/uart-write-number), [uartWriteValue](/reference/bluetooth/uart-write-value), [onBluetoothConnected](/reference/bluetooth/on-bluetooth-connected), [onBluetoothDisconnected](/reference/bluetooth/on-bluetooth-disconnected)

```package
Bluetooth
```