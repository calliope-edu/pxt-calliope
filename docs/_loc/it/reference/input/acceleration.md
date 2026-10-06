# Accelerazione

Ottieni il valore d'accelerazione (milli forza g) in una delle tre dimensioni, o la forza combinata in tutte le direzioni (x, y e z).

Trova l'accelerazione della @boardname@ (quanto sta accelerando o rallentando).

```sig
input.buttonIsPressed(Button.A);
```

## ~hint

Misuri l'accelerazione con i **milli-g**, che è 1/1000 di un **g**. Un **g** è quanta accelerazione ottieni dalla gravità della Terra.

## ~

Guarda questo video per imparare come funziona l'accelerometro sulla @boardname@:

https://www.youtube.com/watch?v=byngcwjO51U

## Parametri

* **dimensione**: la direzione che stai controllando per l'accelerazione, o la forza totale della forza. >`x`: l'accelerazione nella direzione sinistra e destra.  
    `y`: l'accelerazione nella direzione avanti e indietro.  
    `z`: l'accelerazione nella direzione su e giù.  
    `forza`: la forza risultante dell'accelerazione da tutte le tre dimensioni (direzioni).

### ~hint

**Forze nello spazio**

Poiché non viviamo su un pianeta piatto, le forze si applicano in uno spazio tridimensionale. Se il movimento di un oggetto non è esattamente nella direzione di uno degli assi, dobbiamo avere un modo per calcolarne l'accelerazione dai valori misurati per tutti gli assi insiemi.

Se metti la tua @boardname@ su una tavolo a livello e la spingi diagonalmente, hai un'accelerazione in due dimensioni. Puoi trovare l'accelerazione in quella direzione proprio come calcoli il lato lungo di un triangolo usando i due lati più corti (**X** e **Y**):

    strength2D = Math.sqrt((accelX * accelX) + (accelY * accelY))

If you decide to lift your @boardname@ off the table, then you've just added another dimension, so insert the acceleration value for the **Z** axis into the equation:

    strength3D = Math.sqrt((accelX * accelX) + (accelY * accelY) + (accelZ * accelZ))

Il calcolo viene chiamato la [norma Euclidea](https://en.wikipedia.org/wiki/Euclidean_norm) dell'accelerazione.

### ~

## Returns

* un [numero](/types/number) che significa la quantità d'accelerazione. When the @boardname@ is lying flat on a surface with the screen pointing up, `x` is `0`, `y` is `0`, `z` is `-1023`, and `strength` is `1023`.

## Esempio: grafico a barre

Questo esempio mostra l'accelerazione della @boardname@ con un grafico a barre.

```blocks
basic.forever(() => {
    led.plotBarGraph(input.acceleration(Dimension.X), 1023)
})
```

### Esempio: sismografo

Ogni 5 secondi, con la @boardname@ rivolta verso l'alto su una superficie piana, mostra quanto la terra si sta muovendo (se si muove).

```blocks
basic.forever(() => {
    basic.showNumber(input.acceleration(Dimension.Strength))
    basic.pause(5000)
})
```

## Vedi anche

[set accelerometer range](/reference/input/set-accelerometer-range), [compass heading](/reference/input/compass-heading), [light level](/reference/input/light-level)