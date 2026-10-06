# set Tx Buffer Size

Sets the length of the serial transmission buffer in bytes.

```sig
serial.setTxBufferSize(10)
```

## Parameter

* **size**: desired length of the transmission buffer (maximum 254)

## Beispiel

Allocates 64 bytes for the transmission buffer.

```typescript
serial.setTxBufferSize(64)
```

## Siehe auch

[set rx buffer size](/reference/serial/set-rx-buffer-size)