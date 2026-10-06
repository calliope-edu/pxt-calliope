# ERSTE SCHRITTE: MATHEMATIK

## Anleitung @unplugged

Mit dem Calliope mini hast du die Möglichkeit unterschiedliche mathematische Rechenoperationen durchzuführen. Du kannst Werte berechnen, zufällige Zahlen ausgeben lassen und die Ergebnisse in Variablen speichern.

## Schritt 1 @fullscreen

### Rechnen
Der Calliope mini beherrscht die vier Grundrechenarten Addition, Subtraktion, Multiplikation und Division ohne, dass du etwas machen musst:

Du kannst die dafür nötigen Blöcke im Bereich "Mathematik" finden. Die ersten vier Blöcke können für die vier Grundrechenarten und das Rechnen mit Exponenten genutzt werden. Um das Ergebnis deiner Rechnung anzuzeigen, kannst du das Ergebnis in dem Block "zeige Zahl" aus dem Grundlagen Menü nehmen und dort die Berechnung integrieren. Der Calliope mini zeigt anschließend das Ergebnis der Berechnung auf der LED-Matrix.

## Schritt 2 @fullscreen

### Zufällige Zahlen
Du kannst den Calliope mini dafür nutzen, um zufällige Zahlen, wie bei einem Würfel, anzeigen zu lassen. Du findest den notwendigen Block im Menü Mathematik ("wähle eine zufällige Zahl von 0 bis 10"). Wenn du die beiden Werte innerhalb des Blocks änderst, entscheidest du, aus welchem Wertebereich die zufällige Zahl genommen wird. Wenn du ganze Zahlen wählst werden ganze Zufallszahlen generiert, bei Dezimalzahlen jedoch Dezimalzahlen.

```blocks
basic.showLeds(`
    . # . # .
    # # # # #
    # # # # #
    . # # # .
    . . # . .`);
```