# Während...

Wiederhole einen Programmteil, während eine [boolesche](/blocks/logic/boolean) `Bedingung` wahr ist.

```block
while(true) {
}
```

Die während-Schleife hat eine *Bedingung* welche einen [booleschen](/blocks/logic/boolean) Wert auswertet.

Die Bedingung wird getestet, bevor Code ausgeführt wird. Das bedeutet, dass der Code innerhalb der Schleife nicht ausgeführt wird, wenn die Bedingung falsch ist.

##  #examples

## Beispiel: Diagonale Linie

Im folgenden Beispiel wird eine while-Schleife verwendet, um eine diagonale Linie auf dem LED-Bildschirm zu erstellen (Punkte `(0, 0)`, `(1, 1)`, `(2, 2)`, `(3, 3)`, `(4, 4)`).

```blocks
input.onButtonEvent(Button.A, input.buttonEventValue(ButtonEvent.Down), () => {
    let index = 4;
    while(index >= 0) {
        led.plot(index, index);
        index--;
    }
})
```