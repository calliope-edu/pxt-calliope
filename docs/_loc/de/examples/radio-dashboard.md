# Funk-Dashboard

```typescript
/**
 * Funküberwachungs-Dashboard
 * 
 * Jeder Radio-Client wird durch einen Punkt auf dem Bildschirm repräsentiert.
 * Sobald ein Client registriert ist, bleibt er am gleichen Pixel-Standort
 * für immer.
 * 
 * Radioclients können einfach eine Nummer (zwischen 0..255) auf Gruppe 4 senden.
 * Sie müssen die Seriennummer mit ''radio.setTransmitSerialNumber(true)'' übertragen.
 * 
 * Die empfangene Nummer wird verwendet, um die LED-Helligkeit für diesen Client einzustellen.
 * 
 * Wenn das Funkpaket 10Sekunden lang nicht empfangen wird, beginnt die LED zu blinken.
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

/* lazy allocate sprite */
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

// store data received by clients
radio.onReceivedNumber(function (receivedNumber) {
    const serialNumber = radio.receivedPacket(RadioPacketProperty.SerialNumber)
    const client = getClient(serialNumber);
    if (!client)
        return;

    client.ping = input.runningTime()
    client.sprite.setBrightness(Math.max(1, receivedNumber & 0xff));
})

// monitor the sprites and start blinking when no packet is received
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

// setup the radio and start!
radio.setGroup(4)
game.addScore(1)
```

```package
Funk
```