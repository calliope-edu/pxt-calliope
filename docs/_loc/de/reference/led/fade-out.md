# Fade out

Reduziert schrittweise die Helligkeit des [LED-Bildschirms](/device/screen) bis die LED-Lampen ausgeschaltet sind.

```sig
led.fadeOut(700);
```

## Parameter

* ms - [Zahl](/types/number); die Geschwindigkeit, mit der die Bildschirmhelligkeit verringert wird, ausgedrückt in Millisekunden (1.000 Millisekunden = 1 Sekunde). Je kleiner die Zahl ist, desto schneller nimmt die Helligkeit des Bildschirms ab.

## Beispiel: Der Buchstabe A verblasst

Das folgende Beispiel legt die Helligkeit des Bildschirms auf die maximale Helligkeit fest, zeigt den Buchstaben A an und blendet den Buchstaben dann allmählich aus:

```blocks
led.setBrightness(255)
basic.showString("A", 1000)
led.fadeOut(1000)
```

## Siehe auch

[brightness](/reference/led/brightness), [fade in](/reference/led/fade-in), [set brightness](/reference/led/set-brightness)