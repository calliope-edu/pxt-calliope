# Servizio Pin IO Bluetooth

## ~hint

![](https://cdn.makecode.com/blob/5479e652051b327fa86ef770a2e277dc72052dd2/static/bluetooth/Bluetooth_SIG.png)

Per un altro dispositivo come uno smartphone, per usare i "servizi" Bluetooth che ha la @boardname@, deve prima essere "accoppiato con la @boardname@</a>. Once paired, the other device may connect to the @boardname@ and exchange data relating to many of the @boardname@'s features.

## ~

Il servizio di pin IO Bluetooth rende possibile per un altro dispositivo come uno smartphone per comunicare con altre 'cose' elettroniche connesse ad un connettore edge di @boardname@. Puoi per esempio, usare il tuo smartphone per accendere o spegnere una luce che è connessa alla @boardname@ o il tuo smartphone potrebbe ricevere i dati raccolti da un sensore connesso alla @boardname@. Difatti potresti fare entrambe le cose allo stesso tempo poiché il servizio pin IO del Bluetooth ti fa interagire con 'pin' multipli sul connettore di bordo in modi differenti in contemporanea.

Nessun codice aggiuntiva sulla @boardname@ per usare il servizio pin IO Bluetooth da un altro dispositivo.

```sig
bluetooth.startIOPinService();
```

## Esempio: Avviare il servizio pin IO Bluetooth

Il seguente codice mostra il servizio pin IO Bluetooth che viene avviato:

```blocks
bluetooth.startIOPinService();
```

## Video - IO pin service demo starts at 3:49

http://www.youtube.com/watch?v=aep_GVowKfs

## Advanced

Per ulteriori informazioni avanzate sul servizio @boardname@ pin IO Bluetooth incluse informazioni sull'usare uno smartphone, vedi la [documentazione tecnica d'esecuzione Lancaster University @boardname@](http://lancaster-university.github.io/microbit-docs/ble/iopin-service/)

## Vedi anche

[About Bluetooth](/reference/bluetooth/about-bluetooth), [@boardname@ Bluetooth profile overview ](http://lancaster-university.github.io/microbit-docs/ble/profile/), [@boardname@ Bluetooth profile reference](http://lancaster-university.github.io/microbit-docs/resources/bluetooth/microbit-profile-V1.9-Level-2.pdf), [Bluetooth on @boardname@ resources](http://bluetooth-mdw.blogspot.co.uk/p/-microbit.html), [Bluetooth SIG](https://www.bluetooth.com)

```package
bluetooth
```