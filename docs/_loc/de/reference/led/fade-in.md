# Fade in

Erhöht schrittweise die Helligkeit des [LED-Bildschirm](/device/screen) bis die LED-Lampen mit voller Helligkeit leuchten.

```sig
led.fadeIn(700);
```

## Parameter

* ms - [Zahl](/types/number); die Geschwindigkeit, mit der die Bildschirmhelligkeit erhöht wird, ausgedrückt in Millisekunden (1.000 Millisekunden = 1 Sekunde). Je kleiner die Zahl ist, desto schneller nimmt die Helligkeit des Bildschirms zu.

## Beispiel: verblassender Punkt

Der folgende Code schaltet die mittlere-LED ein und erhöht und verringert die Helligkeit des Bildschirms (die mittel-LED pulsiert 5-mal):

```blocks
led.plot(2, 2)
for (let i = 0; i < 5; i++) {
    led.setBrightness(0)
    led.fadeIn(100)
    basic.pause(100)
    led.fadeOut(100)
}
```

## Siehe auch

[brightness](/reference/led/brightness), [fade out](/reference/led/fade-out), [set brightness](/reference/led/set-brightness)