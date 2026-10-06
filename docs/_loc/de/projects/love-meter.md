# Liebe-Tester

## Anleitung @unplugged

Mache einen Liebemesser, wie süß! Der @boardname@ fühlt die Liebe, manchmal mehr - manchmal weniger!

![Liebes-Messer Banner Nachricht](https://cdn.makecode.com/blob/f66fb26c6f73e95493dee6583de311da1e660901/static/calliope/tutorials/05_love_meter_animation.gif)

## Schritt 1

Lass uns einen **Liebe-Tester** bauen. Platziere einen `||input:wenn Pin gedrückt||` Block um Code auszuführen, wenn Pin **0** gedrückt wird. Verwende `P0` aus der Liste der Pineingänge.

```blocks
input.onPinTouchEvent(TouchPin.P0, input.buttonEventValue(ButtonEvent.Down), () => {
});
```

## Schritt 2

Verwende die Blöcke `||basic:zeige Zahl||` und `||Math:zufällige Zahl||` um eine Zufallszahl von `0` bis `100` anzuzeigen, wenn Pin **0** gedrückt wird.

```blocks
input.onPinTouchEvent(TouchPin.P0, input.buttonEventValue(ButtonEvent.Down), () => {
    basic.showNumber(randint(0, 100));
});
```
## Schritt 3

Klicke im Simulator auf Pin **0** und schau dir an, welche Zahl ausgewählt wird.

## Schritt 4

Zeige `"Liebe-Tester"` auf dem Bildschirm an, wenn der @boardname@ startet.

```blocks
basic.showString("LOVE METER");
input.onPinTouchEvent(TouchPin.P0, input.buttonEventValue(ButtonEvent.Down), () => {
    basic.showNumber(randint(0, 100));
});
```

## Schritt 5

Klicke auf `|Download|`, um dein Programm auf deinen @boardname@ zu übertragen. Halte den **GND** Pin mit einer Hand gedrückt und drücke den Pin **0** mit der anderen Hand, um das Programm zu starten.