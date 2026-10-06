# millis

Ermittelt die Anzahl der Millisekunden, die seit dem Einschalten des Boards vergangen sind.

```sig
control.millis()
```

## Rückgabewert

* die [Anzahl](/types/number) der Millisekunden, die seit dem Einschalten des Boards vergangen sind.

## Beispiel #example

Finde heraus, wie viele Tage, Stunden, Minuten und Sekunden das @boardname@ bereits läuft.

```blocks
let msecs = control.millis()
let seconds = msecs / 1000
let mins = seconds / 60
let hours = mins / 60
let days = hours / 24
```

## Siehe auch #seealso