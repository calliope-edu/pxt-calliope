# set Tx Buffer Size

Sets the length of the serial transmission buffer in bytes.

```sig
serial.setTxBufferSize(10)
```

## Parametri

* **size**: desired length of the transmission buffer (maximum 254)

## Esempio

Allocates 64 bytes for the transmission buffer.

```typescript
serial.setTxBufferSize(64)
```

## Vedi anche

[set rx buffer size](/reference/serial/set-rx-buffer-size)