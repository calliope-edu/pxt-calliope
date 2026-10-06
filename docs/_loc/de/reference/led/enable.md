# LED-Anzeige aktivieren

Schaltet den LED-Bildschirm ein und aus

```sig
led.enable(false);
```

## Parameter

* `on` ist vom ein [boolescher Wert](/types/boolean) und definiert den An-/Aus-Status der LED-Matrix

## Beispiel: LED-Matrix ausschalten

Dieses Programm schaltet den Bildschirm aus, wenn du den Knopf `B` drückst

```blocks
input.onButtonEvent(Button.B, input.buttonEventClick(), () => {
    led.enable(false)
});
```

## Pins: P3, P4, C6, C7, C9, C10

Diese Pins sind an die LED-Matrixanzeige gekoppelt über die auch die Umgebungslichterkennung erfolgt. Um die Display-Treiberfunktion zu deaktivieren (die die Licht-Erkennungsfunktion automatisch deaktiviert) rufe die DAL-Funktion `led.enable(false)` auf. Um den Anzeigetreiber später wieder einzuschalten, rufe `led.enable(true)` auf.

Weitere Informationen unter http://tech.microbit.org/Hardware/edgeconnector_ds/.

## Siehe auch

[LED ausschalten](/reference/led/unplot), [eine LED anschalten](/reference/led/point), [LED-Matrix](/device/screen)