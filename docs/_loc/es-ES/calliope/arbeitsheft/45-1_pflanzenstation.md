# 45 1 Estación de plantas

```ghost
input.onButtonEvent(Button.A, input.buttonEventClick(), function () {
    if (input.lightLevel() > 50) {
        basic.showIcon(IconNames.Yes)
    } else {
        basic.showLeds(`
            # . # . #
            . # # # .
            # # # # #
            . # # # .
            # . # . #
            `)
    }
})
input.onButtonEvent(Button.B, input.buttonEventClick(), function () {
    basic.showNumber(input.temperature())
})
basic.forever(function () {
if (grove.measureMoistureAnalog(AnalogPin.C16, MoistureMode.Original, MoistureOutput.Number) < 300) {
      basic.setLedColor(0x00ff00)
  } else {
      basic.setLedColor(0xff0000)
  }
})
```

## Estación de plantas @showdialogue

Programa una estación de plantas que te ayude a proporcionar a las plantas de la clase los mejores cuidados posibles. Las plantas necesitan **agua**, **luz solar** y una temperatura,
la **temperatura** también desempeña un papel importante.

## Mide la temperatura @showdialogue

**Temperatura** - Si se pulsa el botón B, se muestra la temperatura.

## Mide la temperatura

Para mostrar la temperatura, utiliza el bloque `||input.on button A is clicked||`. Cambia el botón pulsando en el menú desplegable de `||input.on button A is clicked||` y selecciona `botón B`.

## Mide la temperatura

Muestra la temperatura insertando el bloque de entrada `||input.temperature||` dentro del bloque `||basic.show number||`.

## Mide la luminosidad @showdialogue

- **Luminosidad** - Si pulsas el botón A, puedes visualizar si hay suficiente luz disponible.
  está disponible. Si está demasiado oscuro, aparece un sol en la matriz de LED. Si hay suficiente luz, aparece una marca.

## Mide la luminosidad

Añade otro bloque `||input.on button A clicked||` para mostrar los valores de luminosidad medidos. Selecciona una derivación `||logic.if/then|||` para comparar los valores de luz medidos con el valor límite en el siguiente paso.

## Compara los valores medidos

Añade la condición `||input.light level||` > 50 seleccionando una `||logic.logical comparison||` y comparando el `||input.light level|||` con el número `50`.

## Define la salida

Si está demasiado oscuro, aparece un sol en la matriz de LED. Si hay suficiente luz, aparece una marca. Utiliza el bloque `||basic.show symbol||` para mostrar los símbolos en la matriz de LEDs.

## Mide la humedad del suelo @showdialogue

Comprueba permanentemente: Si el suelo está demasiado seco, el LED RGB se encenderá en rojo, de lo contrario, el LED RGB se encenderá en verde. Utiliza el sensor de humedad y conéctalo al puerto Grove A1 derecho.

## Mide la humedad del suelo

Coloca una derivación `||logic.if/then|||` en el bucle `||basic.forever||`.

## Mide la humedad del suelo

Utiliza el bloque `||grove.moisture||` para determinar la humedad del suelo.
**Nota:** La extensión `||grove.Grove extension||` ya está integrada en el tutorial. Primero debes añadirla en el editor.

## Compara los valores medidos

Añade una `||logic.logical comparison||` a la derivación `||logic.if/then|||`, que comprueba si la `||grove.moisture (analogue)||` > 300.

## Define la salida

Si la tierra está húmeda, el color se configura en verde. Si está seca, el color es rojo. Coloca el bloque `||basic.set LED to||` y selecciona el color en los lugares correspondientes de la derivación `||logic.if/then|||`.

## ¡Hecho! 🎉

Pulsa en `|Descargar|` para transferir el programa a tu Calliope mini.

```package
grove=github:calliope-edu/pxt-grove
```