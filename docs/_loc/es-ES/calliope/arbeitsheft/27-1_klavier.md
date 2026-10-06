# 27 1 Piano

```ghost
input.onPinTouchEvent(TouchPin.P1, input.buttonEventDown(), function () {
  basic.setLedColor(0xff0080)
  music.playTone(294, music.beat(BeatFraction.Whole))
  basic.showString("D")
})
input.onPinTouchEvent(TouchPin.P0, input.buttonEventDown(), function () {
  basic.setLedColor(0x00ff00)
  music.playTone(262, music.beat(BeatFraction.Whole))
  basic.showString("C")
})
input.onPinTouchEvent(TouchPin.P2, input.buttonEventDown(), function () {
  basic.setLedColor(0xffff00)
  music.playTone(330, music.beat(BeatFraction.Whole))
  basic.showString("E")
})
input.onPinTouchEvent(TouchPin.P3, input.buttonEventDown(), function () {
  basic.setLedColor(0x00ffff)
  music.playTone(349, music.beat(BeatFraction.Whole))
  basic.showString("F")
})
basic.showIcon(IconNames.EigthNote)
```

## Tarea @showdialog

Desarrolla un mini piano Calliope que reproduzca una nota distinta al tocar las clavijas táctiles 0-3, encienda el LED RGB en distintos colores y muestre el nombre de la nota en la matriz de LED.

## Pantalla de inicio

Inicia tu programa con una nota que se muestra como un`||basic.icon||` en la matriz de LEDs.

## Define la entrada

Selecciona el bloque `||input.on pin P0 is pressed down|||` como entrada.

## Define la salida

Utiliza el bloque `||basic.show text||` para la letra de la nota y el bloque `||basic.set LED to||` para el color.
Añade un bloque `||music.play tone||` para la salida de sonido. Coloca los tres bloques de salida dentro del bloque de entrada `||input.on pin P0||`.

## Duplicar @showdialog

Duplica los bloques de programa y controla también los otros pines táctiles (1-3).

```
```

![](https://calliope.cc/tutorials/duplizieren.png)

## Personaliza la salida

Cambia los bloques transparentes `||input.on pin P0||` uno tras otro a: `||input.on pin P1||`, `||input.on pin P2||` y `||input.on pin P3||`.
Ajusta los nombres de las notas, los colores y la salida de sonido.

## ¡Hecho! ✨

Pulsa en `|Descargar|` para transferir el programa a tu Calliope mini.

```
Es importante tocar el pin menos (-) al mismo tiempo para activar una entrada de pin. Sujeta el Calliope mini con una mano en la patilla menos (-) y toca una de las otras patillas con un dedo de la otra mano.
```

```template
//
```