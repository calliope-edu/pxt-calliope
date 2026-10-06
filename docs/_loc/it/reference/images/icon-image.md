# immagine icona

Create an icon [image](/reference/images/image) for the [LED screen](/device/screen).

```sig
images.iconImage(IconNames.Heart);
```

Ci sono molte immagini di icone prefabbricate che puoi usare da mostrare sullo [schermo LED](/device/screen) della @boardname@. Scegli un'icona per il suo nome.

## Parametri

* **i**: the icon name of the image you want to show on the [LED screen](/device/screen). Scegli un'immagine icona come: `IconNames.Heart`.

## Esempio

Show a happy face when button A is pressed or a sad face when button B is pressed.

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