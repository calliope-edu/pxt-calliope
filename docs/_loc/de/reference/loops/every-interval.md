# alle... Intervall

Führe einen Teil des Programms in einem Zeitintervall kontinuierlich in einer Schleife aus.

```sig
loops.everyInterval(500, function () {})
```

Wenn du einen Code kontinuierlich in einem Zeitintervall ausführen möchtest, dann verwende eine **alle...** Schleife. Du legst fest, wie lange die Schleife wartet, bevor der Code innerhalb der Schleife wieder ausgeführt wird. Dies ähnelt einer [dauerhaft](/reference/basic/forever) Schleife, da sie kontinuierlich läuft. Allerdings mit dem Unterschied, dass ein Zeitintervall gesetzt ist, bevor die Schleife das nächste Mal läuft. Diese Schleife ist nützlich, wenn du möchtest, dass ein Teil des Programmcodes nach einem _Zeitplan_ ausgeführt wird.

## Parameter

* **Intervall**: eine [Zahl](/types/number), welche die Zeit in Millisekunden bestimmt, die gewartet werden soll, bevor die Schleife wieder ausgeführt wird.

### ~ reminder

#### Ereignisbasierte Schleifen

Sowohl die **dauerhaft**-Schleife als auch die **alle...**-Schleife sind _ereignisbasierte_-Schleifen, in denen der Code als Teil einer Funktion ausgeführt wird. Diese unterscheiden sich von [für](/blocks/loops/for) und [während](/blocks/loops/while) Schleifen. Diese Schleifen sind Teil der Programmiersprache und können [pause](/blocks/loops/break) und [weiter](/blocks/loops/continue) Anweisungen enthalten. Du kannst **pause** oder **weiter** NICHT in einer **dauerhaft** Schleife oder einer **alle...** Schleife verwenden.

### ~

## Beispiel

Alle `200` Millisekunden wird überprüft, ob entweder die **A** oder **B** Taste gedrückt wird. Falls dieses Ereignis eintritt, wird auf der LED-Matrix angezeigt welcher Knopf gedrückt wurde.

```blocks
loops.everyInterval(200, function () {
    if (input.buttonIsPressed(Button.A)) {
        basic.showString("A")
    } else if (input.buttonIsPressed(Button.B)) {
        basic.showString("B")
    } else {
        basic.clearScreen()
    }
})
```

## Siehe auch

[dauerhaft](/reference/basic/forever)