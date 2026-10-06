# Sendeleistung einstellen

Verstärke oder schwäche das `Funksignal` des @boardname@.

```sig
radio.setTransmitPower(7);
```

Das Signal kann so schwach wie `0` und so stark wie `7` sein. Die Standardeinstellung ist `6`.

Der wissenschaftliche Name für die Stärke des `Funk` Signals ist **dBm**, oder **decibel-milliwatts**. Eine Signalstärke von `0` kann als -30 dBm gemessen werden, und eine Stärke von `7` kann gemessen an +4 dBm.

## Reichweite

Wenn dein @boardname@ mit einer Stärke von `7` sendet, und du in einem offenen Bereich ohne viele andere Computer bist, kann das @boardname@ Funksignal bis zu 70 Meter weit reichen.

## Parameter

* `Kraft` ist eine [Zahl,](/types/number) die zwischen `0` und `7` liegt, die angibt, wie stark das Signal ist.

## Simulator

Diese Funktion funktioniert nur auf dem @boardname@, nicht in Browsern.

## Beispiel

Dieses Programm setzt den `Funk` auf volle Stärke.

```blocks
radio.setTransmitPower(7)
```

## Siehe auch

[received packet](/reference/radio/received-packet), [send number](/reference/radio/send-number), [send value](/reference/radio/send-value), [send string](/reference/radio/send-string)

```package
Funk
```