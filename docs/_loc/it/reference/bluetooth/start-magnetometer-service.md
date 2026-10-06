# Servizio del Magnetometro Bluetooth

## ~hint

![](https://cdn.makecode.com/blob/5479e652051b327fa86ef770a2e277dc72052dd2/static/bluetooth/Bluetooth_SIG.png)

Per un altro dispositivo come uno smartphone, per usare i "servizi" Bluetooth che ha la @boardname@, deve prima essere "accoppiato con la @boardname@</a>. Once paired, the other device may connect to the @boardname@ and exchange data relating to many of the @boardname@'s features.

## ~

Il servizio di magnetometro del Bluetooth consente ad un altro dispositivo come uno smartphone di ricevere dati dal magnetometro della @boardname@ via wireless. Il magnetometro misura la forza e la direzione dei campi magentici inclusi quelli della terra e quindi è utilizzabile come bussola digitale ed indica la direzione in cui la @boardname@ punta in relazione al nord magnetico.

Usando il servizio di magnetometro del Bluetooth, per esempio, crea un'applicazione smartphone che mostra la tua direzione di viaggio, aggiornandolo in tempo reale.

Nessun codice aggiuntivo è necessario sulla @boardname@ per usare il servizio del magnetometro bluetooth da un altro dispositivo.

```sig
bluetooth.startMagnetometerService();
```

## Esempio: Avviare il servizio del magnetometro Bluetooth

Il codice seguente mostra l'avvio del servizio del magnetometro del Bluetooth:

```blocks
bluetooth.startMagnetometerService();
```

## Video - Demo del servizio del magnetometro

http://www.youtube.com/watch?v=C_0VL4Gp4_U

## Advanced

Per ulteriori informazioni avanzate sul servizio @boardname@ magnetometro Bluetooth incluse informazioni sull'usare uno smartphone, vedi la [documentazione tecnica d'esecuzione Lancaster University @boardname@](http://lancaster-university.github.io/microbit-docs/ble/magnetometer-service/)

## Vedi anche

[About Bluetooth](/reference/bluetooth/about-bluetooth), [@boardname@ Bluetooth profile overview ](http://lancaster-university.github.io/microbit-docs/ble/profile/), [@boardname@ Bluetooth profile reference](http://lancaster-university.github.io/microbit-docs/resources/bluetooth/microbit-profile-V1.9-Level-2.pdf), [Bluetooth on @boardname@ resources](http://bluetooth-mdw.blogspot.co.uk/p/-microbit.html), [Bluetooth SIG](https://www.bluetooth.com)

```package
bluetooth
```