# Interroger le système

Find whether the LED you say on the [LED screen](/device/screen) is on or off.

```sig
led.point(0,0);
```

## Paramètres

* `x` is a [number](/types/number) that means the horizontal spot on the LED screen (from left to right: 0, 1, 2, 3, or 4)
* `y` is a [number](/types/number) that means the vertical spot on the LED screen (from top to bottom: 0, 1, 2, 3, or 4)

If a parameter is [out of bounds](/reference/out-of-bounds) (a value other than 0 to 4), this function will return `false`.

## Valeur retournée

* a [boolean](/blocks/logic/boolean). If it is `true`, that means the LED is on. If it is `false`, that means the LED is off.

## ~indice

The LED screen is a solid square of LEDs with five LEDs on each side. To learn more about how you number the LEDs with `x` and `y` coordinates, see [LED screen](/device/screen).

## ~

## Example: Toggle off

This program turns the center LED (2, 2) off if it is already on. (If it is already off, this program leaves it off.)

```blocks
if (led.point(2, 2)) {
    led.unplot(2, 2)
}
```

## Voir Aussi

[unplot](/reference/led/unplot), [plot](/reference/led/plot), [LED screen](/device/screen)