# Game of Life

The [Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life) simulates life in a grid world (a two-dimensional block of cells). Les cellules de la grille ont un état "vivant" ou "mort". Le jeu commence avec une population de cellules placées selon un certain modèle sur la grille. Une simulation est exécutée et, sur la base de quelques règles simples de vie et de mort, les cellules continuent de vivre, de mourir ou de se reproduire.

## Règles de vie

Les règles de la vie dans la grille sont:

1. Une cellule vivante avec moins de deux cellules vivantes à côté de celle-ci mourra. Il s'agit de la sous-population, manque de soutien social.
2. Une cellule vivante avec deux ou trois cellules vivantes à côté de celle-ci continue de vivre. Il s’agit d’une population en bonne santé.
3. Une cellule vivante avec plus de trois cellules vivantes à côté de celle-ci mourra. Il s'agit de surpopulation, un manque de ressources.
4. Une cellule morte avec trois cellules vivantes à côté se transforme en cellule vivante. C'est la reproduction.

Selon le modèle de cellules vivantes au début du jeu, certaines simulations de population peuvent survivre plus longtemps que d'autres.

## Game of Life simulation in LEDs

Here's a program that simulates cell life in the LED matrix. Utilisez le bouton `A` pour la prochaine étape de vie et le bouton `B` pour réinitialiser.

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
            // Toute cellule vivante ayant moins de deux voisins vivants meurt, comme si cela était dû à une sous-population.
            // Toute cellule vivante avec deux ou trois voisins vivants survit à la génération suivante.
            // Toute cellule morte avec exactement trois voisines vivantes devient une cellule vivante, comme par reproduction.
            // Toute cellule vivante ayant plus de trois voisines vivantes meurt, comme par surpopulation.
            switch (count) {
                case 0: setState(result, x, y, false); break;
                case 1: setState(result, x, y, false); break;
                case 2: setState(result, x, y, getState(state, x, y)); break;
                case 3: setState(result, x, y, true); break;
                default: setState(result, x, y, false); break;
            }
        }
    }
    //Mettre à jour l'état
    state = result;
}
//Remise à zéro et affichage initial
reset();
show();
```