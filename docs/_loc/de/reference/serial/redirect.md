# redirect

Konfiguriere den seriellen Port zur Verwendung der Pins anstelle von USB.

```sig
serial.redirect(SerialPin.P0, SerialPin.P0, BaudRate.BaudRate115200);
```
Die Standardverbindung für den seriellen Port erfolgt über ein USB-Kabel. Du kannst die seriellen Daten stattdessen über Drähte leiten, die mit den Pins auf dem @boardname@ verbunden sind. Um die Eingabe und Ausgabe für die serielle Verbindung auf die Pins umzuleiten, leitest du sie zu diesen um. Außerdem entscheidest du, wie schnell du die Daten auf den Pins senden und empfangen möchten, indem du eine _Baudrate_ wählst.

## Parameter

* **tx**: der Übertragungs-[Pin](/device/pins), um serielle Daten zu senden.
* **rx**: der Empfangs-[Pin](/device/pins), um serielle Daten zu empfangen.
* **rate**: die Baudrate für das Senden und Empfangen von Daten. Baudraten kannst du wählen zwischen: >`300`, `1200`, `2400`, `4800`, `9600`, `14400`, `19200`, `28800`, `31250`, `38400`, `57600 ` oder `115200`

## ~hint
**Baud rate**

Serial communication transmits data by sending one bit of a [digital number](/types/buffer/number-format) (usually a byte sized number), at a time. So, the data bytes are sent as a series of their bits. Serial communication uses just one wire to send these bits so only one bit can travel across the wire at a time.

When pins on your @boardname@ are configured for serial communication, they make a serial port for data. The port switches the voltage on the pins to represent a new bit to send on the wire. A series of these voltage changes eventually sends a complete byte of data. The speed at which the voltage changes create a signal to communicate the bits is called the _baud_ rate.

You will typically use `9600` or `115200` for your baud rate. Sometimes the device you connect to can figure out what your baud rate is. Most of the time though, you need to make sure the device you connect to is set to match your baud rate.

## ~

## Beispiel

Change where serial data is sent to and received from. When button **A** is pressed, reconfigure the serial port to use the pins. The new configuration uses pin `P1` to transmit and `P2` to receive. The baud rate is set to `9600`.

```blocks
input.onButtonEvent(Button.A, input.buttonEventClick(), () => {
    serial.redirect(SerialPin.P1, SerialPin.P2, BaudRate.BaudRate9600);
});
```

## Siehe auch

[serial](/device/serial), [redirectToUSB](/reference/serial/redirect-to-usb)