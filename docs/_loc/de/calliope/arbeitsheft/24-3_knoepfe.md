# 24 3_4_Knöpfe

```ghost
input.onButtonEvent(Button.A, input.buttonEventClick(), function () {
 basic.showIcon(IconNames.Happy)
 basic.setLedColor(0x00ff00)
})
```

## Aufgaben @showdialog

Lasse einen **Smiley** erscheinen, wenn der **Knopf A** gedrückt wird und einen **traurigen Smiley**, wenn der **Knopf B** gedrückt wird. Füge beiden Symbolen noch eine passende Farbe hinzu.

## Taste A steuern

Wähle als Eingabe den Block `||input.Wenn Knopf A||` geklickt.

## Symbol und Farbe anzeigen

Verwende den Block `||basic.zeige Symbol||` Block und lasse einen Smiley auf der LED-Matrix erscheinen. Ergänze dein Programm um den `||basic.setze Farbe auf||` Block und lasse die RGB-LED `grün` leuchten.

## Taste B steuern

Platziere einen weiteren Block `|| input.Wenn Knopf A ||` geklickt und ändere diesen in `|| input.Wenn Knopf B ||` geklickt.

```
```

![Knopf B](https://calliope.cc/tutorials/kopf_a_b.png)

## Symbol und Farbe anzeigen

Füge den Block `||basic.zeige Symbol||` hinzu und wähle einen traurigen Smiley aus.
Um die Farbe der RGB-LED zu ändern, verwende den `||basic.setze Farbe auf||` Block. Stelle den Block so ein, dass die RGB-LED `rot` leuchtet.

## Geschafft! 😍

Klicke auf `|Herunterladen|`, um dein Programm auf deinen Calliope mini zu übertragen.

```template
//
```