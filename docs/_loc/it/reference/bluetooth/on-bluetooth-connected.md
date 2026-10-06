# On Bluetooth Connected

## ~hint

![](https://cdn.makecode.com/blob/5479e652051b327fa86ef770a2e277dc72052dd2/static/bluetooth/Bluetooth_SIG.png)

Per un altro dispositivo come uno smartphone, per usare i "servizi" Bluetooth che ha la @boardname@, deve prima essere "accoppiato con la @boardname@</a>. Once paired, the other device may connect to the @boardname@ and exchange data relating to many of the @boardname@'s features.

## ~

This block starts an [event handler](/reference/event-handler) which in this case will run when something connects to your @boardname@ using Bluetooth.

```sig
bluetooth.onBluetoothConnected(() => {});
```

## Esempio

Potresti usare questo gestore eventi per mostrare una lettera "C" sulla griglia dei LED della @boardname@ così che tu sappia di avere una connessione Bluetooth. O potresti voler inviare dei dati che hai accumulato sul tuo smartphone appena si connette alla tua @boardname@. Maybe you've been using the accelerometer in your @boardname@ to count your steps for example. Using this event handler you could send the accumulated step count to your phone when it establishes a Bluetooth connection.

```blocks
bluetooth.onBluetoothConnected(() => {
    basic.showString("C");
});
```

## Video - on Bluetooth connected

http://www.youtube.com/watch?v=HyBcsD9Eh6I

## Vedi anche

[About Bluetooth](/reference/bluetooth/about-bluetooth), [@boardname@ Bluetooth profile overview ](http://lancaster-university.github.io/microbit-docs/ble/profile/), [@boardname@ Bluetooth profile reference](http://lancaster-university.github.io/microbit-docs/resources/bluetooth/microbit-profile-V1.9-Level-2.pdf), [Bluetooth on @boardname@ resources](http://bluetooth-mdw.blogspot.co.uk/p/-microbit.html), [Bluetooth SIG](https://www.bluetooth.com)

```package
bluetooth
```