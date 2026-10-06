# Bluetooth UART Service

## ~nota

![](https://cdn.makecode.com/blob/5479e652051b327fa86ef770a2e277dc72052dd2/static/bluetooth/Bluetooth_SIG.png)

For another device like a smartphone to use any of the Bluetooth "services" which the @boardname@ has, it must first be [paired with the @boardname@](/reference/bluetooth/bluetooth-pairing). Once paired, the other device may connect to the @boardname@ and exchange data relating to many of the @boardname@'s features.

## ~

El servicio Bluetooth UART permite a otro dispositivo, como un smartphone, intercambiar los datos que desee con @boardname@, en trozos pequeños que están destinados a ser unidos. [UART](https://en.wikipedia.org/wiki/Universal_asynchronous_receiver/transmitter) significa Transmisor-Receptor Asíncrono Universal y es una forma en la que se pueden realizar comunicaciones de datos seriales, normalmente entre dos dispositivos conectados por una conexión física y por cable. El servicio Bluetooth UART emula el comportamiento de un sistema físico UART y permite el intercambio de un máximo de 20 bytes de datos en cualquier dirección.

Cuando se utiliza este servicio, el @boardname@ configura un búfer de 60 bytes y los datos que recibe se acumularán en el búfer hasta que esté lleno. Al utilizar el servicio UART de su código @boardname@, puedes indicar un carácter especial que se usará para significar que el mensaje completo, en como máximo tres trozos, ha sido enviado por el otro dispositivo conectado, momento en el que @boardname@ liberará todo el contenido de su búfer a cualquier código que intente leerlo. En otras palabras, este carácter especial, conocido como 'delimitador', es utilizado por el dispositivo conectado a la @boardname@ para decir "He enviado todo mi mensaje, ahora puedes usarlo".

You could use the UART service for many things. It doesn't care what you put in messages which makes it very flexible. Puedes crear un juego de adivinaciones, con preguntas y respuestas pasando entre @boardname@ y un smartphone o podrías conectar una cámara al @boardname@ y transmitir datos de imagen obtenidos desde el conector de bordes, en trozos desde el Bluetooth a un smartphone. Hay muchas posibilidades.

To use the Bluetooth UART service from another device you'll need additional @boardname@ code which reads and uses data from the UART buffer and / or writes data to the buffer for transmission over Bluetooth to another device.

```sig
bluetooth.startUartService();
```

## Example: Starting the Bluetooth UART service

The following code shows the Bluetooth UART service being started:

```blocks
bluetooth.startUartService();
```

## Video - UART service guessing game

https://www.youtube.com/watch?v=PgGeWddMAZ0

## Avanzado

For more advanced information on the @boardname@ Bluetooth UART service including information on using a smartphone, see the [Lancaster University @boardname@ runtime technical documentation](http://lancaster-university.github.io/microbit-docs/ble/uart-service/)

## Ver también

[About Bluetooth](/reference/bluetooth/about-bluetooth), [@boardname@ Bluetooth profile overview ](http://lancaster-university.github.io/microbit-docs/ble/profile/), [@boardname@ Bluetooth profile reference](http://lancaster-university.github.io/microbit-docs/resources/bluetooth/microbit-profile-V1.9-Level-2.pdf), [Bluetooth on @boardname@ resources](http://bluetooth-mdw.blogspot.co.uk/p/-microbit.html), [Bluetooth SIG](https://www.bluetooth.com)

```package
bluetooth
```