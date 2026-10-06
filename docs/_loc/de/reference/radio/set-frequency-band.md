# set Frequency Band

Change the transmission and reception band of the radio to the given channel. Default is 7.

```sig
radio.setFrequencyBand(50);
```

## Parameter

* `band` is a [number](/types/number) between `0` and `83`. Each step is 1MHz wide, based at 2400MHz.

## Simulator

Diese Funktion funktioniert nur auf dem @boardname@, nicht in Browsern.

## Beispiel

This program makes the `radio` use frequency band 50.

```blocks
radio.setFrequencyBand(50)
```

## Siehe auch

[received packet](/reference/radio/received-packet), [send number](/reference/radio/send-number), [send value](/reference/radio/send-value), [send string](/reference/radio/send-string)

```package
Funk
```