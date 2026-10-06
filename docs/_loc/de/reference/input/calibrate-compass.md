# Kompass kalibrieren

Führt die Sequenz der Kompasskalibrierung aus.

```sig
input.calibrateCompass();
```

## Kalibrierung

Die Kalibrierung wird dich auffordern, einen Kreis zu ziehen oder durch Kippen und Drehen des @boardname@ die LED-Matrix zu befüllen.

Die Kompass-Kalibrierung wird im @boardname@ gespeichert. Beim nächsten Drücken der Zurücksetzen-Taste oder beim Ausschalten bleibt die Kalibrierung gespeichert.

Wenn du ein neues Programm auf den @boardname@ über USB kopierst, wird dieser Speicher gelöscht und es muss neu kalibriert werden.

Wenn man den Kompass in der Nähe von Metall kalibriert oder benutzt, kann es sein, dass der @boardname@ dadurch verwirrt wird.

## Beispiel

Dieses Beispiel führt die Kalibrierung durch, wenn der Benutzer die Tasten **A+B** drückt.

```blocks
input.onButtonEvent(Button.AB, input.buttonEventClick(), () => {
    input.calibrateCompass();
})
```

## Siehe auch

[Kompass Richtung](/reference/input/compass-heading)