# Servizio LED Bluetooth

## ~hint

![](https://cdn.makecode.com/blob/5479e652051b327fa86ef770a2e277dc72052dd2/static/bluetooth/Bluetooth_SIG.png)

Per un altro dispositivo come uno smartphone, per usare i "servizi" Bluetooth che ha la @boardname@, deve prima essere "accoppiato con la @boardname@</a>. Once paired, the other device may connect to the @boardname@ and exchange data relating to many of the @boardname@'s features.

## ~

Il servizio LED del Bluetooth consente ad un altro dispositivo come uno smartphone per inviare stringhe o modelli di testo breve su una connessione Bluetooth ad una @boardname@ da mostrare sulla sua matrice LED. Il testo scorrerà per la @boardname@ e la velocità a cui scorre può anche essere controllata usando il servizio LED Bluetooth. Devices using the LED service may also read the current state of the @boardname@'s LED matrix.

Così puoi, per esempio, disegnare una faccina sorridente in un'app smartphone e poi alla pressione di un pulsante, farla magicamente comparire sulla tua @boardname@ sull'altro lato della stanza. O potresti programmare il tuo smartphone per far inviare un messaggio al tuo @boardname@ ogni volta che il tuo telefono riceve un'email, SMS o messaggio social media così che tu possa indossare il tuo @boardname@ come uno smart watch e lascia il tuo telefono nella tua borsa.

Nessun codice aggiuntivo è necessario sulla @boardname@ per usare il servizio LED Bluetooth da un altro dispositivo.

```sig
bluetooth.startLEDService();
```

## Esempio: Avviare il servizio LED Bluetooth

Il codice seguente mostra l'avvio del servizio LED Bluetooth:

```blocks
bluetooth.startLEDService();
```

## Video - LED service demo starts at 2:00

http://www.youtube.com/watch?v=aep_GVowKfs

## Advanced

Per ulteriori informazioni avanzate sul servizio @boardname@ LED Bluetooth incluse informazioni sull'usare uno smartphone, vedi la [documentazione tecnica di esecuzione Lancaster University @boardname@](http://lancaster-university.github.io/microbit-docs/ble/led-service/)

## Vedi anche

[About Bluetooth](/reference/bluetooth/about-bluetooth), [@boardname@ Bluetooth profile overview ](http://lancaster-university.github.io/microbit-docs/ble/profile/), [@boardname@ Bluetooth profile reference](http://lancaster-university.github.io/microbit-docs/resources/bluetooth/microbit-profile-V1.9-Level-2.pdf), [Bluetooth on @boardname@ resources](http://bluetooth-mdw.blogspot.co.uk/p/-microbit.html), [Bluetooth SIG](https://www.bluetooth.com)

```package
bluetooth
```