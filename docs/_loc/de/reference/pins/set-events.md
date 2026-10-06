# Ereignisse einstellen

Konfiguriert die Art der Ereignisse, die von einem bestimmten Pin gesendet werden.

```sig
pins.setEvents(DigitalPin.P0, PinEventType.Edge);
```

### ~ hint

#### Simulator

Zur Verwendung dieser Funktion brauchst Du echte Hardware, die im Simulator nicht unterstützt wird.

### ~

## Parameter

* `name`: Der @boardname@ Hardware-Pin zum Konfigurieren (`P0-P3` oder `C0-C18`)
* `Typ`: Der Typ der Ereignisse, die dieser Pin aussenden soll

## Beispiel

Das folgende Beispiel konfiguriert Pin `P0` und erstellt ereignisgesteuerte Anwendungen.

```blocks
control.onEvent(control.eventSourceId(EventBusSource.MICROBIT_ID_IO_P0),  control.eventValueId(EventBusValue.MICROBIT_PIN_EVT_RISE), () => {
    basic.showString("Rise")
})
control.onEvent(control.eventSourceId(EventBusSource.MICROBIT_ID_IO_P0),  control.eventValueId(EventBusValue.MICROBIT_PIN_EVT_FALL), () => {
    basic.showString("Fall")
})
pins.setEvents(DigitalPin.P0, PinEventType.Edge)
```

**Dies ist eine fortgeschrittene API.** Für weitere Informationen siehe die [Dokumentation des @boardname@ runtime messageBus](https://lancaster-university.github.io/microbit-docs/ubit/messageBus/)