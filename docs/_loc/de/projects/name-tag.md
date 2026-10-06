# Namensschild

## Anleitung @unplugged

Teile jedem mit, wie du heisst. Zeige deinen Namen auf den LEDs.

![Name scrollt auf den LEDs](https://cdn.makecode.com/blob/a5eb2f776c67e070a6bd1634a4b60769dae92aac/static/calliope/tutorials/02_nametag_animation.gif)

## Schritt 1

Füge den Block `||basic:zeige Text||` in den Block `||basic:dauerhaft ||` ein, um ihn zu wiederholen. Ändere den Text in deinen Namen.

```blocks
basic.forever(() => {
    basic.showString("Emma");
});
```

## Schritt 2

Schau auf den Simulator und kontrolliere, dass er deinen Namen auf dem Bildschirm zeigt.

![Name scrollt auf den LEDs](https://cdn.makecode.com/blob/a5eb2f776c67e070a6bd1634a4b60769dae92aac/static/calliope/tutorials/02_nametag_animation.gif)


Verwende weitere `||basic:zeige Text||`-Blöcke, um deine eigene Geschichte zu erstellen.

```blocks
basic.forever(() => {
    basic.showString("Emma");
    basic.showString("<3<3<3");
})
```

## Schritt 4

Wenn Du einen @boardname@ angeschlossen hast, klicke auf `|Herunterladen|` um Deinen Code zu übertragen und Deinen Namen scrollen zu sehen!

```template
basic.forever(function() {})
```