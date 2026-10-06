# Blinkendes Herz

## Anleitung @unplugged

Lerne, wie Du die LEDs nutzt und ein blinkendes Herz erstellst! (Willst Du lernen, wie Lichter funktionieren? [Sieh dir dieses Video an](https://youtu.be/qqBmvHD5bCw)).


![Herzform mit den LEDs](https://cdn.makecode.com/blob/4660572a6694f9b6b776367a67d28950f283c929/static/calliope/tutorials/01_flashing_heart_animation.gif)

## Schritt 1 @fullscreen

Füge den Block `||basic:zeige LEDs||` in den `||basic:dauerhaft||`-Block ein und zeichne ein Herz.

![Eine Animation, die zeigt, wie man einen Block ziehen und ein Herz malen kann](https://cdn.makecode.com/blob/a2f9cbba085d8b7155db3f033dbf5b823b117f3a/static/calliope/tutorials/add_show_led.gif)

## Schritt 2 @fullscreen

Platziere einen weiteren `||basic:zeige LEDs||` Block. Du kannst es leer lassen und zeichnen, was Du willst.

```blocks
basic.forever(function() {
    basic.showLeds(`
        . # . # .
        # # # # #
        # # # # #
        . # # # .
        . . # . .`);
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        . . . . .`);
})
```

## Schritt 3 @fullscreen

Schau dir den virtuellen @boardname@ an, du solltest das Herz und deine Zeichnung auf dem Bildschirm blinken sehen.

![Herzform mit den LEDs](https://cdn.makecode.com/blob/4660572a6694f9b6b776367a67d28950f283c929/static/calliope/tutorials/01_flashing_heart_animation.gif)

## Schritt 4 @fullscreen

Wenn du einen @boardname@ angeschlossen hast, klicke auf `|Herunterladen|` um deinen Code zu übertragen und das Herz blinken zu sehen!

```template
basic.forever(function() {})
```