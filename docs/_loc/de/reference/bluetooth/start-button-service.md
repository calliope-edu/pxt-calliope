# Bluetooth-Tasten-Dienst

## ~hint

![](https://cdn.makecode.com/blob/5479e652051b327fa86ef770a2e277dc72052dd2/static/bluetooth/Bluetooth_SIG.png)

Um einen der Bluetooth-"Dienste" des @boardname@ mit einem anderen Gerät wie einem Smartphone zu nutzen, muss es zunächst [mit dem @boardname@ gekoppelt werden](/reference/bluetooth/bluetooth-pairing). Nach dem Koppeln kann das andere Gerät eine Verbindung zum @boardname@ herstellen und Daten über viele der @boardname@-Funktionen austauschen.

## ~

Der Bluetooth-Tastendienst ermöglicht es, dass ein anderes Gerät wie ein Smartphone drahtlos benachrichtigt wird, wenn eine Taste auf der Vorderseite eines @boardname@ gedrückt wird. Jede der beiden @boardname@ Tasten kann sich in einem von drei möglichen Zuständen befinden:

* Nicht gedrückt
* Gedrückt
* Lange drücken - mindestens 2 Sekunden gedrückt halten 

Der Tastendienst ermöglicht es dir, andere Dinge, die mit deinem @boardname@ über Bluetooth verbunden sind, in irgendeiner Weise zu reagieren, wenn du eine der Tasten drückst. Sie könnten zum Beispiel dein Smartphone irgendwo im Raum verstecken und es ein amüsantes Geräusch machen lassen, wenn du eine der Tasten auf deinem @boardname@ drücken. Wir werden es dir überlassen, zu entscheiden, was lustig ist.

Auf dem @boardname@ wird kein zusätzlicher Code benötigt, um den Bluetooth-Beschleunigungssensor auf einem anderen Gerät zu verwenden.

```sig
bluetooth.startButtonService();
```

## Beispiel: Starten des Bluetooth-Tastendienstes

Der folgende Code zeigt, wie man den Bluetooth-Tastendienstes startet:

```blocks
bluetooth.startButtonService();
```

## Video - Tastendienstdemo - Startet um 0:59

http://www.youtube.com/watch?v=aep_GVowKfs

## Fortgeschritten

Weiterführende Informationen zum @boardname@ Bluetooth Tasten-Dienst, einschließlich Informationen zur Verwendung eines Smartphones, findet man in der [@boardname@ technischen Dokumentation der Universität Lancaster](http://lancaster-university.github.io/microbit-docs/ble/button-service/)

## Siehe auch

[Über Bluetooth](/reference/bluetooth/about-bluetooth), [@boardname@ Bluetooth-Profilübersicht ](http://lancaster-university.github.io/microbit-docs/ble/profile/), [@boardname@ Bluetooth-Profil-Referenz](http://lancaster-university.github.io/microbit-docs/resources/bluetooth/microbit-profile-V1.9-Level-2.pdf), [Bluetooth auf @boardname@ Ressourcen](http://bluetooth-mdw.blogspot.co.uk/p/-microbit.html), [Bluetooth SIG](https://www.bluetooth.com)

```package
Bluetooth
```