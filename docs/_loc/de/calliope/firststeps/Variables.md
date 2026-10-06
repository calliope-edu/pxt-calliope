# ERSTE SCHRITTE: DIE 5X5 LED-MATRIX

## Anleitung @unplugged

Wie bei einem Fußballspiel, bei dem sich die Anzahl der Tore, die während des Spiels erzielt wurden ändern, kann der Wert einer Variable sich auch während eines laufenden Programms ändern.

Durch Klicken auf den Abschnitt Variablen und dann auf den Button "Eine Variable erstellen…“ wird eine neue Variable erstellt. Der Name kann dann frei vergeben werden.

## Schritt 1 @fullscreen

Durch Klicken auf den Abschnitt Variablen und dann auf den Button "Eine Variable erstellen…“ wird eine neue Variable erstellt. Der Name kann dann frei vergeben werden.

## Schritt 2 @fullscren

Du kannst für jede Variable einen separaten Block finden, mit dem der Wert auf der LED-Matrix von Calliope mini angezeigt werden kann, indem der Block "zeige Zahl 0" genutzt und der Block "Variable auf 0 setzen" aus dem Abschnitt Variablen in der Zeile davor eingesetzt wird. wenn du diese Zahl änderst, wird sich die Zahl auf der Matrix entsprechend ändern.

## Schritt 3 @fullscren

### Zähle die Punkte
Durch die Kombination dessen, was du bisher gelernt hast, kannst du eine einfache Punktzähler programmieren: Wenn Knopf A gedrückt wird, soll die Anzahl der Zielvariablen um einen numerischen Wert erhöht und angezeigt werden. Probiere es aus!

```blocks
basic.showLeds(`
    . # . # .
    # # # # #
    # # # # #
    . # # # .
    . . # . .`);
```