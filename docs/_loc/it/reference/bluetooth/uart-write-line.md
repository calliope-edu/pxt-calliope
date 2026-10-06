# UART Write Line

## ~hint
![](https://cdn.makecode.com/blob/5479e652051b327fa86ef770a2e277dc72052dd2/static/bluetooth/Bluetooth_SIG.png)

Per un altro dispositivo come uno smartphone, per usare i "servizi" Bluetooth che ha la @boardname@, deve prima essere "accoppiato con la @boardname@</a>. Once paired, the other device may connect to the @boardname@ and exchange data relating to many of the @boardname@'s features.

## ~

Il [servizio UART Bluetooth](/reference/bluetooth/start-uart-service) consente ad un altro dispositivo come uno smartphone di cambiare ogni dato che vuole con la @boardname@, in piccole celle.

With the Bluetooth UART service running, this block allows a @boardname@ to send a line of text to a Bluetooth connected device.

```sig
bluetooth.uartWriteLine("");
```

## Esempio: Avviare il servizio UART Bluetooth e poi inviare "HELLO" ogni volta che viene premuto il pulsante A ed un altro dispositivo si è connesso via Bluetooth

```blocks
let connected = 0;
bluetooth.onBluetoothConnected(() => {
    basic.showString("C");
    connected = 1;
});
bluetooth.onBluetoothDisconnected(() => {
    basic.showString("D");
    connected = 0;
});
input.onButtonEvent(Button.A, input.buttonEventValue(ButtonEvent.Down), () => {
    if (connected == 1) {
        bluetooth.uartWriteLine("HELLO");
    }
});
```

## Video - gioco di indovinelli del servizio UART

https://www.youtube.com/watch?v=PgGeWddMAZ0

## Advanced

Per ulteriori informazioni avanzate sul servizio @boardname@ Bluetooth UART incluse informazioni sull'uso di uno smartphone, vedi la [documentazione tecnica Lancaster University @boardname@ runtime](http://lancaster-university.github.io/microbit-docs/ble/uart-service/)

## Vedi anche

[About Bluetooth](/reference/bluetooth/about-bluetooth), [@boardname@ Bluetooth profile overview ](http://lancaster-university.github.io/microbit-docs/ble/profile/), [@boardname@ Bluetooth profile reference](http://lancaster-university.github.io/microbit-docs/resources/bluetooth/microbit-profile-V1.9-Level-2.pdf),  [Bluetooth on @boardname@ resources](http://bluetooth-mdw.blogspot.co.uk/p/-microbit.html), [Bluetooth SIG](https://www.bluetooth.com)

```package
bluetooth
```