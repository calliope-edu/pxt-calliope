# Zwischenspeicher

Memory used as a temporary location for data in a program is commonly called a _buffer_. It's a transfer stop for data coming from some source like a network or pins operation. A program can read the data from the buffer when it's ready to work with it. Also, programs put their data in a buffer to make it ready for a transfer to a device or to somewhere else in memory on the @boardname@.

## Einen neuen Puffer erstellen

Sending and receiving data over the pins might need a buffer if you use your own form of data. The **Pins** category contains a function to create buffers for this purpose.

Ein Zwischenspeicher wird mit der Funktion **createBuffer** erzeugt, indem eine Puffergröße als Anzahl von Bytes gewählt wird.

```typescript-ignore
let bufr = pins.createBuffer(16);
```

## Einen numerischen Wert aus einem Puffer holen

You can get a number value from a particular place in a buffer using **getNumber**. Dazu müssen Sie angeben, wie groß jeder Ihrer numerischen Werte ist. Die Größe der numerischen Werte wird mit einem [NumberFormat](/types/buffer/number-format#number-format-types) Typ festgelegt. You use an _offset_ value which is the position in the buffer where the number value you want is at.

```typescript-ignore
let num = bufr.getNumber(NumberFormat.Int8LE, 5)
```

## Einen numerischen Wert in einen Puffer setzen
A number is placed in a buffer with **setNumber**. You use a number format like with **getNumber**. A new value to goes into the buffer at the position you select.

```typescript-ignore
let val = 15;
bufr.setNumber(NumberFormat.Int8LE, 5, val);
```

## Die Länge des Puffers ermitteln

Die Eigenschaft **Länge** zeigt an, wie groß der Zwischenspeicher in Bytes ist.

```typescript-ignore
let bufrLength = bufr.length;
```

## Den Puffer füllen

Sie können einen gesamten Puffer füllen, so dass jedes Byte im Puffer den gleichen Wert hat. You use the **fill** function to initialize or reset the buffer contents to a default value. Typischerweise die Zahl `0`.

```typescript-ignore
bufr.fill(0);
```

## Zwei Puffer aus einem machen

A new smaller buffer is created from an original larger one using the **slice** function. Sie geben an, von welcher Position Sie im ursprünglichen Puffer starten möchten und wie viele Bytes von dieser Position Sie kopieren möchten.

```typescript-ignore
let newBufr = bufr.slice(32, 64);
```

## Den Inhalt des Puffers verschieben

The contents of a buffer are shifted left or right by some amount of bytes with the **shift** function. Eine positive Verschiebezahl bewegt die Daten nach links (zu einer niedrigeren Position im Puffer). Eine negative Zahl bewegt die Daten nach rechts (zu einer höheren Position im Puffer). Daten, die über die erste oder letzte Position im Puffer hinaus verschoben werden, gehen verloren. Die Stellen im Puffer, von denen die Daten verschoben werden, werden mit `0`-Werten gefüllt.

```typescript-ignore
bufr.shift(8);
```
Here's an example of shifting a buffer to the left (higher positions to lower positions). The original buffer contains:

|   |   |   |   |   |   |   |   |
| - | - | - | - | - | - | - | - |
| 0 | 1 | 1 | 1 | 0 | 1 | 0 | 0 |
| 1 | 0 | 1 | 0 | 1 | 0 | 1 | 0 |
| 1 | 1 | 0 | 0 | 1 | 1 | 0 | 0 |
| 1 | 1 | 1 | 0 | 1 | 1 | 1 | 0 |
| 1 | 1 | 1 | 0 | 1 | 1 | 1 | 1 |
<br/>
After shifting by 2 bytes using **shift(2)**...

|   |   |   |   |   |   |   |   |
| - | - | - | - | - | - | - | - |
| 1 | 1 | 0 | 0 | 1 | 1 | 0 | 0 |
| 1 | 1 | 1 | 0 | 1 | 1 | 1 | 0 |
| 1 | 1 | 1 | 0 | 1 | 1 | 1 | 1 |
| 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |

## Den Inhalt des Puffers rotieren

The contents of a buffer are rotated left or right by some amount of bytes with the **rotate** function. Eine positive Rotationszahl rotiert die Daten nach links (zu einer niedrigeren Position im Puffer). Eine negative Zahl bewegt die Daten nach rechts (zu einer höheren Position im Puffer). Daten, die über die erste oder letzte Position im Puffer hinaus bewegt werden, werden im Puffer an der Stelle, an der die Rotation endete, wieder eingefügt.

```typescript-ignore
bufr.rotate(6);
```
Here's an example of rotating a buffer to the left (higher positions to lower positions). The original buffer contains:

|   |   |   |   |   |   |   |   |
| - | - | - | - | - | - | - | - |
| 0 | 1 | 1 | 1 | 0 | 1 | 0 | 0 |
| 1 | 0 | 1 | 0 | 1 | 0 | 1 | 0 |
| 1 | 1 | 0 | 0 | 1 | 1 | 0 | 0 |
| 1 | 1 | 1 | 0 | 1 | 1 | 1 | 0 |
| 1 | 1 | 1 | 0 | 1 | 1 | 1 | 1 |
<br/>
After shifting by 3 bytes using **rotate(3)**...

|   |   |   |   |   |   |   |   |
| - | - | - | - | - | - | - | - |
| 1 | 1 | 1 | 0 | 1 | 1 | 1 | 0 |
| 1 | 1 | 1 | 0 | 1 | 1 | 1 | 1 |
| 0 | 1 | 1 | 1 | 0 | 1 | 0 | 0 |
| 1 | 0 | 1 | 0 | 1 | 0 | 1 | 0 |
| 1 | 1 | 0 | 0 | 1 | 1 | 0 | 0 |

## Einen Puffer in einen anderen kopieren

The contents of another buffer are copied to a location in the current buffer using the **write** function. Sie geben an, wo (an welcher Position) im aktuellen Puffer Sie den Inhalt schreiben möchten und fügen den anderen Puffer als zweiten Parameter hinzu.

```typescript-ignore
let sourceBufr = serial.readBuffer(32);
bufr.write(128, sourceBufr);
```

## Siehe auch

 [using buffers](/types/buffer/using-buffers), [number format](/types/buffer/number-format)