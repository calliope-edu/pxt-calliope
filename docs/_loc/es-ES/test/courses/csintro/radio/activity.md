# Coding Activity 1: Marco Polo

![Marco Polo Cartoon](https://makecode.com/not-found/HEAD/static/courses/csintro/radio/marco-polo.png)

Marco Polo was the first Westerner to journey to Eastern Asia and document his travels. There is an American game called "Marco Polo", which is a form of call-and-response tag played in a swimming pool. One person closes their eyes and calls "Marco", and the other players must respond "Polo." Using the sound of their voices only, the Marco player must find and tag the Polo players.

We will be playing a form of this "Marco Polo" game using the radio on the micro:bits.

This activity focuses on using Radio blocks to send and receive strings between micro:bits.

## Set Group ID Number

When communicating between micro:bits, it is important that the micro:bits involved are all using the same group ID. So, the first thing we will do is set the group ID number.

- In Microsoft MakeCode, start a new project and name it: **Marco Polo**. Either delete the 'forever' block in the coding Workspace or move it to the side, as it's not used in the activity.
- Then from the Radio Toolbox, drag a **'radio set group'** block to the coding Workspace and connect into the 'on start' block. In the **'radio set group'** block, leave the default value of 1 for the group ID.

```blocks
radio.setGroup(1)
```

## Code radio send for button A and button B

- Drag two **'on button pressed'** blocks to the coding Workspace. Leave one with the default value A , and use the dropdown menu to change the other button to B.
- From the Radio Toolbox drawer, drag two **'radio send string'** blocks to the coding Workspace. Place one **'radio send string'** block into the **'on button A pressed'** block, and the other **'radio send string'** block into the 'on button B pressed' block. Then:
  - In the **'on button A pressed'** block, change the default empty string value of the **'radio send string'** block by typing the string: Marco
  - In the **'on button B pressed'** block, change the default empty string value of the **'radio send string'** block by typing the string: Polo

```blocks
input.onButtonPressed(Button.A, () => {
    radio.sendString("Marco")
})
input.onButtonPressed(Button.B, () => {
    radio.sendString("Polo")
})
```

## Code radio received

- To display the data sent between the micro:bits, drag an **'on radio received (receivedString)'** block to the coding Workspace
  **Note:** There are a lot of blocks in the Radio category that look similar. Make sure you use the **'on radio received'** block with **'receivedString'** value.
- Desde el cajón Básico de la Caja de Herramientas, arrastra un bloque **'mostrar cadena'** al bloque **'en radio recibida (receivedString)'**. A continuación, desde el cajón Variables de la Caja de Herramientas, arrastra un bloque de variables **'receivedString'** para reemplazar el valor por defecto de la cadena «Hola» en el bloque **'mostrar cadena'**.

## Complete program

Here is the complete Marco Polo program:

```blocks
input.onButtonPressed(Button.A, () => {
    radio.sendString("Marco")
})
radio.onReceivedString(function (receivedString) {
    basic.showString(receivedString)
})
input.onButtonPressed(Button.B, () => {
    radio.sendString("Polo")
})
radio.setGroup(1)
```

Enlace a la solución: [Marco Polo](https://makecode.microbit.org/_5gs2WR1fM8uy)

## Mod this!

- Add a 'show leds' block to the 'on start' block. We created an image of the initials MP.
- From the Music Toolbox drawer, drag 2 'play tone' blocks to the coding workspace.
- Drag one of the 'play tone' blocks to the 'on button A pressed' block, and the other one to the 'on button B pressed' block.
- Change the default value in the 'play tone' block that is inside the 'on button A pressed' block to the value Low C.

Complete Marco Polo program with mods:

```blocks
input.onButtonPressed(Button.A, () => {
    radio.sendString("Marco")
    music.playTone(131, music.beat(BeatFraction.Whole))
})
radio.onReceivedString(function (receivedString) {
    basic.showString(receivedString)
})
input.onButtonPressed(Button.B, () => {
    radio.sendString("Polo")
    music.playTone(262, music.beat(BeatFraction.Whole))
})
radio.setGroup(1)
basic.showLeds(`
    # . # # #
    # # # # #
    # . # # #
    # . # # .
    # . # # .
`)
```

Enlace a la solución: [Marco Polo With Mod](https://makecode.microbit.org/_7VrHLecATUzR)

# Coding activity 2: Morse Code

Morse code is a character encoding scheme used in telecommunication that encodes text characters as standardized sequences of two different signal durations called dots and dashes. Morse code is named for Samuel F. B. Morse, an inventor of the telegraph. The first versions were invented in the early 1800s and has been refined since then. In the late 1800s, it was used for early radio communication before it was possible to transmit voice.

![Morse code alphabet](https://makecode.com/not-found/HEAD/static/courses/csintro/radio/morse.png)

This activity focuses on using Radio blocks to send and receive numbers between micro:bits:

- Depending on the button pressed, a different number value is sent between micro:bits.
- On receiving a number, the micro:bit will display a different image unique to the number sent.
- One number will represent a dot, another a dash, and another a space or stop.

## Set the group ID

- In Microsoft MakeCode, start a new project and name it: **Morse code**. Either delete the 'forever' block in the coding Workspace or move it to the side, as it's not used in the activity.
- Set the Radio group ID number, following the same steps as the previous activity. A continuación, añade un bloque **'mostrar cadena'** al bloque **'al inicio'** para identificar el programa. In this example, the default string value of **Hello** is changed to the value **Morse Code**.

```blocks
radio.setGroup(1)
basic.showString("Morse Code")
```

## Code the buttons

- Arrastra tres bloques **'al pulsar el botón'** al espacio de trabajo de codificación. Leave one with the default value A, change the value in the second block to **B**, and change the value in the third block to **A+B**.

- Desde el cajón Radio de la Caja de Herramientas, arrastra tres bloques **'número de envío de radio'** al espacio de trabajo de codificación y coloca un bloque **'número de envío de radio'** en cada uno de los bloques **'al pulsar el botón'**.
  - En el bloque **'al pulsar el botón A'**, deja el valor por defecto del bloque **'número de envío de radio'** como 0.
  - En el bloque **'al pulsar el botón B'**, cambia el valor numérico por defecto del bloque **'número de envío de radio'** al valor 1.
  - En el bloque **'al pulsar el botón A+B'**, cambia el valor numérico por defecto del bloque **'número de envío de radio'** al valor 2.

```blocks
input.onButtonPressed(Button.A, () => {
    radio.sendNumber(0)
})
input.onButtonPressed(Button.B, () => {
    radio.sendNumber(1)
})
input.onButtonPressed(Button.AB, () => {
    radio.sendNumber(2)
})
```

## Code radio received

- Desde el cajón Radio de la Caja de Herramientas, arrastra un manejador de eventos "en radio recibida (receivedNumber)" al Espacio de Trabajo de codificación.

**Note:** There are a lot of blocks in the Radio category that look similar. Asegúrate de utilizar el bloque con el valor **'receivedNumber'**.

- Since we will display a different image depending on the number value received, we need a logic block. Desde el cajón Lógica de la Caja de Herramientas, arrastra un bloque 'if...then...else' al Espacio de Trabajo de codificación y colócalo en el manejador de eventos "en radio recibida (receivedNumber)".

In order to know whether to display a dot, a dash, or a space/stop image, we need to compare the number received to the values 0, 1, and 2.

- Desde el cajón Lógica de la Caja de Herramientas, arrastra un bloque **'0=0'** hexágono de comparación al Espacio de Trabajo de codificación y suéltalo en el bloque **"if... then"** sustituyendo el valor por defecto de **"cierto"**.
- From the Variables Toolbox drawer, drag a **'receivedNumber'** variable block onto the coding Workspace and drop it into the first slot of the equals comparison block. Leave the default value of 0 in the second slot.

```blocks
radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 0) {

    }
})
```

- From the Basic Toolbox, drag a 'show leds' block to the coding Workspace and drop it under the 'if…then' clause. Then create an image to represent a dot.

```blocks
radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 0) {
        basic.showLeds(`
            . . . . .
            . . # . .
            . # # # .
            . . # . .
            . . . . .
        `)
    }
})
```

### Try it!

Download the program to the micro:bit and press button A on the sending micro:bit. Does this cause a dot to be displayed on the receiving micro:bit?

However, pressing button A again does not appear to send another dot as the image on the receiving micro:bit does not appear to change.

**Challenge question:** How can we fix this? **Answer:** Add a 'pause' block and a 'clear screen' block after the 'show leds' block.

```blocks
radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 0) {
        basic.showLeds(`
            . . . . .
            . . # . .
            . # # # .
            . . # . .
            . . . . .
        `)
        basic.pause(1)
        basic.clearScreen()
    }
})
```

Try running the program again.
Now, each time the sender presses button A, you see a dot appear.

![micro:bit dot display](https://makecode.com/not-found/HEAD/static/courses/csintro/radio/microbit-dot-display.png)

## Code the other received images

Now we need to specify what to display if we receive a 1 or 2.

- In the **'if…then…else'** block, select the plus (+) icon to create an **'else if'** clause.
- Right-click on the equals comparison block in the 'if' clause and select Duplicate to create a copy.
- Then, drag this new equals comparison block into the 'else if' clause.
- Change the value in the second slot of the equals comparison block from 0 to 1. We don't have to test **'receivedNumber'** value in the third **'else'** clause—if the value is not 0 or 1, then it must be 2, since there are only three possibilities.
- From the Basic Toolbox drawer, drag **'show leds'**, **'pause'**, and **'clear screen'** blocks to the **'else if'** and **'else'** clauses. Then, modify the **'show leds'** images displayed:
  - For the **'else if (receivedNumber=1)'**, show a dash.
  - For the **'else'** clause (which is when the **'receivedNumber'** variable equals 2), show a full screen of lights.

## Complete program

```blocks

radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 0) {
        basic.showLeds(`
            . . . . .
            . . # . .
            . # # # .
            . . # . .
            . . . . .
            `)
        basic.pause(100)
        basic.clearScreen()
    }
    if (receivedNumber == 1) {
        basic.showLeds(`
            . . . . .
            . . . . .
            . # # # .
            . . . . .
            . . . . .
            `)
        basic.pause(100)
        basic.clearScreen()
    }
    if (receivedNumber == 2) {
        basic.showLeds(`
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            `)
        basic.pause(100)
        basic.clearScreen()
    }
})
input.onButtonPressed(Button.A, () => {
    radio.sendNumber(0)
})
input.onButtonPressed(Button.B, () => {
    radio.sendNumber(1)
})
input.onButtonPressed(Button.AB, () => {
    radio.sendNumber(2)
})
radio.setGroup(1)
basic.showString("Morse Code")
```

Solution link: [Morse Code](https://makecode.microbit.org/_846Kyk4619yh)

## Try it!

Download your program to the micro:bit. Press buttons A, B, and A+B together on the sending micro:bit to see the associated image on the receiving micro:bit.

## Mod this!

**A final else**

In a conditional that might receive a number of different values, it is good coding practice to have a catch-all 'else' clause. In the example, if any number value other than the ones we coded for (0,1, and 2) is received, we can signal the user that an error has occurred by using a 'show icon' block to display an X.

**The pause and clear screen**

- Rather than repeat these lines of code three times, we can move the **'pause'** block and the **'clear screen'** block outside of the edited **'if…then…else'** block and inside the **'on radio received (receivedNumber)'** block.

Now our program runs as we designed it to run and is more efficient, too! Download the revised program to the micro:bits and test it out.

### Complete program with mod

```blocks
input.onButtonPressed(Button.A, () => {
    radio.sendNumber(0)
})
input.onButtonPressed(Button.B, () => {
    radio.sendNumber(1)
})
input.onButtonPressed(Button.AB, () => {
    radio.sendNumber(2)
})
radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 0) {
        basic.showLeds(`
            . . . . .
            . . # . .
            . # # # .
            . . # . .
            . . . . .
        `)
    } else if (receivedNumber == 1) {
        basic.showLeds(`
            . . . . .
            . . . . .
            . # # # .
            . . . . .
            . . . . .
        `)
    } else if (receivedNumber == 2) {
        basic.showLeds(`
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            # # # # #
        `)
    } else {
        basic.showIcon(IconNames.No)
    }
    basic.pause(100)
    basic.clearScreen()
})
radio.setGroup(1)
basic.showString("Morse Code")
```

Solution link: [Morse Code With Mod](https://makecode.microbit.org/_fWpDXK1hFFC9)

## Knowledge Check

**Questions:**

1. Using the radio blocks, what information can you send to a micro:bit?
2. Why did we all have to set our 'radio set group' block to a default value of 1?
3. Why was it important to set a final catch-all 'else' clause in the conditional you used for the Morse code activity?
4. When editing code, why do we look for lines of code that repeat?

**Answers:**

1. You can send a number, a string, or a string/number combination. You can also give a micro:bit instructions on what to do when it receives a radio message.
2. So that the micro:bits would all be using the same group ID number and could send and receive messages.
3. So that it would display an error message if it received a number value beyond 0, 1, or 2.
4. To make code more efficient and to reduce the number of lines of code needed.

```package
funk
```