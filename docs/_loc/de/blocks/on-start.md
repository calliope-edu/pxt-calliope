# Beim Start

Ein Ereignis, das beim Starten des Programms ausgeführt wird.

```blocks
let thousand = 1000
```

`beim Start` ist ein spezielles Ereignis, das beim Start des Programms vor allen anderen Ereignissen ausgeführt wird. Verwende dieses Ereignis, um das Programm zu initialisieren.

##  #exstart

In diesem Beispiel legt `beim Start` eine Dimmer-Helligkeit für den LED-Bildschirm fest und der Button-Handler zeigt eine Zeichenfolge an.

```blocks
input.onButtonEvent(Button.A, input.buttonEventValue(ButtonEvent.Down), () => {
    basic.showString("Hello!")
})
led.setBrightness(50)
```

## Was ist mit JavaScript?

Wo ist `beim Start`...?

```typescript
function onStart(){} // Ich bin nicht vorhanden
```

`beim Start` ist **nur** im Blockeditor vorhanden. In JavaScript wird der gesamte Code sequenziell von der ersten Zeile an ausgeführt.

## Hey, meine Ereignisse wurden verschoben! #eventsmoved

Wenn wir die Blöcke in JavaScript verwandeln, platzieren wir immer alle Ereignis-Registrierungen (Knöpfe, Schütteln,...) vor dem Ausführen des `beim Start` -Codes.

Wenn ein Block von `beim Start` angehalten wird, haben andere registrierte Ereignisse die Möglichkeit, ebenfalls ausgeführt zu werden.

## #eventorder

## #examples