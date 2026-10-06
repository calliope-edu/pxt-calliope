# wait For Event

Stop running the current code and wait for an event.

```sig
control.waitForEvent(0, 0)
```
You might want your code to stop for a while until some event you're expecting happens. Si vous souhaitez mettre en pause votre code jusqu'à ce qu'un événement attendu se produise, utilisez le bloc `||control:attendre l'événement||`. A known event is something you identify that happens on the board or in your program. An event has both a source and a cause. The source is where the event comes from, like a sensor or some condition in your program. The cause is what made the event happen at the source.

You assign numbers for your event sources and causes. Ces nombres sont utilisés par le bloc [`||control:déclencher l'événement||`](/reference/control/raise-event) pour annoncer au programme qu'un événement vient de se produire.

As an example, you could make a timer that always causes an event every 100 milliseconds. The source number for the timer is `6` and the cause value is `1`. The program could wait for one of the time events like this:

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

## Paramètres

* **id** : le [numéro](/types/number) d'identification (source) de l'événement, tel que : `10`.
* **value** : un [nombre](/types/number) qui dit quelle est la cause de l'événement, comme : `4`.

## Exemple #example

Créer une minuterie qui envoie un signal toutes les 2 secondes. Attendre deux fois et écrire dans la console à chaque fois.

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
console.log("Timer timeout")
control.waitForEvent(myTimer, timerTimeout)
console.log("Timer timeout")
```

**Ceci est une API avancée.** Pour plus d'informations, consulter la [documentation  d'exécution messageBus du @boardname@](https://lancaster-university.github.io/microbit-docs/ubit/messageBus/).


## Voir aussi #seealso

[déclencher un événement](/reference/control/raise-event),[sur événement](/reference/control/on-event)