# Déclencher l'événement

Déclenche un événement dans le bus d'événement.

```sig
control.raiseEvent(control.eventSourceId(EventBusSource.MICROBIT_ID_BUTTON_A), control.eventValueId(EventBusValue.MICROBIT_EVT_ANY));
```

**Ceci est une API avancée.** Pour plus d'informations, consulter la [documentation d'exécution messageBus du @boardname@](https://lancaster-university.github.io/microbit-docs/ubit/messageBus/)

## Voir Aussi

[déclenche un événement radio](/reference/radio/raise-event)