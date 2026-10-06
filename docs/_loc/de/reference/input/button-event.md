# Tasten-Event

Gibt die ID eines der folgenden Tasten-Events zurück:
* gedrückt (1)
* losgelassen (2)
* geklickt (3)
* lange geklickt (4)
* halten (5)

Dieser Block kann verwendet werden, um den Ereignistyp im [beim Knopfereignis](input/on-button-event) und [beim Pin-Ereignis](input/on-pin-event) zu definieren.

Beachte, dass durch das Drücken einer Taste mehrere Ereignisse gleichzeitig ausgelöst werden können:

| # | Eingabe                     | ausgelöstes Ereignis |
| - | --------------------------- | -------------------- |
| 1 | Drücke A nach unten         | A.gedrückt           |
| 2 | Halten A für > 1,5 Sekunden | A.halten             |
| 3 | A loslassen                 | A.losgelassen        |
|   |                             | A.lange geklickt     |

| # | Eingabe             | ausgelöstes Ereignis |
| - | ------------------- | -------------------- |
| 1 | Drücke A nach unten | A.gedrückt           |
| 2 | Drücke B nach unten | B.gedrückt           |
| 3 |                     | A+B gedrückt         |
|   | A loslassen         | A.losgelassen        |
|   |                     | A+B.losgelassen      |
|   |                     | A+B.geklickt         |
|   | B loslassen         | B.losgelassen        |

* Auf jedes losgelassen-Event folgt immer entweder ein klick- ODER lange-geklickt-Event, je nachdem, wie lange das gedrückt-Event schon her ist.

## gedrückt

* Für den Knopf `A` oder `B`: Dieser Ereignishandler funktioniert, wenn der Knopf nach unten gedrückt und innerhalb einer Sekunde freigegeben wird.
* Für `A` und `B` gleichzeitig: Dieser Handler funktioniert, wenn `A` und `B` beide nach unten gedrückt werden, und einer von ihnen innerhalb von 1,5 Sekunden wieder losgelassen wird.

## losgelassen

* Für die Taste `A` oder `B`: Dieser Handler funktioniert, wenn die Taste losgelassen wird.
* Für `A` und `B` gleichzeitig: Dieser Handler funktioniert in dem Moment, in dem die erste Taste losgelassen wird, während `A` und `B` beide nach unten gedrückt sind.

## geklickt

* Für die Taste `A` oder `B`: Dieser Handler funktioniert, wenn der Knopf nach unten gedrückt und innerhalb einer Sekunde freigegeben wird.
* Für `A` und `B` gleichzeitig: Dieser Handler funktioniert, wenn `A` und `B` beide nach unten gedrückt werden, und einer von ihnen innerhalb von 1,5 Sekunden wieder losgelassen wird.

## lange geklickt

* Für die Taste `A` oder `B`: Dieser Handler funktioniert, wenn die Taste nach mehr als einer Sekunde gedrückt und losgelassen wird.
* Für `A` und `B` gleichzeitig: Dieser Handler funktioniert, wenn `A` und `B` beide nach unten gedrückt werden, und einer von ihnen innerhalb von 1,5 Sekunden wieder losgelassen wird.

## halten

* Für die Taste `A` oder `B`: Dieser Handler funktioniert, wenn die Taste für 1 Sekunde gedrückt und gehalten wird.
* Für `A` und `B` gleichzeitig: Dieser Handler funktioniert, wenn `A` und `B` beide nach unten gedrückt werden, und einer von ihnen innerhalb von 1,5 Sekunden wieder losgelassen wird.

**Dies ist eine erweiterte Funktion.**  Weitere Informationen finden Sie in der [@boardname@ Runtime messageBus Documentation](https://lancaster-university.github.io/microbit-docs/ubit/messageBus/).

## Siehe auch
[Knopf-Ereignis](input/on-button-event), [Pin-Ereignis](input/on-pin-event)