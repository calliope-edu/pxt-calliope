# Umleitung auf USB

Lege den seriellen Eingang und Ausgang auf die USB-Verbindung.

Der @boardname@ ist standardmäßig so eingestellt, dass er die USB-Verbindung für serielle Daten verwendet. Wenn die seriellen Daten derzeit umgeleitet werden, mit [redirect](/reference/serial/redirect), zu den Pins, kannst du sie wieder so einstellen, dass sie USB verwenden.

```sig
serial.redirectToUSB()
```

## Siehe auch

[serial](/device/serial), [redirect](/reference/serial/redirect)