# Icon-Bild

Zeigt ein [image](/reference/images/image) (Bild) auf der [LED-Matrix](/device/screen) des @boardname@ an.

```sig
images.iconImage(IconNames.Heart);
```

Es gibt viele vorgefertigte Icon-Bilder, die auf der [LED-Matrix](/device/screen) des @boardname@ angezeigt werden können. Du kannst ein Symbol durch seinen Namen auswählen.

## Parameter

* **i**: Der Symbolname des Bildes, das auf der [LED-Matrix angezeigt werden soll](/device/screen). Du wählst ein Icon Bild wie folgt: `IconNames.Heart`.

## Beispiel

Zeige ein glückliches Gesicht, wenn Taste A gedrückt wird oder ein trauriges Gesicht gedrückt wird, wenn Taste B gedrückt wird.

```blocks
let iamHappy = images.iconImage(IconNames.Happy)
let iamSad = images.iconImage(IconNames.Sad)

input.onButtonEvent(Button.A, input.buttonEventClick(), () => {
    iamHappy.showImage(0);
});
input.onButtonEvent(Button.B, input.buttonEventClick(), () => {
    iamSad.showImage(0);
});
```