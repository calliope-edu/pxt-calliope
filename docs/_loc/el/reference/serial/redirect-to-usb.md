# redirect To USB

Κατεύθυνση της σειριακής εισόδου και εξόδου στη χρήση της σύνδεσης USB.

The @boardname@ is set to use the USB connection for serial data by default. If serial data is currently redirected, using [redirect](/reference/serial/redirect), to the pins, you can set it back to use USB.

```sig
serial.redirectToUSB()
```

## See also

[serial](/device/serial), [redirect](/reference/serial/redirect)