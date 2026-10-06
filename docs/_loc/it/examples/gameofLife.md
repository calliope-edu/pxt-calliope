# Gioco della Vita

Il [Gioco della Vita](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life) simula la vita in un mondo a griglia (un blocco di celle bi-dimensionali). The cells in the grid have a state of "alive" or "dead". The game starts with a population of cells placed in a certain pattern on the grid. Una simulazione viene eseguita e si basa su alcune semplici regole per la vita e la morte, le cellule continuano a vivere, muoiono o si riproducono.

## Regole per la Vita

Le regole per la vita nella griglia sono:

1. Una cellula vivente con meno di due cellule vicine ad essa morirà. Questa è sottopopolazione, nessun supporto sociale.
2. Una cellula vivente con due o tre cellule vive vicino continuerà a vivere. Questa è una popolazione sana.
3. Una cellula vivente con più di tre cellule vive vicino morirà. Questa è sovrappopolazione, risorse scarse.
4. Una cellula morta con tre cellule vive vicine diventerà una cellula vivente. Questa è la riproduzione.

Depending on the pattern of living cells at the start of the game, some population simulations may survive longer than others.

## Simulazione in LED del Gioco della Vita

Here's a program that simulates cell life in the LED matrix. Usa il pulsante `A` per il prossimo passaggio della vita ed il pulsante `B` per riavviare.

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

//State holds the information about pixel is live or dead
//false means dead, true means live.
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

//Generate random initial state.
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

            // Toggle live / dead cells based on the neighbour count.
            // Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
            // Any live cell with two or three live neighbours lives on to the next generation.
            // Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
            // Any live cell with more than three live neighbours dies, as if by overpopulation.
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