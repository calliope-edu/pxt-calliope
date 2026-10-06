# write Line

Schreibe einen String auf den [seriellen](/device/serial) Port und beginne eine neue Textzeile, indem Du `\r\n` schreibst.

```sig
serial.writeLine("");
```

## Parameter

* `Text` ist die</a> Zeichenfolge</1>, die auf den seriellen Port geschrieben werden soll

## Beispiele

### Simple serial

Schreibe wiederholt das Wort `BOFFO` auf den seriellen Port.

```blocks
basic.forever(() => {
    serial.writeLine("BOFFO");
    basic.pause(5000);
});
```

### Streaming-Inhalte

Prüfe den [Kompasskurs](/reference/input/compass-heading) und zeige die Richtung auf dem Bildschirm an. Sende außerdem die Richtung und die Gradzahl an den seriellen Port.

```blocks
let degrees = 0
let direction = ""
basic.forever(() => {
    degrees = input.compassHeading()
    if (degrees < 45) {
        basic.showIcon(IconNames.ArrowNorth)
        direction = "Norden"
    } else if (degrees < 135) {
        basic.showIcon(IconNames.ArrowEast)
        direction = "Osten"
    } else if (degrees < 225) {
        basic.showIcon(IconNames.ArrowSouth)
        direction = "Sueden"
    } else if (degrees < 315) {
        basic.showIcon(IconNames.ArrowWest)
        direction = "Westen"
    } else {
        basic.showIcon(IconNames.ArrowNorth)
        direction = "Norden"
    }
    serial.writeLine(direction + " @ " + degrees + " degrees")
    basic.pause(500)
})
```

## Siehe auch

[serial](/device/serial), [write number](/reference/serial/write-number), [write string](/reference/serial/write-string), [write value](/reference/serial/write-value)