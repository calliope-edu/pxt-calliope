# ERSTE SCHRITTE: FUNK

## Anleitung @unplugged

Im Calliope mini ist ein Funkmodul integriert. Dies erlaubt es mehreren Calliope mini miteinander zu kommunizieren und Informationen zu übertragen. Um dies selbst auszuprobieren, brauchst du mindestens zwei Calliope mini.


## Schritt 1 @fullscreen

### Zuweisen eines Kanals
Zuerst muss man sich für einen Kanal entscheiden. Nur die Calliope mini die den gleichen Kanal benutzen, können Nachrichten miteinander austauschen. Ein Calliope mini kann nicht gleichzeitig über mehrere Kanäle übertragen oder empfangen. Um Informationen senden zu können, musst du den Funkblock öffnen und den Block ´setze Funkgruppe´ verwenden. Bitte stelle sicher, dass die von dir gewählte Kanalnummer zwischen 0 und 255 liegt.

## Schritt 2 @fullscreen

### Senden einer Nachricht
Um eine Nachricht zu senden, solltest du den "radio: sende Text über Funk"-Baustein auswählen. Jetzt kannst du den Text eingeben, der auf dem Kanal gesendet wird.

## Schritt 3 @fullscreen

### Empfangen einer Nachricht
Stellen den gleichen Kanal ein wie auf dem sendenden Calliope mini. Benutze den "wenn Text empfangen"-Baustein um nach Daten zu suchen. Fügen ein "zeige Text receivedString" im Inneren ein. Lass es uns mit zwei (oder mehr) Calliope mini versuchen!

```blocks
basic.showLeds(`
    . # . # .
    # # # # #
    # # # # #
    . # # # .
    . . # . .`);
```