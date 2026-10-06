# set Events

Configure the type of events emitted by a given pin.

```sig
pins.setEvents(DigitalPin.P0, PinEventType.Edge);
```

### ~ notas

#### Simulador

Esta función requiere hardware real para funcionar. No es compatible con el simulador.

### ~

## Parameters

* `name`: The @boardname@ hardware pin to configure (`P0` through `P20`)
* `type`: The type of events this pin should emit

## Ejemplo

The following example configures pin `P0` and then subscribes to the rise and fall events.

```blocks
control.onEvent(control.eventSourceId(EventBusSource.MICROBIT_ID_IO_P0),  control.eventValueId(EventBusValue.MICROBIT_PIN_EVT_RISE), () => {
    basic.showString("Rise")
})
control.onEvent(control.eventSourceId(EventBusSource.MICROBIT_ID_IO_P0),  control.eventValueId(EventBusValue.MICROBIT_PIN_EVT_FALL), () => {
    basic.showString("Fall")
})
pins.setEvents(DigitalPin.P0, PinEventType.Edge)
```

**This is an advanced API.** For more information, see the [@boardname@ runtime messageBus documentation](https://lancaster-university.github.io/microbit-docs/ubit/messageBus/)