# Kopf oder Zahl

## Anleitung @unplugged

Lass uns ein Münzwurf-Programm erstellen, um einen echten Münzwurf zu simulieren. Wir verwenden Symbolbilder, um `Kopf` oder `Zahl` anzeigen zu lassen.

![Münzwurf simulieren](https://cdn.makecode.com/blob/c3328d2b3c722766adea6e0e3d6c50367896ba07/static/calliope/tutorials/08_coin_flipper_animation.gif)

## Schritt 1

Beginnen wir mit dem `||Input:wenn Knopf A geklickt||` Block im Arbeitsbereich. Wir werden hier unseren Code für den Münzwurf einfügen.

```blocks
input.onButtonEvent(Button.A, input.buttonEventValue(ButtonEvent.Click), () => {
})
```

## Schritt 2

Nimm einen `||logic:wenn dann|` Block und setze ihn in den `||input:wenn Knopf A gedrückt||` Block. Lege einen `||Math:wähle eine zufällige Zahl||`-Block als Bedingung in den `||logic:wenn||` Block.

Die `||Math:wähle zufälligen Wahr- oder Falsch-Wert||` gibt einen zufälligen `Wahr` oder `Falsch` Wert zurück, den wir verwenden, um `Kopf` oder `Zahl` als Ergebnis für eine Münze zu verwenden.

```blocks
input.onButtonEvent(Button.A, input.buttonEventValue(ButtonEvent.Click), () => {
    if (Math.randomBoolean()) {
    } else {
    }
})
```

## Schritt 3

Lege nun ein `||basic:zeige Symbol||` Block in die `||logic:wenn||` und `|logic:dann||`. Wähle Bilder für `Kopf-` und `Zahl` aus.

```blocks
input.onButtonEvent(Button.A, input.buttonEventValue(ButtonEvent.Click), () => {
    if (Math.randomBoolean()) {
        basic.showIcon(IconNames.Skull)
    } else {
        basic.showIcon(IconNames.Square)
    }
})
```

## Schritt 4

Drücke den Knopf **A** im Simulator, um den Münzwurf-Code auszuprobieren.

## Schritt 5

Du kannst den Münzwurf animieren, um etwas Spannung hinzuzufügen. Platziere verschiedene `||Basic:zeige Symbole||` Blöcke vor `||logic:wenn||`, um zu zeigen, dass sich die Münze dreht.

```blocks
input.onButtonEvent(Button.A, input.buttonEventValue(ButtonEvent.Click), () => {
    basic.showIcon(IconNames.Diamond)
    basic.showIcon(IconNames.SmallDiamond)
    basic.showIcon(IconNames.Diamond)
    basic.showIcon(IconNames.SmallDiamond)
    if (Math.randomBoolean()) {
        basic.showIcon(IconNames.Skull)
    } else {
        basic.showIcon(IconNames.Square)
    }
})
```

## Schritt 6

Wenn du einen @boardname@ hast, verbinde ihn per USB und klicke auf `|Herunterladen|`, um den Code zu übertragen.

## Schritt 7

Drücke den Knopf **A**, um die Münze zu drehen. Teste dein Glück und errate das Ergebnis: `Kopf` oder `Zahl`, bevor die Münze liegen bleibt!

```template
input.onButtonEvent(Button.A, input.buttonEventClick(), function() {})
```