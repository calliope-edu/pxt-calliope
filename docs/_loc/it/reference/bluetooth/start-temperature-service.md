# Servizio Temperatura Bluetooth

## ~hint

![](https://cdn.makecode.com/blob/5479e652051b327fa86ef770a2e277dc72052dd2/static/bluetooth/Bluetooth_SIG.png)

Per un altro dispositivo come uno smartphone, per usare i "servizi" Bluetooth che ha la @boardname@, deve prima essere "accoppiato con la @boardname@</a>. Once paired, the other device may connect to the @boardname@ and exchange data relating to many of the @boardname@'s features.

## ~

A @boardname@ is able to provide a rough measure of the current environmental temperature. It's an approximation only as in fact the temperature value is inferred from the temperature of its main processor. Il servizio di temperatura del Bluetooth consente ad un altro dispositivo come uno smartphone di scoprire via wireless la lettura della temperatura corrente della @boardname@ o di ricevere un flusso di valori dei dati della temperatura. Temperature values are expressed in degrees celsius.

Usare il servizio di temperatura del Bluetooth puoi trasformare il tuo smartphone o tablet in un termometro grafico usando il tuo @boardname@ come sensore.

Nessun codice aggiuntivo è necessario sulla @boardname@ per usare il servizio della temperatura del Bluetooth da un altro dispositivo.

```sig
bluetooth.startTemperatureService();
```

## Esempio: Avviare il servizio della temperatura del Bluetooth

Il codice seguente mostra il servizio di temperatura del Bluetooth che viene avviato:

```blocks
bluetooth.startTemperatureService();
```

## Video - Temperature service demo - Starts at 3:05

http://www.youtube.com/watch?v=aep_GVowKfs

## Advanced

Per ulteriori informazioni sul servizio @boardname@ temperatura Bluetooth incluse informazioni sull'usare uno smartphone, vedi la [documentazione tecnica d'esecuzione Lancaster University @boardname@](http://lancaster-university.github.io/microbit-docs/ble/temperature-service/)

## Vedi anche

[About Bluetooth](/reference/bluetooth/about-bluetooth), [@boardname@ Bluetooth profile overview ](http://lancaster-university.github.io/microbit-docs/ble/profile/), [@boardname@ Bluetooth profile reference](http://lancaster-university.github.io/microbit-docs/resources/bluetooth/microbit-profile-V1.9-Level-2.pdf), [Bluetooth on @boardname@ resources](http://bluetooth-mdw.blogspot.co.uk/p/-microbit.html), [Bluetooth SIG](https://www.bluetooth.com)

```package
bluetooth
```