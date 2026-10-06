# 50 2-Personen-Zähler

```ghost
input.onButtonEvent(Button.A, input.buttonEventClick(), function () {
    basic.showNumber(Personenzähler)
})
input.onButtonEvent(Button.AB, input.buttonEventClick(), function () {
    Personenzähler = 0
})
let Personenzähler = 0
Personenzähler = 0
let komplett = 20
basic.forever(function () {
    if (grove.measureInCentimeters(DigitalPin.C16) < 10) {
        Personenzähler += 1
    }
    if (Personenzähler < komplett) {
        basic.setLedColor(0xff0000)
    } else {
        basic.setLedColor(0x00ff00)
    }
})
```

```package
grove=github:calliope-edu/pxt-grove

```

## Aufgabe @showdialog

Ist die Klasse vollständig?
Prüfe mit dem Ultraschallsensor, ob alle Kinder wieder im Klassenzimmer sind. Programmiere einen Personen-Zähler, um die Anzahl der Personen, die in den Klassenraum kommen, zu zählen.

## Variable definieren

Erstelle zu Beginn zwei Variablen. Eine Variable `||variables.Personenzähler||` für die Anzahl der gezählten Personen und eine Variable `||variables.komplett||`.

```
```

![image/variable](image/variable)

## Variable definieren

Setze die Variable `||variables.Personenzähler||` zu Beginn auf 0 und die Variable `||variables.komplett||` auf die Anzahl der Klassenkameraden, z.B. 20.

## Schritt 3

Miss dauerhaft die Entfernung. Sobald eine Person an dem Ultraschallsensor vorbeigeht und die Entfernung unter den Wert 10 fällt, erhöhe den Personenzähler um 1. Platziere eine `||logic.wenn/dann||` Abfrage in die `||basic.dauerhaft||` Schleife.

## Wert vergleichen

Verwende einen `||logic.logischen Vergleich||` Block, in dem der Wert des `||grove.Ultraschall Sensor (in cm)||` mit dem Grenzwert verglichen wird, z.B. `10` cm.
**Hinweis:** In diesem Tutorial ist der Ultraschallsensor bereits hinzugefügt und du kannst ihn unter den `||grove.Grove|||` Blöcken finden.

## Variable erhöhen

Erhöhe die Variable `||variables.Personenzähler||` um 1, wenn der Wert des Ultraschallsensors unter 10 liegt.

## Werte auswerten

Ist der Personenzähler kleiner als die maximale Anzahl von Schülern in der Klasse, leuchtet die LED rot, ansonsten grün. Füge diesmal einen weiteren `||logic.wenn/dann/ansonsten||` Zweig in die `||basic.dauerhaft||` Schleife ein. Prüfen ob die Variable `||variables.personcounter||` kleiner ist als die Variable `||variables.komplett||`.

## Ausgabe definieren

Wenn der Personenzähler kleiner ist als die Variable komplett, dann `||basic.setze LED||` auf **rot**. Ansonsten auf **grün**.

## Erweiterung: Zurücksetzen

Füge die Option hinzu, um den Personen-Zähler über `||input.A+B geklickt||` zurückzusetzen, damit der `||variables.Personenzähler||` neu gestartet und von `0` neu beginnen kann.

## Variable anzeigen

Schließlich, wenn `||input.Knopf A||` gedrückt wird, zeigt die LED-Matrix an, wie viele Personen bereits gezählt wurden.
Tipp: Verwende die Variable `||variables.Personenzähler||`

## Das war's! ✨

Klicke auf `|Download|` um dein Programm auf deinen Calliope Mini zu übertragen.