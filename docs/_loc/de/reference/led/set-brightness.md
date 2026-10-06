# Set Brightness

Macht den [LED-Bildschirm](/device/screen) so hell, wie angegeben wenn er eingeschaltet ist.

```sig
led.setBrightness(121)
```

## Parameter

* Zum Beispiel bedeutet die Zahl `127`, dass die Anzeige halb so hell ist, wenn sie eingeschaltet ist. Zum Beispiel bedeutet die Zahl `127`, dass die LED-Anzeige beim Einschalten nur halb so hell ist.

## ~ hint

Die Helligkeit wird im Simulator nicht unterstützt. Du musst es auf dem @boardname@ selbst ausprobieren!

## ~

## Beispiel: Helligkeit ändern

Dieses Programm stellt die Helligkeit der Anzeige auf 100% (`255`) ein. Dann schaltet es die mittlere LED (`2, 2`) ein, wartet eine Sekunde und stellt dann die Helligkeit der Anzeige auf 50% (`128`) ein:

```blocks
led.setBrightness(255)
led.plot(2, 2)
basic.pause(1000)
led.setBrightness(led.brightness() / 2)
```

## Siehe auch

[Helligkeit](/reference/led/brightness), [allmählich erhöhen](/reference/led/fade-in), [allmählich verringern](/reference/led/fade-out), [LED-Anzeige](/device/screen)