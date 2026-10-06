# 42 2 Oráculo

```ghost
let zufall = 0
input.onGesture(Gesture.Shake, function () {
   zufall = randint(0, 2)
   if (zufall == 1) {
      basic.showString("Ja")
   }
   if (zufall == 2) {
      basic.showString("Nein")
   }
   if (zufall == 3) {
      basic.showString("Vielleicht")
   }
});
```

## Tarea @showdialog

¿Ganaremos el próximo torneo de hockey sobre hierba, está Flynn enamorada de mí o podré jugar esta noche en el ordenador? <br>
Construye tu propio **mini oráculo Calliope** y deja que te dé las respuestas.
¡Tú programas y determinas las respuestas!

## Define la entrada

Selecciona el bloque `||input.if shaken|||` como entrada.

## Crea una variable aleatoria

Crea una `||variables.variable||` y nómbrala aleatoria.

```
```

![](https://calliope.cc/tutorials/variable_zufall.png)

## Genera y guarda un número aleatorio

Utiliza el bloque `||math.pick random number||` para determinar un número aleatorio entre 1 y 3.
Guarda esto en la variable `||variables.set random|||` usando el bloque `|variables.set random||`.

## Condiciones de consulta

Consulta el número aleatorio utilizando una sentencia `||logic.if/then||`. Utiliza el bloque `||logic.compare (=)||` para comparar el valor de la variable `||variables.random||` con los números probables. Necesitas una consulta para cada número probable.<p>
**Consejo:** También puedes utilizar una derivación múltiple si pulsas sobre el **+** de la consulta y la expandes.

## Define la salida

A cada número probable se le asigna una respuesta. El número aleatorio determina la respuesta. Utiliza el bloque `||basic.show text||` para mostrar la respuesta en la matriz de LEDs.

## ¡Hecho! 😍

Pulsa en `|Descargar|` para transferir el programa a tu Calliope mini.

```template
//
```