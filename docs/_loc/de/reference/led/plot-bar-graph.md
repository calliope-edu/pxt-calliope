# Balkendiagramm zeichnen

Zeige ein Balkendiagramm für einen numerischen Wert an.

```sig
led.plotBarGraph(2, 20);
```

Ein Balkendiagramm ist eine Art Diagramm, das Zahlen als Linien unterschiedlicher Länge darstellt. Der Wert wird auf den LEDs als Verhältnis des **Wertes** zum **Höchstwert** dargestellt, den du als maximalen Bereich festlegst. Wenn es also 25 LEDs auf dem Bildschirm gibt, würde das Zeichnen von `9` für den Höchstwert von `50` etwa 5 LEDs auf dem Bildschirm anzeigen.

## Parameter

* **value**: eine [Zahl](/types/number), die den Wert dessen darstellt, was du misst oder zu zeigen versuchst. Wenn du zum Beispiel die Temperatur von Eis mit dem @boardname@ misst, könnte `value` `0` sein, wenn die Temperatur 0 Grad Celsius beträgt.
* **high**: eine [Zahl](/types/number), die die höchstmögliche Zahl (Maximum) ist, die der Parameter **value** sein kann. Die Linien im Balkendiagramm erreichen ihren höchsten Punkt, wenn **value** diese Zahl erreicht. Wenn **high** `0` ist, wird der zuletzt gezeichnete größte Wert als Maximum verwendet.
* **valueToConsole**: ein [boolescher](/types/boolean) Wert, der, wenn `true`, den **Wert** auch an den seriellen Port sendet. Ein Wert von `false` verhindert, dass die Zahl in **value** zur seriellen Ausgabe geht.

### ~hint

#### Serielle Ausgabe

Der Block `||led:Balkendiagramm zeichnen||` schreibt auch die Zahl von **value** an den [seriellen](/reference/serial) Port, wenn du den Parameter **valueToConsole** auf `true` setzt. Dies ist eine Möglichkeit, dir zu helfen, die Werte, die du gezeichnet hast, aufzuzeichnen.

### ~

## Beispiel: Beschleunigung darstellen

Zeige ein Balkendiagramm der [Beschleunigung](/reference/input/acceleration) in der `x`-Richtung des @boardname@ an. Die `x` Richtung des @boardname@s ist von links nach rechts (oder von rechts nach links). Je schneller du den @boardname@ in dieser Richtung bewegst, desto höher werden die Linien im Balkendiagramm sein. Der Parameter **high** ist `1023`, was den höchstmöglichen Wert der Beschleunigung zum Anzeigen festlegt. Außerdem wird der Beschleunigungswert aufgezeichnet, indem er an den seriellen Port gesendet wird.

```blocks
basic.forever(() => {
    let a = input.acceleration(Dimension.X);
    led.plotBarGraph(a, 1023, true)
})
```

## Siehe auch

[brightness](/reference/led/brightness), [fade in](/reference/led/fade-in), [fade out](/reference/led/fade-out), [LED screen](/device/screen), [stop animation](/reference/led/stop-animation)