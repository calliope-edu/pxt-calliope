# play Until Done

Spielen einen Klangausdruck bis zum Ende ab.

```sig
soundExpression.giggle.playUntilDone()
```

Ein Klangausdruck ist eine vorgefertigte Reihe von Tönen, die einen bestimmten Klang erzeugen. Es gibt mehrere Klänge zur Auswahl. Der Klang wird gestartet und dein Programm wartet, bis der Klang aufhört zu spielen.

### ~ reminder

![works with Calliope mini V3 only image](https://cdn.makecode.com/blob/9ed1220962526bdadb378e487c0f4879cd2aebd3/static/v2/v2-only.png)

Dieser Block benötigt den [Calliope mini V3](/device/v2). Wenn du diesen Block mit einem vorherigen Calliope Miniboard verwendest, siehst du den **927** Fehlercode auf der LED-Matrix.

### ~

## Parameter

In Blöcken wird der Sound aus der Liste im Block `||music:Klang bis zum Ende abspielen||` ausgewählt.

```block
soundExpression.giggle.playUntilDone()
```

Beim Programmieren in JavaScript oder Python ist der Klang ein `soundExpression`-Objekt, von dem aus du eine die Funktion `playUntilDone()` ausführen kannst. Um beispielsweise den Klang `soaring` abzuspielen, wähle `soaring` aus dem Namensraum `soundExpression` und führen `playUntilDone()` aus:

```typescript
soundExpression.soaring.playUntilDone()
```

## Beispiel

Spiele den Klang `Twinkle` auf dem Lautsprecher und warte, bis er zu Ende ist.

```blocks
soundExpression.twinkle.playUntilDone()
basic.showString("Twinkle hat gestoppt")
```

## Siehe auch

[abspielen](/reference/music/play)