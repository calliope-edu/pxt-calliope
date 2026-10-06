# UART Read

## ~hint

![](https://cdn.makecode.com/blob/5479e652051b327fa86ef770a2e277dc72052dd2/static/bluetooth/Bluetooth_SIG.png)

Per un altro dispositivo come uno smartphone, per usare i "servizi" Bluetooth che ha la @boardname@, deve prima essere "accoppiato con la @boardname@</a>. Once paired, the other device may connect to the @boardname@ and exchange data relating to many of the @boardname@'s features.

## ~

Il [servizio UART Bluetooth](/reference/bluetooth/start-uart-service) consente ad un altro dispositivo come uno smartphone di cambiare ogni dato che vuole con la @boardname@, in piccole celle.

Con il servizio UART Bluetooth in esecuzione, questo blocco consente ad una @boardname@ di leggere i dati che sono stati ricevuti da un dispositivo Bluetooth connesso, terminando la lettura e restituendo il valore ottenuto appena un carattere delimitatore specificato viene incontrato. Questo significa che i dispositivi connessi possono inviare dati alla @boardname@ ed indicano che il messaggio completo è stato inviato mettendo in attesa il messaggio con il carattere del delimitatore.

```sig
bluetooth.uartReadUntil("");
```

## Esempio: Avviare il servizio UART Bluetooth e poi leggere i dati ricevuti da un altro dispositivo che viene terminato dal carattere ":" e poi mostrarlo

```blocks
let uartData = "";
let connected = 0;
basic.showString("UART");
bluetooth.onBluetoothConnected(() => {
    basic.showString("C");
    connected = 1;
    while (connected == 1) {
        uartData = bluetooth.uartReadUntil(":");
        basic.showString(uartData);
    }
});
bluetooth.onBluetoothDisconnected(() => {
    basic.showString("D");
});

```

## Video - gioco di indovinelli del servizio UART

https://www.youtube.com/watch?v=PgGeWddMAZ0

## Advanced

Per ulteriori informazioni avanzate sul servizio @boardname@ Bluetooth UART incluse informazioni sull'uso di uno smartphone, vedi la [documentazione tecnica Lancaster University @boardname@ runtime](http://lancaster-university.github.io/microbit-docs/ble/uart-service/)

## Vedi anche

[About Bluetooth](/reference/bluetooth/about-bluetooth), [@boardname@ Bluetooth profile overview ](http://lancaster-university.github.io/microbit-docs/ble/profile/), [@boardname@ Bluetooth profile reference](http://lancaster-university.github.io/microbit-docs/resources/bluetooth/microbit-profile-V1.9-Level-2.pdf), [Bluetooth on @boardname@ resources](http://bluetooth-mdw.blogspot.co.uk/p/-microbit.html), [Bluetooth SIG](https://www.bluetooth.com)

```package
bluetooth
```