# received Signal Strength

Finde heraus, wie stark das Funksignal ist.

```sig
radio.receivedSignalstärke();
```

### ~ hint

#### Veraltet

Diese API ist veraltet! Verwende stattdessen das [empfangene Paket](/reference/radio/received-packet).

### ~

Find how strong the `radio` signal is, from `-128` to `-28`. (`-128` means a weak signal and `-28` means a strong one.)

The @boardname@ finds the signal strength by checking how strong it was the last time it ran the [on received number](/reference/radio/on-received-number) function. Das bedeutet es muss zuerst **Nummer empfangen** ausgeführt werden.

## Rückgabewert

* a [number](/types/number) between `-128` and `-28` that means how strong the signal is.

### ~ hint

#### Signalstärke und Board-Version

Die Messung der empfangenen Signalstärke, hängt davon ab, welche Version von @boardname@ sie besitzen. The @boardname@ boards prior to v2 can typically measure a signal strength up to `-42` dBm. Now, v2 boards will measure a signal strength up to `-28` dBm (typical).

### ~

## Simulator

Diese Funktion funktioniert nur auf dem @boardname@, nicht in Browsern.

## Beispiel

Dieses Beispiel zeigt, wie stark das Funksignal der [Lichtpegel-Senderbeispiel](/reference/radio/send-number) ist.

```blocks
let x = 0;
radio.setGroup(99);
basic.forever(() => {
    x = radio.receiveNumber();
    basic.showNumber(radio.receivedSignalStrength());
});
```

## Siehe auch

[on received number](/reference/radio/on-received-number), [send number](/reference/radio/send-number), [on data received](/reference/radio/on-data-received), [received packet](/reference/received-packet)

```package
Funk
```