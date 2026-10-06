# set Rx Buffer Size

Sets the length of the serial reception buffer in bytes.

```sig
serial.setRxBufferSize(10)
```

## Parameters

* **size**: desired length of the reception buffer (maximum 254)

## Ejemplo

Allocates 64 bytes for the reception buffer.

```typescript
serial.setRxBufferSize(64)
```

## Ver también

[set tx buffer size](/reference/serial/set-tx-buffer-size)