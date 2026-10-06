# Ereignishandler

Ereignishandler - wie sie funktionieren.

Ein Eventhandler ("Ereignisbehandler") ist Code, der einem bestimmten Ereignis zugeordnet ist, z. B. "Taste A wird gedrückt". Für die Erzeugung (oder Registrierung) der Assoziation zwischen einem Ereignis und einem Ereignisbehandler wird eine Funktion mit dem Namen "on" aufgerufen <event>Nachdem ein Ereignisbehandler bei einem Ereignis registriert wurde, wird immer dann, wenn dieses Ereignis eintritt, der Ereignisbehandlercode ausgeführt.

## Registrieren eines Ereignishandlers

Funktionen mit dem Namen "on <event>" erstellen eine Zuordnung zwischen einem Ereignis und dem Code des Eventhandlers. Zum Beispiel registriert der folgende Code den Eventhandler (der Code zwischen den Schlüsselwörtern `do` und `end`) mit dem Ereignis eines Drucks auf die Taste A:

```blocks
input.onButtonEvent(Button.A, input.buttonEventClick(), () => {
    basic.showString("Hallo", 150)
})
```

Nachdem dieser Code ausgeführt wurde, wird zukünftig immer dann, wenn Taste A gedrückt wird, die Zeichenfolge "Hallo" ausgegeben.

## Eventhandler sind während der gesamten Programmausführung aktiv

Nachdem Sie einen Ereignishandler für ein Ereignis wie oben registriert haben, ist dieser Ereignishandler für die restliche Programmausführung aktiv. Wenn die Zeichenfolge "Hallo" beim jeweiligen Drücken der Taste A nicht mehr ausgegeben werden soll, dann muss folgender Code eingefügt werden:

```blocks
input.onButtonEvent(Button.A, input.buttonEventClick(), () => {
})
```

Der obige Code ist einen Ereignishandler, der jedoch nichts mit dem Ereignis beim Drücken von Taste A macht.

## Pro Ereignis gibt es nur einen Eventhandler

Das obige Beispiel veranschaulicht auch, dass für jedes Ereignis nur ein Ereignishandler vorhanden ist. Was ist das Ergebnis des folgenden Codes?

```blocks
input.onButtonEvent(Button.A, input.buttonEventClick(), () => {
    basic.showString("Hallo", 150)
})
input.onButtonEvent(Button.A, input.buttonEventClick(), () => {
    basic.showString("Bis bald", 150)
})
```

Die Antwort ist, dass, wenn Button A gedrückt wird, die Zeichenfolge "Bis bald" ausgegeben wird. Wenn sowohl die Zeichenfolgen "Hallo" als auch "Bis bald" ausgegeben werden sollen, muss der Code wie folgt geschrieben werden:

```blocks
input.onButtonEvent(Button.A, input.buttonEventClick(), () => {
    basic.showString("Hallo", 150)
    basic.showString("Bis bald", 150)
})
```

## Mehr erfahren

Um mehr darüber zu erfahren, wie eine Warteschlange für @boardname@ aufgebaut wird und wie Eventhandler geplant werden, siehe [der @boardname@ - ein reaktives System](/device/reactive)

## siehe auch

[on button pressed](/reference/input/on-button-pressed), [on pin up](/reference/input/on-pin-pressed), [on shake](/reference/input/on-gesture)