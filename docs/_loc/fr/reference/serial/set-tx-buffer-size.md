# set Tx Buffer Size

Sets the length of the serial transmission buffer in bytes.

```sig
serial.setTxBufferSize(10)
```

## Paramètres

* **size**: desired length of the transmission buffer (maximum 254)

## Exemple

Allocates 64 bytes for the transmission buffer.

```typescript
serial.setTxBufferSize(64)
```

## Voir Aussi

[set rx buffer size](/reference/serial/set-rx-buffer-size)