# 54_Luftqualität

```ghost
let temperatur = 0
function Temperatur_messen () {
    temperatur = SCD40.get_temperature(SCD40.SCD40_T_UNIT.C)
    if (temperatur > 30) {
        music.playTone(262, music.beat(BeatFraction.Whole))
    } else if (temperatur < 18) {
        music.playTone(262, music.beat(BeatFraction.Whole))
    } else {
        music.rest(music.beat(BeatFraction.Whole))
    }
}
basic.forever(function () {
    Temperatur_messen()
    basic.pause(60000)
})
```

## Aufgabe @showdialog

Die Luft, die dich umgibt, spielt eine wichtige Rolle für dein Wohlbefinden.
Programmiere eine Anzeige, die dich informiert, wenn es zu heiß wird, die Luftfeuchtigkeit hoch oder zu niedrig und wann wieder gelüftet werden muss.

## Temperatur messen @showdialog

Beginne mit der Temperaturmessung und verwende den Lautsprecher für die Temperaturwarnung.
Gib einen Warnton aus, wenn die Temperatur zu kalt oder zu warm ist.

## Temperatur messen

Eine `||logic.wenn/dann/ansonsten||` Verzweigung aus den `||logic.Logik||` Blöcken wird benötigt, damit ein Sound abgespielt werden kann, wenn die Temperatur beispielsweise über 30 °C ansteigt. Um die Temperatur dauerhaft messen und vergleichen zu können, fügst du die Blöcke in die `||basic.dauerhaft||` Schleife ein.

## Messwert vergleichen

Fügen einen `||logic.Logik Vergleich||` ein, mit dem du die gemessene `||SCD40.Temperatur||` des CO2-Sensors mit einem Grenzwert vergleichen kannst. Wenn die Temperatur z. B. > 30 ist, wird ein`||music.Warnton||` gespielt.

## Zweig hinzufügen

Klicke auf `||logic.+||` in der `||logic.Bedingung||` um eine andere Bedingung hinzuzufügen, so dass auch ein Warnton abgespielt wird, wenn er zu kalt ist und die `||SCD40.Temperatur||` beispielsweisel unter 18 Grad fällt.

## Ausgabe definieren

Füge einen `||logic.ansonsten||` Zweig zu `||music.Pause||` hinzu, sodass kein Warnton abgespielt wird, wenn die Temperatur weder zu warm noch zu kalt ist.

## CO2-Gehalt messen @showdialog

Super, du hast die Temperaturmessung durchgeführt! 👍 Ganz ähnlich funktioniert die CO2-Ampel. Statt der Temperatur wird nun der CO2-Gehalt gemessen und statt Töne abzuspielen, leuchten die RGB-LEDs.

## Messung der CO2-Konzentration

Der CO2-Gehalt in der Luft wird in ppm (Teile pro Million) angezeigt. Alles unter 1000 ppm ist unbedenklich.

## Messwert vergleichen

Erstelle einen zweiten `||logic.Logik Zweig||` und vergleiche die gemessene `||SCD40. CO2||` Konzentration mit den Grenzwerten. Wenn der Wert über 2000 liegt, lasse die `||basic.RGB-LED||` rot leuchten. Liegt er unter 1000, leuchtet sie grün. Ist der Wert dazwischen, soll sie gelb leuchten.

## Luftfeuchtigkeit messen @showdialog

Der nächste Schritt ist die Messung der Luftfeuchtigkeit. Verwende die LED-Matrix um die Feuchtigkeit anzuzeigen. Eine Luftfeuchtigkeit zwischen 30% und 70% fühlt sich angenehm
an. Fülle die Balken der LED-Matrix mit der prozentualen Luftfeuchtigkeit.

## Bedingungen hinzufügen @showdialog

Platziere eine dritte `||logic.wenn/dann||` Abfrage in die `||basic.dauerhaft||` Schleife.
Klicke auf `||logic.+||` um die fünf Bedingungen einzufügen und einen Mehrfachzweig zu erstellen.

\*In einem Mehrfachzweig werden die Bedingungen von oben nach unten überprüft. Sobald einer wahr ist, wird der Codeblock der entsprechenden Bedingung ausgeführt und die folgenden werden ignoriert. Die Reihenfolge der Bedingungen ist daher wichtig.

## Messwert vergleichen

Lese die `||SCD40.Luftfeuchtigkeit||` aus und vergleiche sie in den Bedingungen.

< 30 %, LED-Matrix muss leer sein
< 40 %, eine Balken mit
< 50 %, zwei Balken gefüllt usw.

> 70 %, die gesamte LED-Matrix einschalten

## Ausgabe definieren

Verwende den Block `||basic.zeige LEDs||` um die Balken in der LED-Matrix zu füllen.

## Zeitintervall festlegen

Großartig! Du hast es fast geschafft. Füge ein `||basic.pausiere||` zur dauerhaft Schleife hinzu, so dass die Sensorwerte in einem bestimmten Zeitintervall aktualisiert werden.
Klicke auf `|Download|` um dein Programm auf deinen Calliope mini zu übertragen.

## Erstelle Funktionen @showdialog

Um das Programm übersichtlicher zu machen, erstelle drei ''||function.Funktionen||'' für die Messung: Temperatur, CO2-Gehalt und Luftfeuchtigkeit.

![functions](https://calliope.cc/tutorials/funktion_erstellen.png)

## Variablen erstellen

Speichere den Sensorwert auch einmal in einer `||variables.Variablen||` damit er nicht mehrmals ausgelesen wird. Lege eine Variable für den jeweiligen Sensorwert an: Temperatur, Luftfeuchtigkeit und CO2-Gehalt und implementiere diese in den Funktionen.

## Funktionen aufrufen

Zu guter Letzt müssen die `||function.Funktionen||` in der `||basic.dauerhaft||`-Schleife aufgerufen werden, so dass die Sensormessung stattfindet.

## Geschafft! 👏

Klicke auf `|Download|` um dein Programm auf deinen Calliope mini zu übertragen.

```package
co2sensor=github:calliope-edu/co2-sensor-scd40
```