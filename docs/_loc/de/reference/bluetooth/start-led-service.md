# Bluetooth LED Service

## ~hint

![](https://cdn.makecode.com/blob/5479e652051b327fa86ef770a2e277dc72052dd2/static/bluetooth/Bluetooth_SIG.png)

Um einen der Bluetooth-"Dienste" des Calliope mini, mit einem anderen Gerät wie einem Smartphone zu nutzen, muss es zunächst [mit dem Calliope mini gekoppelt werden](/reference/bluetooth/bluetooth-pairing). Nach dem Koppeln kann das andere Gerät eine Verbindung zum Calliope mini herstellen und Daten über viele der Calliope mini-Funktionen austauschen.

## ~

Der Bluetooth-LED-Dienst erlaubt es einem anderen Gerät wie einem Smartphone kurze Textstrings oder Muster über eine Bluetooth-Verbindung an einen @boardname@ zur Anzeige auf seiner LED-Matrix zu senden. Text wird über den @boardname@ scrollen und die Geschwindigkeit, mit der er scrollt, kann auch über den Bluetooth-LED-Dienst gesteuert werden. Geräte, die den LED-Dienst verwenden, können auch den aktuellen Zustand der LED-Matrix des @boardname@ ablesen.

So könnte man zum Beispiel in einer Smartphone-App ein Smiley-Gesicht zeichnen und es auf Knopfdruck magisch auf dem @boardname@ auf der anderen Seite des Raumes erscheinen lassen. Oder du kannst dein Smartphone programmieren, um eine Nachricht an deinen @boardname@ zu senden, wann immer dein Telefon eine E-Mail erhält, SMS- oder Social Media-Nachrichten, damit du deinen @boardname@ wie eine intelligente Uhr tragen und dein Telefon in der Tasche lassen kannst.

Es wird kein zusätzlicher Code auf dem @boardname@ benötigt, um den Bluetooth-LED-Dienst von einem anderen Gerät zu verwenden.

```sig
bluetooth.startLEDService();
```

## Beispiel: Starten des Bluetooth-LED-Dienstes

Der folgende Code zeigt den Start des Bluetooth-LED-Dienstes:

```blocks
bluetooth.startLEDService();
```

## Video - LED Service Demo startet um 2:00

http://www.youtube.com/watch?v=aep_GVowKfs

## Fortgeschritten

Weitere Informationen zum @boardname@ Bluetooth-LED-Dienstes, einschließlich Informationen zur Verwendung eines Smartphones, findest du in der technischen Dokumentation der [Lancaster University @boardname@](http://lancaster-university.github.io/microbit-docs/ble/led-service/)

## Siehe auch

[Über Bluetooth](/reference/bluetooth/about-bluetooth), [@boardname@ Bluetooth-Profilübersicht ](http://lancaster-university.github.io/microbit-docs/ble/profile/), [@boardname@ Bluetooth-Profil-Referenz](http://lancaster-university.github.io/microbit-docs/resources/bluetooth/microbit-profile-V1.9-Level-2.pdf), [Bluetooth auf @boardname@ Ressourcen](http://bluetooth-mdw.blogspot.co.uk/p/-microbit.html), [Bluetooth SIG](https://www.bluetooth.com)

```package
Bluetooth
```