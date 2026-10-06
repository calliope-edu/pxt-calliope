# ERSTE SCHRITTE: Sensoren

## Anleitung @unplugged

Das Calliope mini ist schon mit einer Reihe von Sensoren ausgerüstet: Es verfügt z.B. über einen Temperatursensor, einen Lichtsensor, einen Kompass und ein Mikrofon.

## Schritt 1 @fullscreen

### Sensordaten anzeigen
Um Daten der Sensoren auf der LED-Matrix des Calliope mini anzeigen zu können, muss zuerst ein Sensor (Wert) ausgewählt werden. Um dies zu tun, öffnest du den Grundlagen-Abschnitt und wählst den "zeige Zahl 0"-Block. Innerhalb des Blocks kannst du nun die "0" auf den Wert eines Sensors umstellen.

## Schritt 2 @fullscren

### Beschleunigungssensor
Du kannst die Beschleunigungswerte auswählen, indem der Block aus dem Eingabebereich genommen wird und dieser oben auf das "0" gezogen wird (die 0 wird dadurch ersetzt).

## Schritt 3 @fullscren

### Helligkeitssensor
Das Umgebungslicht wird über die LED-Matrix gemessen. Du kannst den Lichtsensor aktivieren, indem du den "Lichtstärke" Block aus dem Menü Eingabe auswählst und in den Block ||basic: zeige Zahl|| aus dem Grundlagen Menü integrierst.

## Schritt 4 @fullscreen

### Kompass
Das eingebaute Magnetometer erlaubt es dem Calliope mini zu sagen, in welche Richtung er zeigt. Dieser Sensor liefert einen Wert zwischen 0 und 360 Grad. Der Kompass sollte vor der Verwendung kalibriert werden. Befolge die Anweisungen auf dem Calliope mini und halte ihn kreisförmig, bis ein kompletter Kreis gezeichnet ist. Du kannst den Lichtsensor aktivieren, indem du den "Lichtstärke" Block aus dem Menüpunkt Eingabe auswählst und in den Block ||basic: zeige Zahl|| aus dem Grundlagen Menü integrierst.

## Schritt 4 @fullscreen

### Temperatursensor
Du kannst den Temperatursensor auswählen, indem du den Block aus dem Menü Eingabe wieder in den Nummernblock ziehst.

```blocks
basic.showLeds(`
    . # . # .
    # # # # #
    # # # # #
    . # # # .
    . . # . .`);
```