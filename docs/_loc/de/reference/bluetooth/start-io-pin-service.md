# Bluetooth-IO-Pin-Dienst

## ~hint

![](https://cdn.makecode.com/blob/5479e652051b327fa86ef770a2e277dc72052dd2/static/bluetooth/Bluetooth_SIG.png)

Um einen der Bluetooth-"Dienste" des @boardname@ mit einem anderen Gerät wie einem Smartphone zu nutzen, muss es zunächst [mit dem @boardname@ gekoppelt werden](/reference/bluetooth/bluetooth-pairing). Nach dem Koppeln kann das andere Gerät eine Verbindung zum @boardname@ herstellen und Daten über viele der @boardname@-Funktionen austauschen.

## ~

Der Bluetooth-IO-Pin-Service ermöglicht es einem anderen Gerät wie einem Smartphone die Kommunikation mit anderen elektronischen "Dingen" die an den Ecken, den Groveanschlüssen oder der Pinleiste des Calliope mini angeschlossen sind. Du kannst zum Beispiel dein Smartphone verwenden, um eine Lampe ein- oder auszuschalten, die mit dem Calliope mini verbunden ist, oder dein Smartphone könnte Daten von einem Sensor erhalten, der mit dem Calliope mini verbunden ist. In der Tat könntest du beide Dinge zur gleichen Zeit tun, da der Bluetooth-IO-Pin Service es ermöglicht, mit mehreren "Pins" auf unterschiedliche Weise, alle zur gleichen Zeit zu interagieren.

Es wird kein zusätzlicher Code auf dem @boardname@ benötigt, um den Bluetooth-IO-Pin Service von einem anderen Gerät zu verwenden.

```sig
bluetooth.startIOPinService();
```

## Beispiel: Starten des Bluetooth-IO-Pin-Dienstes

Der folgende Code zeigt den Start des Bluetooth-IO-Pins an:

```blocks
bluetooth.startIOPinService();
```

## Video - IO-Pin Service Demo startet um 3:49

http://www.youtube.com/watch?v=aep_GVowKfs

## Fortgeschritten

Weitere Informationen zum @boardname@ Bluetooth-IO-Pin Service inklusive Informationen zur Verwendung eines Smartphones findest du in [Lancaster University @boardname@ Technische Dokumentation zur Laufzeit](http://lancaster-university.github.io/microbit-docs/ble/iopin-service/)

## Siehe auch

[Über Bluetooth](/reference/bluetooth/about-bluetooth), [@boardname@ Bluetooth-Profilübersicht ](http://lancaster-university.github.io/microbit-docs/ble/profile/), [@boardname@ Bluetooth-Profil-Referenz](http://lancaster-university.github.io/microbit-docs/resources/bluetooth/microbit-profile-V1.9-Level-2.pdf), [Bluetooth auf @boardname@ Ressourcen](http://bluetooth-mdw.blogspot.co.uk/p/-microbit.html), [Bluetooth SIG](https://www.bluetooth.com)

```package
Bluetooth
```