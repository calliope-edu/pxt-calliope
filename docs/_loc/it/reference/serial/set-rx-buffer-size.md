# set Rx Buffer Size

Sets the length of the serial reception buffer in bytes.

```sig
serial.setRxBufferSize(10)
```

## Parametri

* **size**: desired length of the reception buffer (maximum 254)

## Esempio

Allocates 64 bytes for the reception buffer.

```typescript
serial.setRxBufferSize(64)
```

## Vedi anche

[set tx buffer size](/reference/serial/set-tx-buffer-size)