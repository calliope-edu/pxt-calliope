# set Tx Buffer Size

Sets the length of the serial transmission buffer in bytes.

```sig
serial.setTxBufferSize(10)
```

## Parameters

* **size**: desired length of the transmission buffer (maximum 254)

## Ejemplo

Allocates 64 bytes for the transmission buffer.

```typescript
serial.setTxBufferSize(64)
```

## Ver también

[set rx buffer size](/reference/serial/set-rx-buffer-size)