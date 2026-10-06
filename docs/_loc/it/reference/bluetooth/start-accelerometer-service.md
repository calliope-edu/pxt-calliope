# Bluetooth Accelerometer Service

## ~hint

![](https://cdn.makecode.com/blob/5479e652051b327fa86ef770a2e277dc72052dd2/static/bluetooth/Bluetooth_SIG.png)

Per un altro dispositivo come uno smartphone, per usare i "servizi" Bluetooth che ha la @boardname@, deve prima essere "accoppiato con la @boardname@</a>. Once paired, the other device may connect to the @boardname@ and exchange data relating to many of the @boardname@'s features.

## ~

Il servizio di accelerometro Bluetooth consente ad un altro dispositivo come uno smartphone di ricevere dati via wireless dall'accelerometro della @boardname@. An accelerometer detects motion. More precisely, it measures acceleration in one or more of three directions which we call X, Y and Z.

Usando il servizio di accelerometro del Bluetooth potresti, per esempio, creare un'applicazione smartphone che produce un suono forte ogni volta che la tua @boardname@ (o la cosa importante a cui ti sei allegato) viene mossa. O potresti usare la tua @boardname@ per controllare il movimento di un carattere dei cartoni in un gioco sul tuo smartphone solo inclinando la @boardname@ nella direzione in cui vuoi che il personaggio si muova.

No additional code is needed on the @boardname@ to use the Bluetooth accelerometer service from another device.

```sig
bluetooth.startAccelerometerService();
```

## Example: Starting the Bluetooth accelerometer service

The following code shows the Bluetooth accelerometer service being started:

```blocks
bluetooth.startAccelerometerService();
```

## Video - Accelerometer service demo - Starts at 0:18

http://www.youtube.com/watch?v=aep_GVowKfs#t=18s

## Advanced

Per ulteriori informazioni avanzate sul servizio @boardname@ accelerometro Bluetooth incluse informazioni sull'usare uno smartphone, vedi la [documentazione tecnica d'esecuzione di Lancaster University @boardname@](http://lancaster-university.github.io/microbit-docs/ble/accelerometer-service/)

## Vedi anche

[About Bluetooth](/reference/bluetooth/about-bluetooth), [@boardname@ Bluetooth profile overview ](http://lancaster-university.github.io/microbit-docs/ble/profile/), [@boardname@ Bluetooth profile reference](http://lancaster-university.github.io/microbit-docs/resources/bluetooth/microbit-profile-V1.9-Level-2.pdf), [Bluetooth on @boardname@ resources](http://bluetooth-mdw.blogspot.co.uk/p/-microbit.html), [Bluetooth SIG](https://www.bluetooth.com)

```package
bluetooth
```