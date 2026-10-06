# Setze Pegel

Konfiguriere den elektrischen Pegel / das Ausgangsniveau (Pull) des angegebenen Pins.

Viele @boardname@ Pins können als *pull-ups* konfiguriert werden. Zum Beispiel kann ein Pull-Up die Pin-Spannung auf hoch setzen (3,3 Volt oder `1` wenn [digitale Werte von Pin](/reference/pins/digital-read-pin)) aufgerufen wird. Wenn ein Ende eines Buttons mit `P0` (auf Hoch) verbunden ist und das andere Ende mit `GND` (0 Volt), dann wird, wenn du den Knopf drückst, `P0` auf 0 Volt gezogen und die @boardname@ Software erkennt einen Tastendruck.

```sig
pins.setPull(DigitalPin.C9, PinPullMode.PullDown);
```

Die Pullup- und Pulldown-Widerstände betragen etwa 13 kOhm.

## Parameter

* `name`: Der @boardname@ Hardware-Pin zum Konfigurieren (`P0-P3` oder `C0-C18`)
* `pull`: Der Pull, zu dem der Pin gesetzt werden soll (**nach unten**, **hoch**, oder **keiner**)

## Beispiel

Das folgende Beispiel setzt den Pin `P0` nach**oben** (hoch).

```blocks
pins.setPull(DigitalPin.P0, PinPullMode.PullUp);
```

## Siehe auch

[@boardname@ | mbed](https://developer.mbed.org/platforms/Microbit/)