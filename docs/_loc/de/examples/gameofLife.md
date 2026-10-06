# Spiel des Lebens

Das [Spiel des Lebens](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life) simuliert das Leben in einer Raster Welt (einem zweidimensionalen Zellenblock). Die Zellen im Raster haben den Status "lebendig" oder "tot". Das Spiel beginnt mit einer Population von Zellen in einem bestimmten Muster auf dem Gitter platziert werden. Eine Simulation wird durchgeführt und basierend auf einigen einfachen Regeln für Leben und Tod, werden die Zellen weiterleben, absterben oder sich vermehren.

## Regeln für das Leben

Die Regeln für das Leben im Raster sind:

1. Eine lebende Zelle mit weniger als zwei benachbarten lebenden Zellen wird sterben. Das ist Unterbevölkerung und fehlende soziale Unterstützung.
2. Eine lebende Zelle mit zwei oder drei benachbarten lebenden Zellen ihr weiter leben. Dies ist eine gesunde Population.
3. Eine lebende Zelle mit mehr als drei benachbarten lebenden Zellen wird sterben. Das ist Überbevölkerung und Ressourcenknappheit.
4. Eine tote Zelle mit drei benachbarten lebenden Zellen verwandelt sich in eine lebende Zelle. Das ist Fortpflanzung.

Abhängig vom Muster der lebenden Zellen zu Beginn des Spiels können einige Populationssimulationen länger überleben als andere.

## Spiel des Lebens-Simulation mit LEDs

Hier ist ein Programm, das das Zellleben in der LED-Matrix simuliert. Verwende die Taste `A` für den nächsten Lebensabschnitt und die Taste `B` zum Neustarten.

```typescript
//https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life
let lifeChart: Image = null

//Use button A for the next iteration of game of life
input.onButtonEvent(Button.A, input.buttonEventValue(ButtonEvent.Click), () => {
    gameOfLife();
    show();
})

//Use button B for reseting to random initial seed state
input.onButtonEvent(Button.B, input.buttonEventValue(ButtonEvent.Click), () => {
    reset();
    show();
})

lifeChart = images.createImage(`
    . . . . .
    . . . . .
    . . . . .
    . . . . .
    . . . . .
    `)

State speichert die Informationen über die Pixel ob sie leben oder oder tot sind.
falsch bedeutet tot, wahr bedeutet leben.
let state = [false, false, false, false, false,
    false, false, false, false, false,
    false, false, false, false, false,
    false, false, false, false, false,
    false, false, false, false, false]

//get & set on any array
function getState(arr: boolean[], x: number, y: number): boolean {
    return arr[x * 5 + y];
}
function setState(arr: boolean[], x: number, y: number, value: boolean): void {
    arr[x * 5 + y] = value;
}

//zufälligen Anfangsstatus generieren
function reset() {
    for (let x = 0; x < 5; x++) {
        for (let y = 0; y < 5; y++) {
            setState(state, x, y, Math.randomBoolean());
        }
    }
}

//Show the lifeChart based on the state
function show() {
    for (let x = 0; x < 5; x++) {
        for (let y = 0; y < 5; y++) {
            lifeChart.setPixel(x, y, getState(state, x, y));
        }
    }
    lifeChart.plotImage(0);
}

//Core function
function gameOfLife() {
    let result: boolean[] = [];
    let count = 0;

    for (let x = 0; x < 5; x++) {
        for (let y = 0; y < 5; y++) {
            count = 0;

            //Count the live cells in the next row
            if ((x + 1) < 5) {
                if (getState(state, x + 1, y)) {
                    count++;
                }
                if ((y + 1 < 5) && getState(state, x + 1, y + 1)) {
                    count++;
                }
                if ((y - 1 >= 0) && getState(state, x + 1, y - 1)) {
                    count++;
                }
            }

            //Count the live cells in the previous row
            if ((x - 1) >= 0) {
                if (getState(state, x - 1, y)) {
                    count++;
                }
                if ((y + 1 < 5) && getState(state, x - 1, y + 1)) {
                    count++;
                }
                if ((y - 1 >= 0) && getState(state, x - 1, y - 1)) {
                    count++;
                }
            }

            //Count the live cells in the current row exlcuding the current position.
            if ((y - 1 >= 0) && getState(state, x, y - 1)) {
                count++;
            }
            if ((y + 1 < 5) && getState(state, x, y + 1)) {
                count++;
            }

            // Leben/Tod umschalten, basierend auf der Anzahl der Nachbarn
            // Jede lebende Zelle mit weniger als zwei lebenden Nachbarn stirbt, als wenn sie durch Unterbevölkerung verursacht wird.
            // Jede lebende Zelle mit zwei oder drei lebenden Nachbarn lebt bis zur nächsten Generation.
            // Jede tote Zelle mit genau drei lebenden Nachbarn wird zu einer lebenden Zelle, wie durch Reproduktion.
            // Jede lebende Zelle mit weniger als zwei lebenden Nachbarn stirbt, durch Übervölkerung verursacht.
            switch (count) {
                case 0: setState(result, x, y, false); break;
                case 1: setState(result, x, y, false); break;
                case 2: setState(result, x, y, getState(state, x, y)); break;
                case 3: setState(result, x, y, true); break;
                default: setState(result, x, y, false); break;
            }
        }
    }
    //Update the state
    state = result;
}
//Initial reset & show
reset();
show();
```