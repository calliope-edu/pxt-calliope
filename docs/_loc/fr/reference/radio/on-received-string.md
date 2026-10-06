# on Received String

Run part of a program when the @boardname@ receives a [string](/types/string) over `radio`.

```sig
radio.onReceivedString(function (receivedString) {})
```

## Paramètres

* **receivedString**: The [string](/types/string) that was sent in this packet or the empty string if this packet did not contain a string. See [send string](/reference/radio/send-string) and [send value](/reference/radio/send-value)

### ~ indice

#### @boardname@ radio

Watch this video to see how the radio hardware works on the @boardname@:

https://www.youtube.com/watch?v=Re3H2ISfQE8

### ~

## Exemple

This program continuously sends a cheerful message. It also receives a messages from nearby @boardname@s. It shows these messages on the screen.

```blocks
radio.setGroup(1)
basic.forever(() => {
    radio.sendString("I'm happy");
})
radio.onReceivedString(function (receivedString) {
    basic.showString(receivedString)
})
```

## Dépannage

The `||radio:on received string||` event can only be created once, due to the hardware restrictions.

The radio set group might need to be set, synchronized, before the radio events will function.

## Voir Aussi

[on received number](/reference/radio/on-received-number), [received packet](/reference/radio/received-packet), [send number](/reference/radio/send-number), [send string](/reference/radio/send-string), [send value](/reference/radio/send-value), [set group](/reference/radio/set-group)

```package
funk
```