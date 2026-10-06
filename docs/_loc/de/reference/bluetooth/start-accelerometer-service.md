# Bluetooth-Beschleunigungssensor-Dienst

## ~hint

![](https://cdn.makecode.com/blob/5479e652051b327fa86ef770a2e277dc72052dd2/static/bluetooth/Bluetooth_SIG.png)

Um einen der Bluetooth-"Dienste" des @boardname@ mit einem anderen Gerät wie einem Smartphone zu nutzen, muss es zunächst [mit dem @boardname@ gekoppelt werden](/reference/bluetooth/bluetooth-pairing). Nach dem Koppeln kann das andere Gerät eine Verbindung zum @boardname@ herstellen und Daten über viele der @boardname@-Funktionen austauschen.

## ~

Der Bluetooth-Beschleunigungssensor ermöglicht einem anderen Gerät wie einem Smartphone das drahtlose Empfangen von Daten vom Beschleunigungsmesser des @boardname@. Ein Beschleunigungsmesser erkennt Bewegung. Genauer gesagt misst er die Beschleunigung in einer oder mehreren von drei Richtungen, die wir X, Y und Z nennen.

Mit dem Bluetooth-Beschleunigungsmesser-Dienst kannst du zum Beispiel eine Smartphone-Anwendung erstellen, die ein lautes Geräusch macht, wenn dein @boardname@ (oder das Wichtige, was du ihm beigefügt hast) verschoben wird. Oder du kannst mit deinem @boardname@ die Bewegung eines Cartooncharakters in einem Spiel auf deinem Smartphone steuern, indem du den @boardname@ in die Richtung kippst, in die du den Charakter bewegen möchtest.

Auf dem @boardname@ wird kein zusätzlicher Code benötigt, um den Bluetooth-Beschleunigungssensor von einem anderen Gerät zu verwenden.

```sig
bluetooth.startAccelerometerService();
```

## Beispiel: Starten des Bluetooth-Magnetometer-Dienstes

Der folgende Code zeigt den Start des Bluetooth-Beschleunigungsmesserdienstes:

```blocks
bluetooth.startAccelerometerService();
```

## Video - Beschleunigungsdienst Demo - Startet um 0:18 Uhr

http://www.youtube.com/watch?v=aep_GVowKfs#t=18s

## Fortgeschritten

Weiterführende Informationen zum @boardname@ Bluetooth UART-Dienst, einschließlich Informationen zur Verwendung eines Smartphones, findet man in der [@boardname@ technischen Dokumentation der Universität Lancaster](http://lancaster-university.github.io/microbit-docs/ble/accelerometer-service/)

## Siehe auch

[Über Bluetooth](/reference/bluetooth/about-bluetooth), [@boardname@ Bluetooth-Profilübersicht ](http://lancaster-university.github.io/microbit-docs/ble/profile/), [@boardname@ Bluetooth-Profil-Referenz](http://lancaster-university.github.io/microbit-docs/resources/bluetooth/microbit-profile-V1.9-Level-2.pdf), [Bluetooth auf @boardname@ Ressourcen](http://bluetooth-mdw.blogspot.co.uk/p/-microbit.html), [Bluetooth SIG](https://www.bluetooth.com)

```package
Bluetooth
```