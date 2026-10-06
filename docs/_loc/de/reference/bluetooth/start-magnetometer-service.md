# Bluetooth Magnetometer Dienst

## ~hint

![](https://cdn.makecode.com/blob/5479e652051b327fa86ef770a2e277dc72052dd2/static/bluetooth/Bluetooth_SIG.png)

Um einen der Bluetooth-"Dienste" des @boardname@ mit einem anderen Gerät wie einem Smartphone zu nutzen, muss es zunächst [mit dem @boardname@ gekoppelt werden](/reference/bluetooth/bluetooth-pairing). Nach dem Koppeln kann das andere Gerät eine Verbindung zum @boardname@ herstellen und Daten über viele der @boardname@-Funktionen austauschen.

## ~

Der Bluetooth-Magnetometer-Dienst ermöglicht es einem anderen Gerät wie einem Smartphone, Daten drahtlos vom Magnetometer des @boardname@ zu empfangen. Das Magnetometer misst die Stärke und Richtung von Magnetfeldern einschließlich des Erdmagnetfeldes und kann so als digitaler Kompass verwendet werden und zeigt an, wie der @boardname@ relativ zum magnetischen Norden zeigt.

Mit dem Bluetooth-Magnetometer kannst du zum Beispiel eine Smartphone-Anwendung erstellen, die deine Reiseroute anzeigt und in Echtzeit aktualisiert.

Auf @boardname@ wird kein zusätzlicher Code benötigt, um den Bluetooth-Magnetometer-Dienst eines anderen Geräts nutzen zu können.

```sig
bluetooth.startMagnetometerService();
```

## Beispiel: Starten des Bluetooth-Magnetometer-Dienstes

Der folgende Code zeigt den Start des Bluetooth-Magnetometer-Dienstes:

```blocks
bluetooth.startMagnetometerService();
```

## Video - Magnetometer Dienst Demo

http://www.youtube.com/watch?v=C_0VL4Gp4_U

## Fortgeschritten

Weiterführende Informationen zum @boardname@ Bluetooth UART-Dienst, einschließlich Informationen zur Verwendung eines Smartphones, findet man in der [@boardname@ technischen Dokumentation der Universität Lancaster](http://lancaster-university.github.io/microbit-docs/ble/magnetometer-service/)

## Siehe auch

[Über Bluetooth](/reference/bluetooth/about-bluetooth), [@boardname@ Bluetooth-Profilübersicht ](http://lancaster-university.github.io/microbit-docs/ble/profile/), [@boardname@ Bluetooth-Profil-Referenz](http://lancaster-university.github.io/microbit-docs/resources/bluetooth/microbit-profile-V1.9-Level-2.pdf), [Bluetooth auf @boardname@ Ressourcen](http://bluetooth-mdw.blogspot.co.uk/p/-microbit.html), [Bluetooth SIG](https://www.bluetooth.com)

```package
Bluetooth
```