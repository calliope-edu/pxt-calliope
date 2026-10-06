# Smiley-Knöpfe

## Anleitung @unplugged

Programmiere die Knöpfe auf dem @boardname@ um zu zeigen, dass er glücklich oder traurig ist. (Willst du lernen, wie die Knöpfe funktionieren? [Sieh dir dieses Video an](https://youtu.be/t_Qujjd_38o)).

![Drücken der Tasten A und B](https://cdn.makecode.com/blob/cfe0a73998a482c76a290509081ed629c18b444f/static/calliope/tutorials/03_smiley_button_animation.gif)

## Schritt 1 @fullscreen

Positioniere einen `||input:wenn Knopf geklickt||`-Block zum Ausführen des Codes, wenn Knopf **A** gedrückt wird.

```blocks
input.onButtonEvent(Button.A, input.buttonEventValue(ButtonEvent.Click), () => { 
});
```

## Schritt 2 @fullscreen

Platziere einen `||basic:zeige LEDs||`-Block innerhalb dem `||input:wenn Knopf A geklickt||`, um einen Smiley auf dem Bildschirm anzuzeigen. Drücke den Knopf **A** im Simulator, um den Smiley zu sehen.

```blocks
input.onButtonEvent(Button.A, input.buttonEventClick(), function () { 
    basic.showLeds(`
        # # . # #
        # # . # #
        . . . . .
        # . . . #
        . # # # .`
        )
})
```

## Schritt 3 @fullscreen

Füge `||input:wenn Knopf B geklickt||` und `||basic:zeige LEDs||`-Blöcke hinzu, um einen traurigen Smiley anzuzeigen, wenn Knopf **B** gedrückt wird.

```blocks
input.onButtonEvent(Button.B, input.buttonEventValue(ButtonEvent.Click), () => { 
    basic.showLeds(`
        # # . # #
        # # . # #
        . . . . .
        . # # # .
        # . . . #`
        );
});
```

## Schritt 4 @fullscreen

Fügen einen geheimen Modus hinzu, der ausgeführt wird, wenn **A** und **B** zusammen gedrückt werden. Füge für diesen Fall mehrere `||basic:zeige LEDs||` -Blöcke hinzu, um eine Animation zu erzeugen.

```blocks
input.onButtonEvent(Button.AB, input.buttonEventValue(ButtonEvent.Click), () => {
    basic.showLeds(`
        . . . . .
        # . # . .
        . . . . .
        # . . . #
        . # # # .
        `)
    basic.showLeds(`
        . . . . .
        . . # . #
        . . . . .
        # . . . #
        . # # # .
        `)    
})
```

## Schritt 5

Wenn du einen @boardname@ hast, verbinde ihn per USB und klicke auf `|Herunterladen|`, um den Code zu übertragen. Drücke den Knopf **A** auf deinem @boardname@. Probiere Knopf **B** und dann **A** und **B** zusammen.

## Schritt 6

Klasse! Sehr schön! Jetzt geh und zeige es deinen Freunden!

```template
//
```