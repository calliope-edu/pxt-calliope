# wait For Event

Stoppt die Ausführung des aktuellen Codes und wartet auf ein Ereignis.

```sig
control.waitForEvent(0)
```
Möglicherweise möchten Sie, dass Ihr Code eine Weile anhält, bis ein erwartetes Ereignis eintritt. Wenn Sie möchten, dass Ihr Code pausiert, bis ein bekanntes Ereignis eintritt, verwenden Sie einen `||control:Auf Ereignis warten||`-Block. Ein bekanntes Ereignis ist etwas, das Sie identifizieren, das auf dem Board oder in Ihrem Programm passiert. Ein Ereignis hat sowohl eine Quelle als auch eine Ursache. Die Quelle ist der Ursprung des Ereignisses, wie ein Sensor oder eine bestimmte Bedingung in Ihrem Programm. Die Ursache ist das, was das Ereignis an der Quelle ausgelöst hat.

Sie weisen Ihren Ereignisquellen und -ursachen Nummern zu. Diese Nummern werden von [`||control:Ereignis auslösen||`](/reference/control/raise-event) verwendet, um Ihrem Programm mitzuteilen, dass gerade ein Ereignis stattgefunden hat.

Als Beispiel könnten Sie einen Timer erstellen, der alle 100 Millisekunden ein Ereignis auslöst. Die Quellnummer für den Timer ist `6` und der Wert der Ursache ist `1`. Das Programm könnte auf eines der Zeitereignisse wie folgt warten:

```blocks
const myTimer = 6;
const timerTimeout = 1;

control.runInParallel(function() {
    while (true) {
        control.waitMicros(100000)
        control.raiseEvent(myTimer, timerTimeout)
    }
})

control.waitForEvent(myTimer, timerTimeout)
```

## Parameter

* **id**: die Identifikations[nummer](/types/number) (die Quelle) dieses Ereignisses, wie zum Beispiel: `10`.
* **value**: eine [nummer](/types/number), die angibt, was die Ursache des Ereignisses ist, wie zum Beispiel: `4`.

## Beispiel #example

Erstellen Sie einen Timer, der alle 2 Sekunden ein Signal sendet. Warten Sie zweimal und schreiben Sie jedes Mal in die Konsole.

```blocks
const myTimer = 6;
const timerTimeout = 1;

control.runInParallel(function() {
    while (true) {
        pause(2000)
        control.raiseEvent(myTimer, timerTimeout)
    }
})

control.waitForEvent(myTimer, timerTimeout)
console.log("Timer abgelaufen")
control.waitForEvent(myTimer, timerTimeout)
console.log("Timer abgelaufen")
```

**Dies ist eine fortgeschrittene API.** Für weitere Informationen siehe die [Dokumentation des @boardname@ runtime messageBus](https://lancaster-university.github.io/microbit-docs/ubit/messageBus/).


## Siehe auch #seealso

[Ereignis auslösen](/reference/control/raise-event), [bei Ereignis](/reference/control/on-event)