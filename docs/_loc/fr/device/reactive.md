# The Calliope mini - a reactive system

## Computing systems

What sort of a *computing system* is the Calliope mini?

### ~indice

#### Types of computing systems

There are different types of computing systems, to address different kinds of problems that arise in practice: *transaction processing systems* are used by banks to handle huge numbers of financial transactions by their customers; *distributed systems* make a set of networked computers appear as one big computer (like Google’s search engine); there are also *parallel systems*, such as graphic cards, which perform a huge number of primitive operations simultaneously, using a great number of small processing cores.

### ~

The Calliope mini is a *reactive system* – it reacts continuously to external events, such as a person pressing the **A** button of the Calliope mini or shaking the device. The reaction to an event may be to perform a computation, update variables, and change the display.  After the device reacts to an event, it is ready to react to the next one. If this sounds like a computer game, that’s because most computer games are reactive systems too!

## Responsiveness

We want reactive systems to be responsive, which means to react in a timely manner to events. For example, when you play a computer game, it’s frustrating if you press a button to make a character jump, but it doesn’t immediately jump. A delay in reacting, or lack of responsiveness, can be the difference between life and death, both in the real and virtual worlds.

Let’s consider a simple example: you want to program your Calliope mini to accurately count the number of times the **A** button has been pressed and continuously display the current count on the 5x5 [LED screen](/device/screen).   Étant donné que l'écran LED est petit, nous ne pouvons afficher qu'un seul chiffre d'un nombre à la fois. La fonction [Afficher le numéro](/reference/basic/show-number) fera défiler les chiffres d'un numéro sur l'écran afin que vous puissiez le lire.

Disons que le compte actuel est de 42 et que le nombre 42 défile sur l’écran LED. Cela signifie qu'un code est en cours d'exécution pour effectuer le défilement. So, what should happen if you press the **A** button during the scroll? Ce serait une mauvaise idée d'ignorer l'appui sur le bouton, donc un code devrait enregistrer l'occurrence de l'appui sur le bouton. Mais nous venons de dire qu'il existe déjà un code en cours d'exécution pour faire défiler le numéro 42! Si nous attendons que le défilement du code 42 soit terminé pour rechercher une pression sur un bouton, nous manquerons la pression sur le bouton. Nous voulons éviter ce genre de manque de réactivité.

## Concurrency

To be responsive, a reactive system needs to be able to do several things at the same time (concurrently), just like you can.  But the Calliope mini only has one CPU for executing your program, which means it can only execute one program instruction at a time. Il peut cependant exécuter des millions d’instructions en une seule seconde. Cela montre la voie vers une solution.

Pensez à la façon dont fonctionne un projecteur de cinéma: il ne projette que 24 images par seconde, mais cela suffit à donner l’illusion d’un mouvement fluide sur l’écran. The Calliope mini can execute millions of instructions per second, so it seems quite possible for the device to both to smoothly scroll the number 42 across the LED screen while looking for button presses and counting them.

Réfléchissons à trois séquences d’instructions:

* Sequence **S1**: contains the instructions (let’s say several hundred thousand or so) that scroll the number 42 across the LED screen.
* Sequence **S2**: contains a few instructions to check if button **A** is pressed.
* Sequence **S3**: contains a few instructions to increment a counter.

In order to be responsive, we would like to *interrupt* the execution of sequence **S1** *periodically* to execute the sequence **S2**, which will check if button **A** is pressed, which looks like:

![Execution sequence diagram: S1 and S2](https://cdn.makecode.com/blob/d0b9aaebcb5c60acc8c90736f608cbf6ab3c1d31/static/mb/device/reactive-0.png)

The result is that it takes sequence **S1** a little longer to complete, due to the interruptions to execute sequence **S2**, but we are checking often enough to detect a press of button **A** . When **S2** detects a press of button **A**, then the sequence **S3** can be executed before **S1** resumes:

![Execution sequence diagram: S1 and S2 with interrupt and one S3 slice](https://cdn.makecode.com/blob/00c61ffb633cf9f92597b149c4bf2207364de3a8/static/mb/device/reactive-1.png)

Comme nous le verrons bientôt, il existe d’autres choix quant à la manière dont les séquences peuvent être ordonnées pour obtenir le résultat souhaité.

## The Calliope mini scheduler and queuing up subprograms

The Calliope mini’s *scheduler* provides the capability to concurrently execute different code sequences, relieving us of a lot of low-level programming.   In fact, scheduling is so useful that it is a part of every *operating system*!

The first job of the scheduler is to allow multiple *subprograms* to be queued up for later execution. Pour nos besoins, un sous-programme est simplement une instruction ou une séquence d’instructions dans le contexte d’un programme plus vaste. Considérez le programme ci-dessous pour compter les pressions sur les boutons.

```typescript-ignore
let count = 0

input.onButtonEvent(Button.A, input.buttonEventValue(ButtonEvent.Down), () => {
    count++;
})

basic.forever(() => {
    basic.showNumber(count)
})
```

The program above contains three statements that execute in order from top to bottom. The first statement initializes the global variable `count` to zero.

```typescript-ignore
// statement 1
let count = 0
```

The second statement informs the scheduler that on each and every event of the **A** button being pressed, a subprogram (called the event handler) should be queued for execution. The event handler code is contained within the braces `{...}`; it increments the global variable `count` by one.

```typescript-ignore
// statement 1
let count = 0
// statement 2
input.onButtonEvent(Button.A, input.buttonEventValue(ButtonEvent.Down), () => {
    count++;
})
```

The third statement queues a `forever` loop for later execution by the scheduler; the body of this loop (also inside the braces `{...}`) displays the current value of global variable `count` on the LED screen.

```typescript-ignore
// statement 1
let count = 0
// statement 2
input.onButtonEvent(Button.A, input.buttonEventValue(ButtonEvent.Down), () => {
    count++;
})
// statement 3
basic.forever(() => {
    basic.showNumber(count)
})
```

There are no more statements after the execution of these three statements, but this is not the end of program execution! That’s because the program queued the `forever` loop for execution by the scheduler (and registered an event handler for presses of button A).

The second job of the scheduler is to periodically interrupt execution to read (poll) the various inputs to the Calliope mini (the buttons, pins, etc.) and fire off events (such as “button A pressed”). Recall that the firing of an event causes the event handler subprogram associated with that event to be queued for later execution. The scheduler uses a timer built into the Calliope mini hardware to interrupt execution every 6 milliseconds and poll the inputs, which is more than fast enough to catch the quickest press of a button.

## Passation de contrôle coopérative

Comment la boucle `forever` parvient-elle à démarrer son exécution? De plus, une fois que la boucle `forever` est en cours d'exécution, comment un autre sous-programme (comme le gestionnaire d'événements qui incrémente le compte) peut-il avoir une chance de s'exécuter?

The answer is "cooperation" and "passing". Think of a football team doing a drill – there is one ball and each footballer gets to dribble the ball for a certain number of touches, after which they pass to another footballer. Un footballeur qui ne passe jamais empêche tous les autres footballeurs de dribbler. Un footballeur coopératif passe toujours le ballon à un autre footballeur après avoir effectué quelques touches.

Si vous ne l’aviez pas déjà deviné, un footballeur représente un sous-programme et le dribble du ballon correspond à l’exécution de ce sous-programme. Un seul sous-programme peut être exécuté à la fois, car il n'y a qu'une seule boule (processeur). Footballer Alice passing the ball to footballer Bob corresponds to stopping execution of Alice’s subprogram (and remembering where it stopped) and starting/resuming execution of Bob’s subprogram.

We will call this “passing control of execution” rather than “passing the ball”.  However, in the world of the Calliope mini, the concurrently executing subprograms are not aware of each other, so they don’t actually pass control directly to one another.  Rather they pass control of execution back to the scheduler and the scheduler determines the subprogram to pass control to next.  The programmer inserts a call to the `pause` function to indicate a point in the subprogram where control of execution passes to the scheduler. De plus, lorsqu’un sous-programme termine son exécution, le contrôle passe au planificateur.

Examinons l’implémentation de la fonction `basic.forever` pour voir un exemple de planification coopérative:

```typescript-ignore
function forever_(body: () => void) {
    control.inBackground(() => {
        while(true) {
            body()
            basic.pause(20)
        }
    })
}
```

The `forever` loop actually is a function that takes a subprogram (another function) as a parameter. The function uses the `control.inBackground` function of the Calliope mini runtime to queue a `while true` loop for execution by the scheduler. La boucle while comporte deux instructions. La première instruction exécute le sous-programme représenté par le paramètre `body`. The second statement passes control to the scheduler (requesting to “sleep” for 20 milliseconds).

Though the `while true` loop will repeatedly execute the body subprogram, between each execution of the body it will permit the scheduler to execute other subprograms. If the while loop did not contain the call to `pause`, then once control passed into the while loop, it would never pass back to the scheduler and no other subprogram would be able to execute (unless the body subprogram contained a call to `pause` itself).

### ~indice

#### Pauses within blocks

Certain blocks may contain a `pause` within their code to allow execution control to return to the scheduler. As an example, when a device is interacting with the code in a block, control can return to the scheduler to allow other subprograms run while that device is taking time to respond.

### ~

## Round-robin scheduling

Nous arrivons maintenant à la troisième et dernière tâche du planificateur, qui consiste à déterminer à quel sous-programme passer le contrôle ensuite. The scheduler uses two queues to perform this task, the sleep queue and the run queue. The sleep queue contains the subprograms that have called the pause function and still have time left to sleep. The run queue contains all the non-sleeping subprograms, such as the event handlers queued by the firing of an event.

The scheduler  moves the subprogram that has just paused into the sleep queue and then removes the subprogram at the head of the run queue and resumes its execution. Once a subprogram’s sleep period is over, the scheduler moves it from the sleep queue to the back  of the run queue.

The property of such round-robin scheduling is that under the assumption that every subprogram periodically enters the sleep queue, then every subprogram will periodically get a chance to execute.

## Putting it all together

Let’s go back to the `count button presses` program and revisit its execution based on what we have learned about the Calliope mini scheduler. Comme détaillé précédemment, le programme exécute trois étapes pour:

1. Initialiser la variable globale `count` à zéro
2. Set up the event handler for each press of button **A**
3. Queue the forever loop to the run queue

The program then ends execution and control passes back to the scheduler. Let’s assume the user has not pressed any buttons . The scheduler finds the `forever` loop in the run queue and passes control to it. The loop first calls `basic.showNumber(0)`. In the diagram below, we use "Show 0" to refer to the execution of this function:

![Execution sequence diagram: display loop with increment and interrupt](https://cdn.makecode.com/blob/f9f6f4b7a6b3de5f3586af9ddf365e7ab70cd371/static/mb/device/reactive-3.png)


While "Show 0" (the blue sequence) is running, periodic interrupts by the scheduler (every 6 milliseconds) poll for button presses and queue an event handler for each press of button **A**. Let’s say that one button press takes place during this time, as shown above. This will cause an event handler (labelled "inc") to be queued for later execution by the scheduler. Once the "Show 0" has completed, the loop then calls `basic.pause(20)` to put the forever loop to sleep for 20 milliseconds and give the scheduler an opportunity to run any newly queued event handler. Control passes to the "inc" event handler which will increment the global variable `count` from 0 to 1 and then complete, returning control to the scheduler. At some point, the `forever` loop moves from the sleep queue to the run queue; the `forever` loop then will resume and call `basic.showNumber(1)`.

## Final comments

Through this example, we have seen that the Calliope mini scheduler enables you to create a program that is composed of concurrent subprograms. In essence, the programmer needs to only think about the concurrent subprograms cooperatively passing control back to the scheduler, making sure no subprogram hogs control (or “dribbles the ball without passing”) for too long. While a subprogram runs, the scheduler polls the buttons and other IO peripherals at a high frequency in order to fire off events and queue event handlers for later execution, but this is invisible to the programmer.

As a result, you can easily add a new capability to the Calliope mini by just adding a new subprogram. For example, if you want to add a reset feature to the counter program, all you need to do is add a new event handler for a press of button **B** that sets the global variable "count" to zero, as shown below:

```typescript-ignore
let count = 0

input.onButtonEvent(Button.A, input.buttonEventValue(ButtonEvent.Down), () => {
    count = count + 1
})

basic.forever(() => {
    basic.showNumber(count)
})

input.onButtonEvent(Button.B, input.buttonEventValue(ButtonEvent.Down), () => {
    count = 0
})
```