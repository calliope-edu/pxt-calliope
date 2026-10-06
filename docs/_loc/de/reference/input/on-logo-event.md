# Ereignis beim Logo

Führe Code in deinem Programm aus, wenn das Logo auf dem @boardname@ gedrückt, berührt oder losgelassen wird.

```sig
input.onLogoEvent(TouchButtonEvent.Pressed, function () {})
```

### ~ reminder

![works with Calliope mini V3 only image](https://cdn.makecode.com/blob/9ed1220962526bdadb378e487c0f4879cd2aebd3/static/v2/v2-only.png)

Dieser Block benötigt den [Calliope mini V3](/device/v2). Wenn du diesen Block mit einem vorherigen Calliope Miniboard verwendest, siehst du den **927** Fehlercode auf dem Bildschirm.

### ~

Das Logo auf dem @boardname@ funktioniert wie ein Touch-Pin. Das Logo wird deine Berührung erkennen. Du kannst Code innerhalb eines Ereignisses haben, der ausgeführt wird, wenn das Logo gedrückt wird.

## Parameter

* **aktion**: das Logo-Ereignis, für das dein Code ausgeführt werden soll. Die Ereignisse sind `freigegeben`, `gedrückt`, `berührt` oder `lang gedrückt`.

## Beispiel

Zeige eine Nachricht auf den LEDs an, wenn das Logo auf dem @boardname@ gedrückt wird.

```blocks
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    basic.showString("Ich wurde gedrückt!")
})
})
```

## Siehe auch

[Calliope Mini V2](/device/v2), [Logo gedrückt](/reference/input/logo-is-pressed), [wenn Pin gedrückt](/reference/input/on-logo-released), [Berührungsmodus festlegen](/referene/inpu/touch-set-mode)