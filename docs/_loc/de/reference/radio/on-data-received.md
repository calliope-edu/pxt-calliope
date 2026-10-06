# on Data Received

Teile eines Programms werden ausgeführt, wenn der @boardname@ den [Ziffernwert](/types/number) oder einen[String](/types/string) über Funk erhält.

```sig
radio.onDataReceived(() => { });
```

### ~ alert

#### Deprecated API

This API has been deprecated! Use [on received number](/reference/radio/on-received-number) instead.

### ~

```sig
radio.onDataReceived(() => { });
```

## Beispiel

This program keeps sending numbers that says how fast the @boardname@ is slowing down or speeding up. It also receives numbers for the same thing from nearby @boardname@s. It shows these numbers as a [bar graph](/reference/led/plot-bar-graph).

```blocks
basic.forever(() => {
    radio.sendNumber(input.acceleration(Dimension.X));
})
radio.onDataReceived(() => {
    led.plotBarGraph(radio.receiveNumber(), 1023);
})
```

## Siehe auch

[on received number](/reference/radio/on-received-number), [send number](/reference/radio/send-number), [set group](/reference/radio/set-group)

```package
Funk
```