# event handler

Event handlers - how they work.

An event handler is code that is associated with a particular event, such as "button A pressed". Crei (o registri) l'associazione tra un evento o un gestore dell'evento richiamando una funzione chiamata "on <event>". Dopo aver registrato un gestore evento con un evento, in qualsiasi momento si verificherà l'evento, sarà eseguito il codice del gestore dell'evento.

## Registrare un gestore eventi

Functions named "on <event>" create an association between an event and the event handler code. Per esempio, il codice seguente registra il gestore dell'evento (il codice tra le parole chiave `do` e `end`) con l'evento di una pressione del pulsante A:

```blocks
input.onButtonEvent(Button.A, input.buttonEventClick(), () => {
    basic.showString("hello", 150)
})
```

Dopo questo aver eseguito il codice, allora ogni volta che il pulsante A viene premuto in futuro, la stringa "ciao" sarà stampata.

## Event handlers are active for the entire program execution

Una volta che hai registrato un gestore evento per un evento, come sopra, quel gestore evento è attivo per il resto dell'esecuzione del programma. Se vuoi interrompere la stringa "ciao" dalla stampa ogni volta che viene premuto il pulsante A allora devi arrangiare il codice seguente per eseguire:

```blocks
input.onButtonEvent(Button.A, input.buttonEventClick(), () => {
})
```

The above code associated an event handler that does nothing with the event of a press of button A.

## There is only one event handler per event

The above example also illustrates that there is only one event handler for each event. What is the result of the following code?

```blocks
input.onButtonEvent(Button.A, input.buttonEventClick(), () => {
    basic.showString("hello", 150)
})
input.onButtonEvent(Button.A, input.buttonEventClick(), () => {
    basic.showString("goodbye", 150)
})
```

La risposta è che ogni volta che viene premuto il pulsante A, la stringa "arrivederci" sarà stampata. Se vuoi che sia "ciao" che "arrivederci" siano stampati, devi scrivere il codice come segue:

```blocks
input.onButtonEvent(Button.A, input.buttonEventClick(), () => {
    basic.showString("hello", 150)
    basic.showString("goodbye", 150)
})
```

## To learn more

To learn more about how the @boardname@ queues up and schedules event handlers, see [the @boardname@ - a reactive system](/device/reactive)

## vedi anche

[on button pressed](/reference/input/on-button-pressed), [on pin up](/reference/input/on-pin-pressed), [on shake](/reference/input/on-gesture)