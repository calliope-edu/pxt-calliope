# Anhalten

Unterbricht das Programm für die Anzahl von Millisekunden, die du angegeben hast. Mit dieser Funktion kannst du das Programm verlangsamen.

```sig
basic.pause(400)
```

## Parameter

* `ms` ist die Anzahl der Millisekunden, die du pausieren möchtest (100 Millisekunden = 1/10 Sekunde und 1000 Millisekunden = 1 Sekunde).

## Beispiel: Diagonale Linie

In diesem Beispiel wird eine diagonale Linie gezeichnet, indem die LEDs von `0, 0` (oben links) bis `4, 4` (unten rechts) eingeschaltet werden. Das Programm hält 500 Millisekunden nach dem Einschalten jeder LED. Ohne `pause` würde das Programm so schnell ablaufen, dass man das Einschalten jeder einzelnen LED nicht erkennen könnte.

```blocks
for (let i = 0; i < 5; i++) {
    led.plot(i, i)
    basic.pause(500)
}
```

## Fortgeschritten

Wenn `ms` `NaN` (keine Zahl) ist, sind es standardmäßig `20` ms.

## Siehe auch

[während](/blocks/loops/while), [Laufzeit](/reference/input/running-time), [für](/blocks/loops/for)