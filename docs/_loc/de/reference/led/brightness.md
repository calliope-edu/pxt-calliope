# Helligkeit

Ermittelt wie hell die [LED-Matrix](/device/screen) ist, *wenn diese eingeschaltet ist*.

```sig
led.brightness();
```

## Rückgabewert

* eine [Zahl](/types/number) die bedeutet, wie hell der Bildschirm ist, wenn er eingeschaltet wird, von `0` (am dunkelsten) bis `255` (am hellsten). Zum Beispiel bedeutet die Zahl `127`, dass die LED-Anzeige beim Einschalten nur halb so hell ist.

## Beispiel: höchste Helligkeit

Zum Beispiel bedeutet die Zahl <0>127</0>, dass die LED-Anzeige beim Einschalten nur halb so hell ist.

```blocks
if (led.brightness() < 255) {
    led.setBrightness(255)
}
```

## Beispiel: Helligkeit ändern

Mit diesem Programm wird die LED-Anzeige-Helligkeit auf 100% (255) eingestellt. Dann wird die mittlere LED (`2, 2`) aktiviert, eine Sekunde gewartet und schließlich die LED-Anzeige-Helligkeit auf 50% (128) abgedunkelt:

```blocks
led.setBrightness(255)
led.plot(2, 2)
basic.pause(1000)
led.setBrightness(led.brightness() / 2)
```

## Siehe auch

[setze Helligkeit](/reference/led/set-brightness), [einblenden](/reference/led/fade-in), [ausblenden](/reference/led/fade-out)