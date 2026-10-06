# Für... von...

Führe einen Teil des Programms für jedes Element in einer Liste aus.

```block
for(let value of [""]) {

}
```

##  #examples

## Beispiel: Die höchste Zahl finden

Finde die höchste Zahl in einer Liste von Zahlen. Zeige die höchste Zahl auf dem Bildschirm an.

```blocks
let list: number[] = []
let highest = 0
highest = 0
list = [5, 8, 6, 2, 4, 3, 7, 1]
for (let value of list) {
    if (value > highest) {
        highest =  value
    }
}
basic.showNumber(highest)
```