# Taste wird gedrückt

Prüft, ob gerade eine Taste gedrückt wird. Der @boardname@ hat zwei programmierbare Tasten: Knopf `A` und Knopf `B`.

```sig
input.buttonIsPressed(Button.A);
```

## Parameter

* `button` ist ein [String](/types/string). Du kannst `A` darin speichern, um die linke Taste zu prüfen bzw. `B`, um die rechte Taste zu überprüfen oder `A+B`, um beide gleichzeitig zu prüfen.

## Rückgabewert

* ein [boolescher](/blocks/logic/boolean) Wert, der `wahr` ist, wenn der Knopf gedrückt wird und `falsch` wenn er nicht gedrückt wird.

## Beispiel

Dieses Programm verwendet eine [wenn](/blocks/logic/if)-Anweisung, um ein Teil des Programms auszuführen, wenn der Knopf `A` gedrückt wird und ein anderes Teil, wenn er nicht gedrückt wird.

```blocks
basic.forever(() => {
    let pressed = input.buttonIsPressed(Button.A)
    if (pressed) {
        // dieser Teil wird ausgeführt, wenn die Taste A gedrückt ist
        basic.showNumber(1)
    } else {
        // dieser Teil wird ausgeführt, wenn die Taste A nicht gedrückt ist
        basic.showNumber(0)
    }
})
```

Erfahre in diesem Video, wie die Eingabe durch Knöpfe den Calliope mini steuern können.

https://www.youtube.com/watch?v=t_Qujjd_38o

## Siehe auch

[Knopf gedrückt](/reference/input/on-button-pressed), [wenn](/blocks/logic/if), [dauerhaft](/reference/basic/forever)