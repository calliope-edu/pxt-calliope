# Ei und Löffel Rennen

Das [Ei und Löffel](https://en.wikipedia.org/wiki/Egg-and-spoon_race) Rennen ist ein Spiel, in dem ein Spieler ein Objekt (wie ein Ei) über eine Distanz transportiert, ohne dass es aus einem Halter fällt. Im Falle des Eis und Löffels muss der Spieler vorsichtig mit einem Ei gehen, das in einem Löffel gehalten wird. Das Ei muss im Löffel bleiben, bis der Spieler die Ziellinie überquert. Das Ei kann leicht aus dem Löffel rollen, sodass der Spieler Geschicklichkeit und Geduld braucht, um das Ei bis zum Ende des Rennens zu balancieren.

Du kannst deinen @boardname@ programmieren ein Ei zu sein und deine Hand ist der Löffel. Wenn du deinen @boardname@ hältst und dabei zu schnell bist oder zu sehr wackelst, kann es sein dass du dein "Ei" fallen lässt. Versuche, den Balancepunkt in der Mitte des LED-Displays zu halten.

```blocks
let accY = 0
let accX = 0
let y = 0
let x = 0
basic.forever(() => {
    led.plot(x, y)
    accX = input.acceleration(Dimension.X)
    accY = input.acceleration(Dimension.Y)
    if (accX < -150 && x > 0) {
        x += -1
    } else if (accX > 150 && x < 4) {
        x += 1
    }
    if (accY < -150 && y > 0) {
        y += -1
    } else if (accY > 150 && y < 4) {
        y += 1
    }
    basic.pause(500)
    basic.clearScreen()
})
x = 2
y = 2
```