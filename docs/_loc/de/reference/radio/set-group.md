# Datenpakete festlegen

Set the group ID for sending and receiving messages over radio.

```sig
radio.setGroup(0)
```

A group is like a cable channel (a @boardname@ can only send or receive date in one group at a time) and the group ID is like the channel number.

If you load the same program onto two different @boardname@s, they will be able to talk to each other because they will have the same group ID.

## Parameter

* **id**: a radio group ID [number](/types/number) from `0` to `255`.

### ~ reminder

#### Der Breitband-Netz-Basis-Funkstandard

If you haven't set a radio group for the @boardname@, it will use the default group number of **0**.

### ~

### ~ alert

#### Simulator

Diese Funktion funktioniert nur auf dem @boardname@, nicht in Browsern.

### ~

## Beispiel

Set a radio group to send and receive a [number](/types/number) between @boardname@s.

```blocks
radio.setGroup(1)
radio.onReceivedNumber(function (receivedNumber) {
    basic.showNumber(0)
    basic.clearScreen()
})
input.onButtonPressed(Button.A, function () {
    radio.sendNumber(0)
})
```

## Siehe auch

[wenn Zahl empfangen](/reference/radio/on-received-number), [wenn Text empfangen](/reference/radio/on-received-string), [wenn Wert erhaltenen](/reference/radio/on-received-value), [Zahl senden](/reference/radio/send-number), [Wert senden](/reference/radio/send-value), [Text senden](/reference/radio/send-string)

```package
Funk
```