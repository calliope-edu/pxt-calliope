# 24 3_4 Botones

```ghost
input.onButtonEvent(Button.A, input.buttonEventClick(), function () {
 basic.showIcon(IconNames.Happy)
 basic.setLedColor(0x00ff00)
})
```

## Tareas @showdialog

Haz que aparezca una **cara alegre** cuando se pulsa el **botón A** y una **cara triste** cuando se pulsa el **botón B**. Añade un color a juego con ambos símbolos.

## Botón de control A

Selecciona el bloque `||input.on botón A||` se pulsa como entrada.

## Símbolo y color de la pantalla

Usa el bloque `||basic.show symbol|||` y haz que aparezca un smiley en la matriz de LEDs. Añade el bloque `||basic.set LED to||` a tu programa y deja que el LED RGB se ilumine en `verde`.

## Botón de control B

Coloca otro bloque `|| input.on botón A ||` pulsado y cámbialo por `|| input.on botón B ||` pulsado.

```
```

![Botón B](https://calliope.cc/tutorials/kopf_a_b.png)

## Mostrar símbolo y color

Añade el bloque `||basic.show icon|||` y selecciona un smiley triste.
Para cambiar el color del LED RGB, utiliza el bloque `||basic.set LED to||`. Configura el bloque para que el LED RGB se ilumine en "rojo".

## ¡Hecho! 😍

Pulsa en `|Descargar|` para transferir el programa a tu Calliope mini.

```template
//
```