# Ändere das Tempo um

Macht das [tempo](/reference/music/tempo) (Geschwindigkeit eines Musikstückes) um den angegebenen Betrag schneller oder langsamer.

```sig
music.changeTempoBy(20)
```

## ~ hint

**Simulator**: Diese Funktion funktioniert nur auf dem @boardname@ und in einigen Browsern.

## ~

## Parameter

* `bpm` ist eine [Zahl](/types/number), die angibt, um wie viel die bpm (Schläge pro Minute oder Anzahl der Schläge in einer Minute der Musik, die der @boardname@ spielt) geändert werden sollen.

## Beispiele

Dieses Programm macht die Musik um 12 bpm schneller.

```blocks
music.changeTempoBy(12)
```

Dieses Programm macht die Musik um 12 bpm *langsamer*.

```blocks
music.changeTempoBy(-12)
```

## Siehe auch

[play tone](/reference/music/play-tone), [ring tone](/reference/music/ring-tone)