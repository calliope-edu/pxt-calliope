# halte Melodie an

Hör auf, eine Melodie zu spielen.

```sig
music.stopMelody(MelodyStopOptions.All)
```

Melodien werden entweder im _Vordergrund_ oder _Hintergrund_ gespielt. Dies erlaubt mehr als eine Melodie gleichzeitig aktiv zu nutzen. Wenn eine Melodie im Hintergrund gespielt werden soll, kann sie vorübergehend unterbrochen werden, während eine Melodie für den Vordergrund gespielt wird. Wenn die Vordergrundmelodie nicht auf `dauerhaft` eingestellt ist, dann wird die Hintergrundmelodie fortgesetzt, wenn die Vordergrundmelodie beendet ist.

Wenn eine Melodie beginnt, gibt es eine Option, wie die Melodie zu spielen ist. Die Melodie spielt nur `einmal` oder sie wiederholt sich `dauerhaft`. Mit diesen Optionen wird die Melodie im Vordergrund entweder einmal oder wiederholt gespielt. Wenn du `dauerhaft` gesetzt hast, wird jede Melodie, die im Hintergrund gestartet wurde, niemals abspielen, es sei denn, du stoppst die Vordergrundmelodie.

Du kannst entweder die `Vordergrund` Melodie, die `Hintergrund` Melodie, oder `alle` Melodien stoppen.

## ~ hint

**Simulator**: Diese Funktion funktioniert nur auf der @boardname@ und in einigen Browsern.

## ~

## Parameter

* **Optionen**: Gib an, welche Melodien (Vordergrund, Hintergrund oder beides) beendet werden sollen: >* `alle`: alle Melodien stoppen >* `Vordergrund`: die Vordergrundmelodie stoppen >* `Hintergrund`: die Hintergrundmelodie stoppen

## Beispiel

Spiele die `Entertainer` Melodie ab und stoppe sie nach 5 Sekunden.

```blocks
music.beginMelody(music.builtInMelody(Melodies.Entertainer), MelodyOptions.Forever)
basic.pause(5000)
music.stopMelody(MelodyStopOptions.All)
```

## Siehe auch

[start melody](/reference/music/begin-melody)