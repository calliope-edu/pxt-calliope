# Schere-Stein-Papier

## {Einführung @unplugged}

![Cartoon des Schere-Stein-Papier-Spiels](https://cdn.makecode.com/blob/4bac740b4763c09e83c06687e7159c237bbc7150/static/calliope/tutorials/07_stone_paper_scissors_animation.gif)

Benutze den Beschleunigungssensor und die LED-Anzeige um ein **Schere-Stein-Papier** Spiel zu bauen das du mit deinen Freunden spielen kannst!

## {Schritt 1}

Zuerst müssen wir eine Variable erstellen, um zu verfolgen, ob wir einen Stein, ein Papier oder eine Schere in der Hand haben. Eine Variable ist wie ein Behälter zum Speichern von unterschiedlichsten Werten anzusehen. Klicke auf den **Schütteln** Button, um das Ergebnis anzuzeigen. Klicke auf den Punkt **Variable erstellen**. Gib deiner neuen Variablen den Namen "Hand" und klicke auf Ok.


## {Schritt 2}

Klicke erneut auf die Kategorie `||variables:Variablen||` in der Code-Bibliothek. Du wirst bemerken, dass einige neue Blöcke erschienen sind. Ziehe den Block `||variables:setze Hand||` in den Block `||input:bei Schütteln||`. Das Schere-Stein-Papier-Spiel wird begonnen, wenn wir den Calliope mini schütteln. 👋

```blocks
input.onGesture(Gesture.Shake, function() {

})
```

## {Schritt 3}

Klicke auf die Kategorie `||math:Mathematik||` in der Code-Bibliothek. Ziehe einen Block `||math:wähle eine zufällige Zahl von ... bis ...||` und lege ihn in den Block `||variables:setze Hand auf ...||`, indem du die Zahl 0 ersetzt. Wenn wir jetzt den Calliope mini schütteln, wird die Variable Hand eine zufällige Zahl zwischen 1 und 3 enthalten.

```blocks
let hand = 0;
input.onGesture(Gesture.Shake, function() {
    hand = randint(1, 3)
})
```

## {Schritt 4}

In einem späteren Schritt wird jeder der möglichen Zahl (`0`, `1`, or `2`) ein eigenes Bild zugeordnet. Das Bild wird auf der LED-Matrix angezeigt, wenn die passende Zahl ausgewählt wird.

```blocks
let Hand = 0;
input.onGesture(Gesture.Shake, function() {
    Hand = randint(1, 3)
    if (true) {

    } else {

    }
})
```

## {Schritt 5}

Nimm aus der Kategorie `||logic:Logik||` einen Vergleichsblock `||logic:0 = 0||` und lege ihn in den Block `||logic:wenn wahr dann ... ansonsten||`, wobei du **wahr** mit dem Vergleichsblock ersetzt.

```blocks
let Hand = 0;
input.onGesture(Gesture.Shake, function() {
    Hand = randint(1, 3)
    if (0 == 0) {

    } else {

    }
})
```

## {Schritt 6}

Klicke auf den **Schütteln** Button, um das Ergebnis anzuzeigen. Wenn du es häufig genug probierst, sollte irgendwann ein Bild von dem Papier auf dem Bildschirm zu sehen sein.  Klicke auf die zweite 0 im Vergleichsblock und ändere sie auf **1**.

```blocks
let Hand = 0;
input.onGesture(Gesture.Shake, function() {
    Hand = randint(1, 3)
    if (Hand == 1) {

    } else {

    }
})
```

## {Schritt 7}

Klicke in der Code-Bibliothek auf die Kategorie `||basic:Grundlagen||`. Ziehe einen Block `||basic:zeige Symbol||` heraus und lege ihn unter `||logic:wenn Hand = 1 dann ...||`. Im Block `||basic:zeige Symbol||`, klicke auf das Herzsymbol und wähle stattdessen das Symbol für ein kleines Quadrat aus, um einen 💎 Stein darzustellen.

```blocks
let Hand = 0;
input.onGesture(Gesture.Shake, function() {
    Hand = randint(1, 3)
    if (Hand == 1) {
        basic.showIcon(IconNames.SmallSquare)
    } else {

    }
})
```

## {Schritt 8}

Unten im `||logic:wenn ... dann ... ansonten ...||` Block das plus **'+'** Zeichen klicken. Dies erweitert den Code um eine `||logic:ansonten ...||` Option.

```blocks
let Hand = 0;
input.onGesture(Gesture.Shake, function() {
    Hand = randint(1, 3)
    if (Hand == 1) {
        basic.showIcon(IconNames.SmallSquare)
    } else if (false) {

    } else {

    }
})
```

## {Schritt 9}

Aus der Kategorie `||logic:Logik||` ziehe einen Vergleichsblock `||logic:0 = 0||` und lege ihn in den freien Raum neben der `||logic: sonst wenn ... dann||`-Option.

```blocks
let Hand = 0;
input.onGesture(Gesture.Shake, function() {
    Hand = randint(1, 3)
    if (Hand == 1) {
        basic.showIcon(IconNames.SmallSquare)
    } else if (0 == 0) {

    } else {

    }
})
```

## {Schritt 10}

Klicke erneut auf die Schaltfläche `+` um einen `||logic: sonst wenn ... dann||` Abschnitt hinzuzufügen.  Füge nun einen bedingten Block für `||logic:Hand = 2||` in die Bedingung von `||logic:sonst wenn ... dann||`.

```blocks
let Hand = 0;
input.onGesture(Gesture.Shake, function() {
    Hand = randint(1, 3)
    if (Hand == 1) {
        basic.showIcon(IconNames.SmallSquare)
    } else if (Hand == 2) {

    } else {

    }
})
```

## {Schritt 11}

Aus der Kategorie `||basic:Grundlagen||` ziehe einen Block `||basic:zeige Symbol||` heraus und lege ihn unter `||logic:sonst wenn Hand = 2 dann||`. Im Block `||basic:zeige Symbol||`, klicke auf das Herzsymbol und wähle stattdessen das Symbol für ein großes Quadrat, um 📃 Papier darzustellen.

```blocks
let Hand = 0;
input.onGesture(Gesture.Shake, function() {
    Hand = randint(1, 3)
    if (Hand == 1) {
        basic.showIcon(IconNames.SmallSquare)
    } else if (Hand == 2) {
        basic.showIcon(IconNames.Square)
    } else {

    }
})
```

## {Schritt 12}

Füge einen `||basic:zeige LEDs||` Block innerhalb von `||logic:ansonsten||` hinzu. Erstelle mit den LEDs ein Bild von einem Stein.  Im Block `||basic:zeige Symbol||`, klicke auf das Herzsymbol und wähle das Scherensymbol.

```blocks
let Hand = 0;
input.onGesture(Gesture.Shake, function() {
    Hand = randint(1, 3)
    if (Hand == 1) {
        basic.showIcon(IconNames.SmallSquare)
    } else if (Hand == 2) {
        basic.showIcon(IconNames.Square)
    } else {
        basic.showIcon(IconNames.Scissors)
    }
})
```

## {Schritt 13}

Teste deinen Code! Drücke den weißen **SCHÜTTELN**-Knopf im Calliope mini Simulator oder bewege deinen Mauszeiger schnell hin und her über den Simulator. Siehst du die Symbole für Stein, Papier und Schere zufällig erscheinen?  ⭐ Großartig! ⭐


## {Schritt 14}

Wenn du einen @boardname@ hast, verbinde ihn mit deinem Computer und klicke auf den `|Download|`-Knopf. Folge den Anweisungen, um deinen Code auf den @boardname@ zu übertragen. Sobald dein Code heruntergeladen wurde, verbinde deinen Calliope mini mit einem Batteriepack und fordere einen anderen Calliope mini oder einen Menschen zu einem Spiel Schere-Stein-Papier heraus!


## {Schritt 15}

Mache weiter – versuche 🎵 Musik 🎵 Blöcke in deinem Schere, Stein, Papier Spiel für verschiedene Soundeffekte hinzuzufügen. Beachte, dass einige Musikblöcke einen Calliope mini 3 benötigen, um sie nutzen zu können.

```blocks

let hand = 0
input.onGesture(Gesture.Shake, function () {
    hand = randint(1, 3)
    if (hand == 1) {
        basic.showIcon(IconNames.SmallSquare)
        music.playTone(131, music.beat(BeatFraction.Whole))
    } else if (hand == 2) {
        basic.showIcon(IconNames.Square)
        music.playTone(392, music.beat(BeatFraction.Double))
    } else {
        basic.showIcon(IconNames.Scissors)
        music.playTone(784, music.beat(BeatFraction.Whole))
    }
})

```

```blockconfig.global
randint(1, 3)
```

```template
input.onGesture(Gesture.Shake, function() {})
```


```package
v3
```