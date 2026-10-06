# Définir le type d'Événement

Configure the type of events emitted by a given pin.

```sig
pins.setEvents(DigitalPin.P0, PinEventType.Edge);
```

### ~ indice

#### Simulateur

This function needs real hardware to work with. It's not supported in the simulator.

### ~

## Paramètres

* `name`: The @boardname@ hardware pin to configure (`P0` through `P20`)
* `type`: The type of events this pin should emit

## Exemple

The following example configures pin `P0` and then subscribes to the rise and fall events.

```blocks
control.onEvent(control.eventSourceId(EventBusSource.MICROBIT_ID_IO_P0),  control.eventValueId(EventBusValue.MICROBIT_PIN_EVT_RISE), () => {
    basic.showString("Augmenter")
})
control.onEvent(control.eventSourceId(EventBusSource.MICROBIT_ID_IO_P0),  control.eventValueId(EventBusValue.MICROBIT_PIN_EVT_FALL), () => {
    basic.showString("Automne")
})
pins.setEvents(DigitalPin.P0, PinEventType.Edge)
```

**Ceci est une API avancée.** Pour plus d'informations, consulter la [documentation d'exécution messageBus du @boardname@](https://lancaster-university.github.io/microbit-docs/ubit/messageBus/)