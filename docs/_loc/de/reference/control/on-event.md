# Bei Ereignis

Legt einen Event-Handler fest, der aktiviert wird, sobald das angegebene Ereignis eintritt.

```sig
control.onEvent(control.eventSourceId(EventBusSource.MICROBIT_ID_BUTTON_A), control.eventValueId(EventBusValue.MICROBIT_EVT_ANY), () => { });
```

**Dies ist eine erweiterte API.** Weitere Informationen findest du in der [@boardname @ Runtime messageBus Documentation](https://lancaster-university.github.io/microbit-docs/ubit/messageBus/).