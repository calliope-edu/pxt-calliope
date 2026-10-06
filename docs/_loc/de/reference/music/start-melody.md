# start Melody

Start playing a musical melody through pin `P0` of the @boardname@.

```sig
music.startMelody(music.builtInMelody(Melodies.Entertainer), MelodyOptions.Once)
```

## ~ hint

**Simulator**: Diese Funktion funktioniert nur auf dem @boardname@ und in einigen Browsern.

## ~

Es gibt eingebaute Melodien, die du aus dem Block `||start melody||` auswählen kannst. Diese sind bereits für dich komponiert und einfach zu verwenden, indem du einfach die gewünschte auswählst. Wenn du deine eigene Melodie spielen möchtest, kannst du [eine komponieren](/reference/music/making-melodies) und sie anstelle einer der eingebauten verwenden.

Melodien sind eine Sequenz von Noten, die jeweils für eine kurze Zeit nacheinander gespielt werden. Die Noten einer Melodie werden in einem [Array](/types/array) von [Strings](/types/string) gehalten. Jeder String im Array ist eine Note der Melodie. Du erstellst eine Melodie, indem du die Noten zusammen mit der _Dauer_ zusammenstellst, für die die Note gespielt wird. Die Melodie wird [so gebildet](/reference/music/making-melodies):

`NOTE[Oktave][:Dauer] z.B.: ['g5:1']`

```block
music.startMelody(['g4:1', 'c5', 'e', 'g:2', 'e:1', 'g:3'], MelodyOptions.Once)
```

Melodien werden entweder im _Vordergrund_ oder im _Hintergrund_ gespielt. Dies ermöglicht, dass mehr als eine Melodie gleichzeitig aktiv sein kann. Wenn eine Melodie so eingestellt ist, dass sie im Hintergrund gespielt wird, kann sie unterbrochen oder vorübergehend angehalten werden, während eine Melodie im Vordergrund gespielt wird. Wenn die Melodie im Vordergrund nicht so eingestellt ist, dass sie `für immer` spielt, dann setzt die Hintergrundmelodie fort, wenn die Vordergrundmelodie beendet ist.

Du kannst Optionen festlegen, wie du möchtest, dass die Melodie gespielt wird. Du kannst verlangen, dass die Melodie nur einmal spielt, `einmal`, oder dass sie sich wiederholt, `für immer`. Mit diesen Optionen wird die Melodie im Vordergrund entweder einmal gespielt oder sie wiederholt sich weiter. Natürlich, wenn du `für immer` einstellst, wird jede Melodie, die im Hintergrund gestartet wurde, nie gespielt, es sei denn, du [stopst](/reference/music/stop-melody) die Vordergrundmelodie. Um eine Hintergrundmelodie zu machen, stelle die Option auf `einmal im Hintergrund` oder `für immer im Hintergrund`.

## Parameter

* **melody**: Eine eingebaute Melodie oder eine [Array](/types/array)-Darstellung einer [Melodie](/reference/music/making-melodies), die du spielen möchtest.
* **options**: die Wiedergabeoption für die Melodie: >* `einmal`: spiele die Melodie im Vordergrund einmal >* `für immer`: spiele die Melodie im Vordergrund und wiederhole sie kontinuierlich >* `einmal im Hintergrund`: spiele die Melodie im Hintergrund einmal >* `für immer im Hintergrund`: spiele die Melodie im Hintergrund und wiederhole sie kontinuierlich

## Beispiele

### "Der Entertainer" spielen

Dieses Beispiel spielt die eingebaute Melodie `Der Entertainer`.

```blocks
music.startMelody(music.builtInMelody(Melodies.Entertainer), MelodyOptions.Once)
```

### Eine komponierte Melodie für immer spielen

Spiele eine erfundene Melodie im Hintergrund für immer.

```blocks
music.startMelody(['g4:1', 'c5', 'e', 'g:2', 'e:1', 'g:3'], MelodyOptions.ForeverInBackground)
```

## Siehe auch

[stop melody](/reference/music/stop-melody), [play tone](/reference/music/play-tone), [rest](/reference/music/rest), [ring tone](/reference/music/ring-tone), [tempo](/reference/music/tempo), [set tempo](/reference/music/set-tempo), [change tempo by](/reference/music/change-tempo-by)

[Melodien komponieren](/reference/music/making-melodies)