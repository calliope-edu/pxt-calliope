# Tableau de bord radio

```typescript
/**
 * Radio monitoring dashboard
 * 
 * Each radio client is represented by a dot on the screen.
 * Once a client is registered, it will stay at the same pixel location
 * forever.
 * 
 * Radio clients can simply send a number (between 0..255) on group 4.
 * They must transmit the serial number using ``radio.setTransmitSerialNumber(true)``
 * 
 * The received number is used to set the LED brightness for that client.
 * 
 * If the radio packet is not received for 10sec, the LED starts blinking.
 */
const deadPing = 20000;
const lostPing = 10000;

interface Client {
    // client serial id
    id: number;
    // sprite on screen
    sprite: game.LedSprite;
    // last ping received
    ping: number;
}

const clients: Client[] = [];

/* sprite d'allocation paresseuse */
function getClient(id: number): Client {
    // needs an id to track radio client's identity
    if (!id)
        return undefined;

    // look for cached clients
    for (const client of clients)
        if (client.id == id)
            return client;
    const n = clients.length;
    if (n == 24) // out of pixels
        return undefined;
    const client: Client = {
        id: id,
        sprite: game.createSprite(n % 5, n / 5),
        ping: input.runningTime()
    }
    clients.push(client);
    return client;
}

// stocker les données reçues par les clients
radio.onReceivedNumber(function (receivedNumber) {
    const serialNumber = radio.receivedPacket(RadioPacketProperty.SerialNumber)
    const client = getClient(serialNumber);
    if (!client)
        return;

    client.ping = input.runningTime()
    client.sprite.setBrightness(Math.max(1, receivedNumber & 0xff));
})

// surveille les sprites et commence à clignoter lorsqu'aucun paquet n'est reçu
basic.forever(() => {
    const now = input.runningTime()
    for (const client of clients) {
        // lost signal starts blinking
        const lastPing = now - client.ping;
        if (lastPing > deadPing) {
            client.sprite.setBlink(0)
            client.sprite.setBrightness(0)
        }
        else if (lastPing > lostPing)
            client.sprite.setBlink(500);
        else
            client.sprite.setBlink(0);
    }
    basic.pause(500)
})

// configurez la radio et démarrez!
radio.setGroup(4)
game.addScore(1)
```

```package
funk
```