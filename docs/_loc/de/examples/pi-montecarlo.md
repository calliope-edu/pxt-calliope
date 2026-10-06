# Pi Monte Carlo

Sich dem Wert von **pi** mit deinem @boardname@ annähern!

## Überlegungen...

Ok, lasst uns so tun, als ob ein Kreis in ein Quadrat passt, an dem der Rand des Kreises die Seiten des Quadrats berührt. Wenn wir sagen, dass der Radius, genannt `r`, des Kreises `1` ist, dann ist die Länge jeder Seite des Quadrats `2`, oder `2 * r`. Die Fläche des Kreises ist `pi * (r ** 2)` und der Bereich des Quadrats ist dann `(r * 2) ** 2`. Da wir wissen nicht, wie groß `pi` ist, stellen wir eine Beziehung zwischen der Fläche des Kreises und der Fläche des Quadrats her um den Wert von `pi` zu berechnen.

### Kreis und Quadrat

Eine interessante Beziehung zwischen dem Kreis und dem Quadrat ist, dass die Fläche des Kreises durch die Fläche des Quadrats geteilt ist:

`Flächenverhältnis = (pi * (r * * 2))/(r * 2) * * 2) = pi/4`

Nun, wir können sehen, dass wir, wenn wir die Fläche des Kreises und des Platzes kennen würden, herausfinden könnten, was der Wert von `pi` ist! Das ist einfach:

```
pi = (Kreisfläche) / (Quadratfläche) * 4
```

also...

```
Flächenverhältnis = (Kreisfläche) / (Quadratfläche)
pi = (Flächenverhältnis) * 4
```

Ein Problem gibt es jedoch. Wir kennen die Fläche des Platzes, sie ist `4`, aber wie groß ist der Bereich des Kreises?

Das ist das Dilemma! Wir müssen die Fläche des Kreises kennen, um herauszufinden, wie groß`pi` ist, und wir brauchen den Wert von `pi` für die Suche nach dem Bereich des Kreises!

### Punkte, viele Punkte

Was wäre, wenn wir eine Menge wirklich kleiner Punkte hätten, die wir in den Kreis und in die Teile des Quadrats füllen könnten, die der Kreis nicht abdeckte. Wir werden versuchen, den Bereich beider Formen mit so vielen Punkten wie möglich abzudecken.

Wenn wir die Anzahl der Punkte zählen, die sowohl im Kreis als auch im Quadrat platziert sind, könnten wir das `Flächenverhältnis ` zwischen den beiden Formen finden. Und in der oben gezeigten Gleichung können wir `pi` entdecken, wenn wir dieses Verhältnis haben. Das `Flächenverhältnis` ist:

`Flächenverhältnis = (Punkte im Kreis) / ((Punkte im Kreis) + (Punkte nur im Quadrat))`

Natürlich können wir den Bereich der beiden Formen nicht vollständig mit Punkten füllen, aber wir könnten genug davon haben, um ein brauchbares Verhältnis zwischen Kreis und Quadrat zu bekommen.

### Erstellen und Zählen von Punkten

Um die "Punkte" zu machen, können wir zufällig einen Wert erstellen und sehen, ob dieser als Koordinate in der Form passt, die wir zu füllen versuchen. Wenn er passt, erhöhe die Anzahl der Punkte und versuche für einige Zeit mehr Punkte zu machen. Je mehr Punkte erstellt wurden, desto besser ist die Genauigkeit unseres Wertes für das `Flächenverhältnis`.

### Monte Carlo-Methode

Diese Methode zum Füllen von Koordinatenpunkten, Zählen und Verwenden der Differenz oder des Verhältnisses der Anzahlen wird als _Monte-Carlo-Methode_ oder Annäherung bezeichnet.

## Monte Carlo Annäherung von _pi_

```blocks
let pi = 0
let y = 0
let x = 0
let r2 = 0
let r = 0
let inside = 0
let n = 0

// A simple Monte-Carlo simulation to approximate Pi.
//
// number of points
n = 1000000
//
// radius of the circle
r = 4000
//
// radius square
r2 = r * r
//
basic.forever(() => {
    inside = 0
    for (let i = 0; i < n; i++) {
        // generate a point within the square
        x = randint(0, r + 1)
        y = randint(0, r + 1)
        // test if the point is within the circle
        // sqrt(x**2 + y**2) < r ==> x**2 + y**2 < r**2
        if (x * x + y * y < r2) {
            inside += 1
        }
    }
    // surface of a square: 4 * r * r surface of a circle:
    // r * r * pi => inside / n ~= (r*r*pi) / (4*r*r) ~=
    // pi / 4 pi = inside / n * 4
    //
    pi = (inside * 4) / n
    // show results
    basic.showLeds(`
        # # # # #
        . # . # .
        . # . # .
        . # . # .
        . # . . #
        `)
    basic.showString(" " + pi)
})
```