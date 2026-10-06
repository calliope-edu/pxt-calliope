# Invia Buffer

Sends a buffer to other @boardname@s in the area connected by radio. The maximum buffer length is 19 bytes.

```sig
radio.sendBuffer(pins.createBuffer(1))
```

## Parametri

* `msg` è un [buffer](/types/buffer) per inviare via radio.


## Example: Remote level

If you load this program onto two @boardname@s, each board will send the level information to the other board.

```typescript
let ax = 0;
let ay = 0;
radio.setGroup(6)
basic.forever(() => {
    ax = input.acceleration(Dimension.X);
    ay = input.acceleration(Dimension.Y);

    // encode data in buffer
    let buf = pins.createBuffer(4)
    buf.setNumber(NumberFormat.Int16LE, 0, ax)
    buf.setNumber(NumberFormat.Int16LE, 2, ay)
    radio.sendBuffer(buf)
})

radio.onReceivedBuffer(function (receivedBuffer) {
    // decode data from buffer
    ax = receivedBuffer.getNumber(NumberFormat.Int16LE, 0);
    ay = receivedBuffer.getNumber(NumberFormat.Int16LE, 2);

    // display
    basic.clearScreen()
    led.plot(
        pins.map(ax, -1023, 1023, 0, 4),
        pins.map(ay, -1023, 1023, 0, 4)
    )
});
```

## ~hint

A radio that can both transmit and receive is called a _transceiver_.

## ~

## Vedi anche

[on received buffer](/reference/radio/on-received-buffer)

```package
funk
```