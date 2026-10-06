# For Of

Run part of the program for each element in a list.

```block
for(let value of [""]) {

}
```

##  #examples

## Example: Find the highest number

Find the highest number in a list of numbers. Display the highest number on the screen.

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