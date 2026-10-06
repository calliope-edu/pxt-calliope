# Magnetic Force

Trova la quantità di forza magnetica (la forza di un magnete) in una delle tre direzioni.

```sig
input.magneticForce(Dimension.X);
```

## ~hint

The @boardname@ measures magnetic force with **microteslas**.

Ti viene chiesto di [calibrare](https://support.microbit.org/support/solutions/articles/19000008874-calibrating-the-micro-bit-compass) la bussola la prima volta che si esegue un programma che usa la bussola.

## ~

## Parametri

* **dimensione**: questa è la direzione che il @boardname@ dovrebbe misurare la forza magnetica in: sia `Dimension.X` (la direzione sinistra-destra), `Dimension.Y` (la direzione avanti/indietro), o `Dimension.Z` (la direzione su/giù)

## Returns

* a [number](/types/number) of microteslas that means the strength of the magnet

## Esempio

Create a metal detector my measuring the strength of magnetic force in the `X` direction. Display a bar graph to show the current level of magnetic force measured by the magnetometer.

```blocks
basic.forever(function() {
    led.plotBarGraph(input.magneticForce(Dimension.X) / 2000, 0)
})
```

## Vedi anche

[compass heading](/reference/input/compass-heading)