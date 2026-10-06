# Running Time

Déterminez combien de temps un programme a été exécuté depuis son démarrage, en millisecondes.

```sig
input.runningTime()
```

## Valeur retournée

* the [Number](/types/number) of milliseconds since the program started. (One second is 1000 milliseconds.)

## Example: elapsed time

When you press button `B` on the @boardname@, this program finds the number of milliseconds since the program started and shows it on the [LED screen](/device/screen).

```blocks
input.onButtonEvent(Button.B, input.buttonEventClick(), () => {
    let now = input.runningTime()
    basic.showNumber(now)
})
```

## Voir Aussi

[afficher le numéro](/reference/basic/show-number), [pause](/reference/basic/pause), [durée d'exécution micros](/reference/input/running-time-micros)