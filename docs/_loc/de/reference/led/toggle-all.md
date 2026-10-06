# Toggle All

Schaltet alle 25 LEDs auf dem [LED-Bildschirm](/device/screen) um - wenn eine LED eingeschaltet ist, bevor die Funktion aufgerufen wird, wird sie nach ihr ausgeschaltet; Wenn eine LED ausgeschaltet ist, bevor die Funktion aufgerufen wird, wird sie hinterher eingeschaltet.

```sig
led.toggleAll()
```

## Parameter

* nichts

## Beispiel

Der folgende Code wird dazu führen, dass jede LED eingeschaltet ist außer der LED an der Koordinate (2,2)

```blocks
basic.clearScreen()
led.plot(2, 2)
led.toggleAll()
```

```sim
basic.clearScreen()
led.plot(2, 2)
led.toggleAll()
```

## Siehe auch

[toggle](/reference/led/toggle), [LED screen](/device/screen), [clear screen](/reference/basic/clear-screen)