# sende String

Sendet eine Zeichenkette an andere @boardname@s über Funk. Die maximale Länge beträgt 19 Zeichen.

```sig
radio.sendString("hi!")
```

## Parameter

* **MSG**: ist ein [String](/types/string), der über Funk gesendet werden soll.

## ~ hint

Watch this video to see how the radio hardware works on the @boardname@:

https://www.youtube.com/watch?v=Re3H2ISfQE8

## ~

## Example: Two-way radio

Wenn Du dieses Programm auf zwei oder mehr @boardname@s lädst kannst Du ein Codewort von einem die anderen senden, indem Du den Knopf `A` drückst. Die anderen @boardname@s erhalten das Codewort und zeigen es dann an.

```blocks
radio.setGroup(1)
input.onButtonEvent(Button.A, input.buttonEventClick(), () => {
    radio.sendString("Codeword: TRIMARAN")
    basic.showString("SENT");
})
radio.onReceivedString(function (receivedString) {
    basic.showString(receivedString);
})
```

## ~hint

Ein Funkgerät, das sowohl übertragen als auch empfangen kann, wird als *Transceiver* bezeichnet.

## ~

## Siehe auch

[on received string](/reference/radio/on-received-string)

```package
Funk
```