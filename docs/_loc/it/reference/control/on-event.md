# On Event

Raise an event in the event bus.

```sig
control.onEvent(control.eventSourceId(EventBusSource.MICROBIT_ID_BUTTON_A), control.eventValueId(EventBusValue.MICROBIT_EVT_ANY), () => { });
```

**Questa è un'API avanzata.** Per ulteriori informazioni, vedi la [documentazione @boardname@ runtime messageBus](https://lancaster-university.github.io/microbit-docs/ubit/messageBus/).