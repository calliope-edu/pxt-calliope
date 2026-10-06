# Servizio Pulsante Bluetooth

## ~hint

![](https://cdn.makecode.com/blob/5479e652051b327fa86ef770a2e277dc72052dd2/static/bluetooth/Bluetooth_SIG.png)

Per un altro dispositivo come uno smartphone, per usare i "servizi" Bluetooth che ha la @boardname@, deve prima essere "accoppiato con la @boardname@</a>. Once paired, the other device may connect to the @boardname@ and exchange data relating to many of the @boardname@'s features.

## ~

Il servizio del pulsante Bluetooth rende possibile che un altro dispositivo come uno smartphone sia notificato via wireless ogni volta che un pulsante sul fronte della @boardname@ viene premuto. Each of the two @boardname@ buttons can be in one of three possible states:

* Not pressed
* Pressed
* Long press - pressed and held down for at least 2 seconds 

Il servizio pulsante ti consente di fare altre cose connesse alla tua @boardname@ usando il Bluetooth che risponde in qualche modo quando premi entrambi i pulsanti. Potresti, per esempio, nascondere il tuo smartphone da qualche parte nella stanza e fargli fare un piacevole rumore quando premi il pulsante sulla @boardname@. We'll leave it to you to decide what would be amusing.

Nessun codice aggiuntivo è necessario sulla @boardname@ per usare il servizio del pulsante Bluetooth da un altro dispositivo.

```sig
bluetooth.startButtonService();
```

## Example: Starting the Bluetooth button service

The following code shows the Bluetooth button service being started:

```blocks
bluetooth.startButtonService();
```

## Video - Button service demo - Starts at 0:59

http://www.youtube.com/watch?v=aep_GVowKfs

## Advanced

Per ulteriori informazioni sul servizio @boardname@ pulsante Bluetooth incluse informazioni sull'usare uno smartphone, vedi la [documentazione tecnica di esecuzione di Lancaster University @boardname@](http://lancaster-university.github.io/microbit-docs/ble/button-service/)

## Vedi anche

[About Bluetooth](/reference/bluetooth/about-bluetooth), [@boardname@ Bluetooth profile overview ](http://lancaster-university.github.io/microbit-docs/ble/profile/), [@boardname@ Bluetooth profile reference](http://lancaster-university.github.io/microbit-docs/resources/bluetooth/microbit-profile-V1.9-Level-2.pdf), [Bluetooth on @boardname@ resources](http://bluetooth-mdw.blogspot.co.uk/p/-microbit.html), [Bluetooth SIG](https://www.bluetooth.com)

```package
bluetooth
```