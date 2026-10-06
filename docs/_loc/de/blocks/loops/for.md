# Für... Schleife

Führe einen Teil des Programms so oft aus, wie du es in einer Indexvariable angibst.

```block
for(let i = 0; i <= 4; ++i) {
    let j = i;
}
```

##  #examples

## Beispiel: Zähle bis 4

Dieses Programm zeigt die Zahlen 0, 1, 2, 3 und 4 - eine nach der anderen - auf dem LED-Bildschirm an.

```blocks
input.onButtonEvent(Button.A, input.buttonEventValue(ButtonEvent.Down), () => {
    for(let i = 0; i < 5; ++i) {
        basic.showNumber(i)
    }
})
```