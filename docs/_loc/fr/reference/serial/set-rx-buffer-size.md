# set Rx Buffer Size

Sets the length of the serial reception buffer in bytes.

```sig
serial.setRxBufferSize(10)
```

## Paramètres

* **size**: desired length of the reception buffer (maximum 254)

## Exemple

Allocates 64 bytes for the reception buffer.

```typescript
serial.setRxBufferSize(64)
```

## Voir Aussi

[set tx buffer size](/reference/serial/set-tx-buffer-size)