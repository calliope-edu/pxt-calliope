# imposta Potenza Trasmissione

Rendi più forte o più debole il segnale `radio` della @boardname@.

```sig
radio.setTransmitPower(7);
```

The signal can be as weak as `0` and as strong as `7`. Default is `6`.

The scientific name for the strength of the `radio` signal is **dBm**, or **decibel-milliwatts**. A signal strength of `0` can be measured as -30 dBm, and a strength of `7` can be measured as +4 dBm.

## Intervallo

Se la tua @boardname@ sta inviando con una forza di `7`, e sei in un'area aperta senza molti altri computer intorni, il segnale @boardname@ può raggiungere fino a 70 metri (circa 230 piedi).

## Parametri

* `power` is a [number](/types/number) between `0` and `7` that means how strong the signal is.

## Simulatore

This function only works on the @boardname@, not in browsers.

## Esempio

This program makes the `radio` send at full strength.

```blocks
radio.setTransmitPower(7)
```

## Vedi anche

[received packet](/reference/radio/received-packet), [send number](/reference/radio/send-number), [send value](/reference/radio/send-value), [send string](/reference/radio/send-string)

```package
funk
```