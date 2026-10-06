# Enable

Turns the LED screen on and off

```sig
led.enable(false);
```

## Parametri

* `on` is a [boolean](/types/boolean) that defines the on/off state of the screen

## Example: Turning off the screen

This program turns off the screen when pressing button `B`

```blocks
input.onButtonEvent(Button.B, input.buttonEventClick(), () => {
    led.enable(false)
});
```

## Pins: P3, P4, P6, P7, P9, P10

These pins are coupled to the LED matrix display, and also it’s associated ambient light sensing mode. To disable the display driver feature (which will automatically disable the light sensing feature) call the DAL function `led.enable(false)`. To turn the display driver back on again later, call `led.enable(true)`.

Altre informazioni a http://tech.microbit.org/hardware/edgeconnector_ds/ .

## Vedi anche

[unplot](/reference/led/unplot), [point](/reference/led/point), [LED screen](/device/screen)