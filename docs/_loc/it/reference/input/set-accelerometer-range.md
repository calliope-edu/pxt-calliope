# Set Accelerometer Range

Configura la parte della @boardname@ che misura l'[accelerazione](/reference/input/acceleration) (quanto il microbit sta accelerando o rallentando), nel caso tu debba misurare accelerazione o decelerazione.

```sig
input.setAccelerometerRange(AcceleratorRange.OneG);
```

## Parametri

* `range` means the biggest number of gravities of acceleration you will be measuring (either `1g`, `2g`, `4g`, or `8g`). Ogni numero maggiore sarà ignorato dalla tua @boardname@, sia quando stai scegliendo un numero di gravità che quando stai misurando l'accelerazione.

## Esempio

This program sets the highest acceleration that your @boardname@ will measure is 4G. Then it shows acceleration from side to side until you stop the program.

```blocks
input.setAccelerometerRange(AcceleratorRange.FourG);
basic.forever(() => {
    basic.showNumber(input.acceleration(Dimension.X));
});
```

### ~hint

This program does not work in the simulator, only in a @boardname@.

### ~

## Guarda anche

[compass heading](/reference/input/compass-heading), [light level](/reference/input/light-level)