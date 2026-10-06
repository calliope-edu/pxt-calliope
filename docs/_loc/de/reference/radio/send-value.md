# Werte versenden

Sende einen [String]() und eine [Zahl]() zusammen über`Funk` an andere@boardname@s. Die maximale Länge von [String]() beträgt 8 Zeichen.

```sig
radio.sendValue("name", 0);
```

## Parameter

* **Name**: ein [String](/types/string), der als Name durch einen zu sendenden Wert repräsentiert worden ist.
* **Wert**: eine [Zahl](/types/number), die der zu sendende Wert ist.

## ~ hint

Watch this video to see how the radio hardware works on the @boardname@:

https://www.youtube.com/watch?v=Re3H2ISfQE8

## ~

## Beispiel: Beschleunigung senden

Dieses Programm sendet die **Beschleunigung** deines @boardname@ (Betrag, der Beschleunigung oder Verlangsamung) in `x-Richtung` (links und rechts) an andere @boardname@s. Diese Art von Programm könnte für ein Modellauto oder eine Modellrakete nützlich sein.

```blocks
radio.setGroup(99)
input.onButtonEvent(Button.A, input.buttonEventClick(), () => {
    radio.sendValue("acc", input.acceleration(Dimension.X))
})
```

Dieses Programm empfängt die vom letzten Programm gesendete Zeichenkette und den Zahlenwert. Dann zeigt es beide auf dem LED-Bildschirm an.

```blocks
radio.setGroup(99)
radio.onReceivedValue(function (name, value) {
    basic.showString(name);
    basic.showNumber(value);
});
```

## Siehe auch

[wenn Wert empfangen](/reference/radio/on-received-value)

```package
Funk
```