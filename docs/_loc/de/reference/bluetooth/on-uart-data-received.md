# Bluetooth wenn UART-Daten empfangen

Führt einen Code in einem Fall aus, wenn ein Trennzeichen in den empfangenen Daten übereinstimmt.

```sig
bluetooth.onUartDataReceived(serial.delimiters(Delimiters.NewLine), function() {})
```

## Parameter

* **delimiters**: eine [Zeichenkette](/types/string), die die Trennzeichen enthält, nach denen in den empfangenen Daten gesucht werden soll.

### ~ hint

#### Trennzeichen

Trennzeichen sind Zeichen in einem empfangenen Datenstring, die den String in kleinere Strings teilen, um separate Datenelemente zu bilden.

Obwohl mehrere Trennzeichen in der Zeichenkette **delimiters** gesetzt werden können, ist es üblich, empfangene Daten mit nur einem Trennzeichen zu trennen, wie zum Beispiel einem Komma:

`"data1,data2,data3,data4"`

So können Sie ein Trennzeichen angeben, indem Sie `||serial:Serielle Trennzeichen||` verwenden, das für Sie eine Zeichenkette mit einem einzelnen Trennzeichen erstellt...

```block
bluetooth.onUartDataReceived(serial.delimiters(Delimiters.Comma), function () {
})
```
Oder vielleicht...

```block
let delim = serial.delimiters(Delimiters.NewLine)
basic.showString(bluetooth.uartReadUntil(delim))
```

### ~

## Beispiel

Lese die durch ein Komma (`,`) getrennten Datenelemente:

```blocks
bluetooth.onUartDataReceived(serial.delimiters(Delimiters.Comma), function () {
    basic.showString(bluetooth.uartReadUntil(serial.delimiters(Delimiters.Space)))
})
```

```package
Bluetooth
```