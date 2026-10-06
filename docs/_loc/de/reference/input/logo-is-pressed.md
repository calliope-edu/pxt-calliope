# Logo ist gedrückt

Überprüfe, ob das @boardname@ Logo gerade gedrückt wird.

```sig
input.logoIsPressed()
```

## ~ reminder

![works with Calliope mini V3 only image](https://cdn.makecode.com/blob/9ed1220962526bdadb378e487c0f4879cd2aebd3/static/v2/v2-only.png)

Dieser Block benötigt den [Calliope mini V3](/device/v2). Wenn du diesen Block mit einem vorherigen Calliope Miniboard verwendest, siehst du den **927** Fehlercode auf dem Bildschirm.

## ~

Das Logo auf dem @boardname@ funktioniert wie ein Touch-Pin. Du kannst überprüfen, ob das Logo gerade gedrückt wird oder nicht. Du verwendest den [booleschen](/types/boolean) Wert für den Status des Logo-Drucks, um eine logische Entscheidung in deinem Programm zu treffen.

## Rückgabewert

* ein [boolescher](types/boolean) Wert, der `true` ist, wenn das Logo gedrückt wird, `false`, wenn das Logo nicht gedrückt wird.

## Beispiel

Zeige ein Icon auf den LEDs an, solange das Logo gedrückt wird.

```blocks
basic.forever(function () {
    if (input.logoIsPressed()) {
        basic.showIcon(IconNames.Diamond)
    } else {
        basic.clearScreen()
    }
})
```

## Siehe auch

[Calliope mini V2](/device/v2), [on logo event](/reference/input/on-logo-event), [pin is pressed](/referene/inpu/pin-is-pressed), [touch set mode](/referene/inpu/touch-set-mode)